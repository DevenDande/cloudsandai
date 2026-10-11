import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Pause, Play, Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
  computeGradientDescentStep,
  computeLogLoss,
  defaultDatasetRows,
  defaultTrainingConfig,
  evaluateClassification,
  getFeatureStats,
  getValidObservations,
  predictProbability,
  type DatasetRow,
  type ModelParameters,
} from '@/lib/logisticClassification';

type LabModel = ModelParameters & {
  iteration: number;
  history: Array<{ iteration: number; loss: number }>;
  status: string;
  isTraining: boolean;
};

const chart = { width: 560, height: 360, pad: 38 };

function formatNumber(value: number, digits = 3) {
  return Number.isFinite(value) ? value.toFixed(digits) : '—';
}

function initialModel(rows: DatasetRow[]): LabModel {
  const observations = getValidObservations(rows);
  const stats = getFeatureStats(observations);
  const parameters = { weights: [...defaultTrainingConfig.weights] as [number, number], bias: defaultTrainingConfig.bias };

  return {
    ...parameters,
    iteration: 0,
    history: [{ iteration: 0, loss: computeLogLoss(observations, parameters, stats) }],
    status: 'Ready for training.',
    isTraining: false,
  };
}

function getChartGeometry(rows: ReturnType<typeof getValidObservations>) {
  const values = rows.length > 0 ? rows : [{ studyHours: 0, practiceTests: 0 }];
  const xValues = values.map((row) => row.studyHours);
  const yValues = values.map((row) => row.practiceTests);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const xPadding = Math.max((xMax - xMin) * 0.14, 0.5);
  const yPadding = Math.max((yMax - yMin) * 0.14, 0.5);
  const bounds = {
    xMin: xMin - xPadding,
    xMax: xMax + xPadding,
    yMin: yMin - yPadding,
    yMax: yMax + yPadding,
  };
  const xScale = (value: number) => chart.pad + ((value - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (chart.width - chart.pad * 2);
  const yScale = (value: number) => chart.height - chart.pad - ((value - bounds.yMin) / (bounds.yMax - bounds.yMin)) * (chart.height - chart.pad * 2);

  return { bounds, xScale, yScale };
}

function getDecisionBoundary(
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
  threshold: number,
  bounds: ReturnType<typeof getChartGeometry>['bounds'],
) {
  const weightX = model.weights[0] / stats[0].standardDeviation;
  const weightY = model.weights[1] / stats[1].standardDeviation;
  const intercept = model.bias
    - model.weights[0] * stats[0].mean / stats[0].standardDeviation
    - model.weights[1] * stats[1].mean / stats[1].standardDeviation
    - Math.log(threshold / (1 - threshold));
  const points: Array<{ x: number; y: number }> = [];

  if (Math.abs(weightY) > 1e-10) {
    [bounds.xMin, bounds.xMax].forEach((x) => {
      const y = -(weightX * x + intercept) / weightY;
      if (y >= bounds.yMin && y <= bounds.yMax) points.push({ x, y });
    });
  }
  if (Math.abs(weightX) > 1e-10) {
    [bounds.yMin, bounds.yMax].forEach((y) => {
      const x = -(weightY * y + intercept) / weightX;
      if (x >= bounds.xMin && x <= bounds.xMax) points.push({ x, y });
    });
  }

  const distinct = points.filter((point, index) => points.findIndex((candidate) =>
    Math.abs(candidate.x - point.x) < 1e-8 && Math.abs(candidate.y - point.y) < 1e-8,
  ) === index);
  return distinct.length >= 2 ? distinct.slice(0, 2) : [];
}

export function LogisticClassificationLab() {
  const [dataset, setDataset] = useState<DatasetRow[]>(defaultDatasetRows);
  const [threshold, setThreshold] = useState(0.5);
  const [learningRate, setLearningRate] = useState(defaultTrainingConfig.learningRate);
  const [iterations, setIterations] = useState(defaultTrainingConfig.iterations);
  const [model, setModel] = useState<LabModel>(() => initialModel(defaultDatasetRows));
  const validObservations = useMemo(() => getValidObservations(dataset), [dataset]);
  const featureStats = useMemo(() => getFeatureStats(validObservations), [validObservations]);
  const parameters = useMemo<ModelParameters>(() => ({ weights: model.weights, bias: model.bias }), [model.bias, model.weights]);
  const currentLoss = useMemo(() => computeLogLoss(validObservations, parameters, featureStats), [validObservations, parameters, featureStats]);
  const evaluation = useMemo(
    () => evaluateClassification(validObservations, parameters, featureStats, threshold),
    [validObservations, parameters, featureStats, threshold],
  );
  const plot = useMemo(() => getChartGeometry(validObservations), [validObservations]);
  const boundary = useMemo(
    () => getDecisionBoundary(parameters, featureStats, threshold, plot.bounds),
    [parameters, featureStats, threshold, plot.bounds],
  );

  useEffect(() => {
    if (!model.isTraining) return undefined;
    if (validObservations.length < 2 || new Set(validObservations.map((row) => row.label)).size < 2) {
      setModel((previous) => ({
        ...previous,
        isTraining: false,
        status: 'Add at least two complete observations, including both classes, to train.',
      }));
      return undefined;
    }
    if (model.iteration >= iterations) {
      setModel((previous) => ({ ...previous, isTraining: false, status: `Training finished after ${previous.iteration} iterations.` }));
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setModel((previous) => {
        const step = computeGradientDescentStep(validObservations, previous, learningRate, featureStats);
        if (!step.valid) return { ...previous, isTraining: false, status: step.message };

        const iteration = previous.iteration + 1;
        return {
          ...previous,
          weights: step.weights,
          bias: step.bias,
          iteration,
          history: [...previous.history, { iteration, loss: step.loss }],
          isTraining: iteration < iterations,
          status: iteration >= iterations ? `Training finished after ${iteration} iterations.` : `Iteration ${iteration}: log loss ${formatNumber(step.loss)}`,
        };
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [model.isTraining, model.iteration, iterations, learningRate, validObservations, featureStats]);

  const changeDataset = (nextDataset: DatasetRow[]) => {
    const observations = getValidObservations(nextDataset);
    const stats = getFeatureStats(observations);
    setDataset(nextDataset);
    setModel((previous) => ({
      ...previous,
      iteration: 0,
      history: [{ iteration: 0, loss: computeLogLoss(observations, previous, stats) }],
      isTraining: false,
      status: 'Dataset updated; training progress reset.',
    }));
  };

  const updateRow = (id: number, field: 'studyHours' | 'practiceTests', value: string) => {
    changeDataset(dataset.map((row) => row.id === id ? { ...row, [field]: value } : row));
  };

  const addObservation = () => {
    changeDataset([...dataset, { id: Date.now(), studyHours: '', practiceTests: '', label: '0' }]);
  };

  const updateParameter = (index: 0 | 1 | null, value: string) => {
    if (value.trim() === '' || !Number.isFinite(Number(value))) return;
    const parsed = Number(value);
    setModel((previous) => {
      const weights: [number, number] = index === null
        ? previous.weights
        : [
            index === 0 ? parsed : previous.weights[0],
            index === 1 ? parsed : previous.weights[1],
          ];
      const bias = index === null ? parsed : previous.bias;
      const nextParameters = { weights, bias };
      return {
        ...previous,
        ...nextParameters,
        iteration: 0,
        history: [{ iteration: 0, loss: computeLogLoss(validObservations, nextParameters, featureStats) }],
        isTraining: false,
        status: 'Model parameter adjusted manually.',
      };
    });
  };

  const takeStep = () => {
    const step = computeGradientDescentStep(validObservations, parameters, learningRate, featureStats);
    if (!step.valid) {
      setModel((previous) => ({ ...previous, status: step.message, isTraining: false }));
      return;
    }

    const iteration = model.iteration + 1;
    setModel((previous) => ({
      ...previous,
      weights: step.weights,
      bias: step.bias,
      iteration,
      history: [...previous.history, { iteration, loss: step.loss }],
      isTraining: false,
      status: `Updated after step ${iteration}.`,
    }));
  };

  const resetAll = () => {
    setDataset(defaultDatasetRows);
    setThreshold(0.5);
    setLearningRate(defaultTrainingConfig.learningRate);
    setIterations(defaultTrainingConfig.iterations);
    setModel(initialModel(defaultDatasetRows));
  };

  return (
    <div className="mx-auto max-w-8xl px-6 pb-20 pt-8 lg:px-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <a href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to Resources
        </a>
        <button type="button" onClick={resetAll} className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-3.5 py-2 text-sm font-medium text-ink-900 hover:border-ink-900">
          <RotateCcw className="h-4 w-4" /> Reset lab
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="min-w-0 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section A</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Explore the dataset</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">Predict whether a student passes based on study hours and practice tests. Class 1 is pass; class 0 is fail. Incomplete rows are ignored.</p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-100">
            <table className="min-w-[560px] text-left">
              <thead className="bg-ink-50 text-xs uppercase tracking-[0.12em] text-ink-500">
                <tr>
                  <th className="px-3 py-3">Study hours</th>
                  <th className="px-3 py-3">Practice tests</th>
                  <th className="px-3 py-3">Outcome</th>
                  <th className="px-3 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataset.map((row) => (
                  <tr key={row.id} className="border-t border-ink-100">
                    <td className="px-2 py-2">
                      <input aria-label={`Study hours, observation ${row.id}`} type="number" step="0.5" value={row.studyHours} onChange={(event) => updateRow(row.id, 'studyHours', event.target.value)} className="w-28 rounded-lg border border-ink-200 px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500" />
                    </td>
                    <td className="px-2 py-2">
                      <input aria-label={`Practice tests, observation ${row.id}`} type="number" step="1" value={row.practiceTests} onChange={(event) => updateRow(row.id, 'practiceTests', event.target.value)} className="w-28 rounded-lg border border-ink-200 px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500" />
                    </td>
                    <td className="px-2 py-2">
                      <select aria-label={`Outcome, observation ${row.id}`} value={row.label} onChange={(event) => changeDataset(dataset.map((item) => item.id === row.id ? { ...item, label: event.target.value === '1' ? '1' : '0' } : item))} className="rounded-lg border border-ink-200 bg-white px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500">
                        <option value="0">0 · Fail</option>
                        <option value="1">1 · Pass</option>
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex justify-end">
                        <button type="button" onClick={() => dataset.length > 2 && changeDataset(dataset.filter((item) => item.id !== row.id))} disabled={dataset.length <= 2} aria-label={`Delete observation ${row.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:border-error-400 hover:text-error-600 disabled:opacity-40">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={addObservation} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-ink-700"><Plus className="h-4 w-4" /> Add observation</button>
            <p className="text-sm text-ink-500">{validObservations.length} complete observations</p>
          </div>
        </section>

        <aside className="min-w-0 rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Section B</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Logistic model</h2>
          <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm font-medium text-ink-500">Probability of class 1</p>
            <p className="mt-2 break-words text-sm font-semibold leading-relaxed text-ink-900">p = σ(b + w₁z₁ + w₂z₂)</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-500">The sigmoid σ maps a weighted score to a probability between 0 and 1. Inputs are standardized.</p>
          </div>

          <div className="mt-5 space-y-3">
            {(['Study hours weight', 'Practice tests weight'] as const).map((label, index) => (
              <label key={label} className="flex items-center justify-between gap-3 text-sm text-ink-600">
                <span>{label}</span>
                <input aria-label={label} type="number" step="0.1" value={model.weights[index]} onChange={(event) => updateParameter(index as 0 | 1, event.target.value)} className="w-28 rounded-lg border border-ink-200 bg-white px-3 py-2 text-right text-ink-900 outline-none focus:border-accent-500" />
              </label>
            ))}
            <label className="flex items-center justify-between gap-3 text-sm text-ink-600">
              <span>Bias / intercept</span>
              <input aria-label="Bias or intercept" type="number" step="0.1" value={model.bias} onChange={(event) => updateParameter(null, event.target.value)} className="w-28 rounded-lg border border-ink-200 bg-white px-3 py-2 text-right text-ink-900 outline-none focus:border-accent-500" />
            </label>
          </div>

          <label className="mt-5 block rounded-xl border border-ink-100 bg-white p-3 text-sm text-ink-700">
            <span className="flex justify-between gap-3"><span className="font-medium text-ink-900">Classification threshold</span><span className="font-mono text-ink-600">{threshold.toFixed(2)}</span></span>
            <input aria-label="Classification threshold" type="range" min="0.05" max="0.95" step="0.01" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} className="mt-3 w-full accent-accent-600" />
            <span className="mt-1 block text-xs leading-relaxed text-ink-500">Predict pass when its probability is at least the threshold.</span>
          </label>
        </aside>
      </div>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section C</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Decision boundary</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">The shaded regions show the predicted class; the line marks where the model probability equals the selected threshold.</p>
          <div className="mt-5 overflow-x-auto">
            <svg role="img" aria-label="Scatter plot of student observations and the logistic regression decision boundary" viewBox={`0 0 ${chart.width} ${chart.height}`} className="h-auto min-w-[420px] w-full">
              <rect x={chart.pad} y={chart.pad} width={chart.width - chart.pad * 2} height={chart.height - chart.pad * 2} fill="#fff0e8" />
              {Array.from({ length: 18 }, (_, xIndex) => Array.from({ length: 12 }, (_, yIndex) => {
                const x = plot.bounds.xMin + ((xIndex + 0.5) / 18) * (plot.bounds.xMax - plot.bounds.xMin);
                const y = plot.bounds.yMin + ((yIndex + 0.5) / 12) * (plot.bounds.yMax - plot.bounds.yMin);
                const row = { id: 0, studyHours: x, practiceTests: y, label: 0 };
                const probability = predictProbability(row, parameters, featureStats);
                const cellWidth = (chart.width - chart.pad * 2) / 18;
                const cellHeight = (chart.height - chart.pad * 2) / 12;
                return (
                  <rect
                    key={`${xIndex}-${yIndex}`}
                    x={chart.pad + xIndex * cellWidth}
                    y={chart.height - chart.pad - (yIndex + 1) * cellHeight}
                    width={cellWidth + 0.5}
                    height={cellHeight + 0.5}
                    fill={probability >= threshold ? '#dff4e8' : '#fff0e8'}
                  />
                );
              }))}
              <line x1={chart.pad} y1={chart.height - chart.pad} x2={chart.width - chart.pad} y2={chart.height - chart.pad} stroke="#9ca3af" />
              <line x1={chart.pad} y1={chart.pad} x2={chart.pad} y2={chart.height - chart.pad} stroke="#9ca3af" />
              {boundary.length >= 2 && (
                <line x1={plot.xScale(boundary[0].x)} y1={plot.yScale(boundary[0].y)} x2={plot.xScale(boundary[1].x)} y2={plot.yScale(boundary[1].y)} stroke="#111827" strokeWidth="2.5" />
              )}
              {validObservations.map((row) => (
                <circle key={row.id} cx={plot.xScale(row.studyHours)} cy={plot.yScale(row.practiceTests)} r="6" fill={row.label === 1 ? '#16834b' : '#d35d2d'} stroke="white" strokeWidth="2">
                  <title>{`Study ${row.studyHours} hours, ${row.practiceTests} practice tests, actual class ${row.label}`}</title>
                </circle>
              ))}
              <text x={chart.width / 2} y={chart.height - 5} textAnchor="middle" className="fill-ink-500 text-[11px]">Study hours</text>
              <text x="15" y={chart.height / 2} textAnchor="middle" transform={`rotate(-90 15 ${chart.height / 2})`} className="fill-ink-500 text-[11px]">Practice tests</text>
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap gap-5 text-xs text-ink-600">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#d35d2d]" /> Fail (class 0)</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#16834b]" /> Pass (class 1)</span>
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 bg-ink-900" /> Decision boundary</span>
          </div>
        </div>

        <div className="min-w-0 rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Section D</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Train and evaluate</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-ink-600">Learning rate
              <input aria-label="Learning rate" type="number" min="0.001" max="2" step="0.01" value={learningRate} onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isFinite(value) && value > 0 && value <= 2) setLearningRate(value);
              }} className="mt-2 w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500" />
            </label>
            <label className="text-sm text-ink-600">Training iterations
              <input aria-label="Training iterations" type="number" min="1" max="1000" step="1" value={iterations} onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isInteger(value) && value >= 1 && value <= 1000) setIterations(value);
              }} className="mt-2 w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500" />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => setModel((previous) => ({ ...previous, isTraining: true, status: 'Training logistic regression…' }))} disabled={model.isTraining} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-ink-700 disabled:opacity-50"><Play className="h-4 w-4" /> Train</button>
            <button type="button" onClick={() => setModel((previous) => ({ ...previous, isTraining: false, status: 'Training paused.' }))} disabled={!model.isTraining} className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-900 disabled:opacity-50"><Pause className="h-4 w-4" /> Pause</button>
            <button type="button" onClick={takeStep} disabled={model.isTraining} className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-900 disabled:opacity-50">Take one step</button>
          </div>
          <p role="status" className="mt-3 min-h-5 text-xs leading-relaxed text-ink-500">{model.status}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ['Log loss', formatNumber(currentLoss)],
              ['Accuracy', evaluation.accuracy === null ? '—' : `${(evaluation.accuracy * 100).toFixed(1)}%`],
              ['Precision', evaluation.precision === null ? '—' : `${(evaluation.precision * 100).toFixed(1)}%`],
              ['Recall', evaluation.recall === null ? '—' : `${(evaluation.recall * 100).toFixed(1)}%`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-ink-100 bg-white p-3">
                <p className="text-xs text-ink-500">{label}</p>
                <p className="mt-1 text-lg font-semibold text-ink-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-ink-100 bg-white">
            <p className="px-3 pt-3 text-xs font-medium text-ink-500">Confusion matrix · rows are actual, columns are predicted</p>
            <table className="mt-2 w-full text-center text-sm">
              <thead className="text-xs text-ink-500">
                <tr><th className="px-2 py-2" /><th className="px-2 py-2">Predicted fail</th><th className="px-2 py-2">Predicted pass</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-ink-100"><th className="px-2 py-2 text-left text-xs font-medium text-ink-600">Actual fail</th><td className="px-2 py-2 font-semibold text-ink-900">{evaluation.trueNegative}</td><td className="px-2 py-2 font-semibold text-ink-900">{evaluation.falsePositive}</td></tr>
                <tr className="border-t border-ink-100"><th className="px-2 py-2 text-left text-xs font-medium text-ink-600">Actual pass</th><td className="px-2 py-2 font-semibold text-ink-900">{evaluation.falseNegative}</td><td className="px-2 py-2 font-semibold text-ink-900">{evaluation.truePositive}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">Training step {model.iteration} of {iterations} · probabilities become labels at the selected threshold.</p>
        </div>
      </section>
    </div>
  );
}
