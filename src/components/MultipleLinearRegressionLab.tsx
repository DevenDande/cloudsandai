import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Pause, Play, Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
  computeGradientDescentStep,
  computeMSE,
  computeR2,
  defaultDatasetRows,
  defaultTrainingConfig,
  formatMetric,
  getFeatureStats,
  getValidObservations,
  parseNumericInput,
  predict,
  regressionFeatures,
  transformFeatures,
  type DatasetRow,
  type FeatureKey,
  type ModelParameters,
} from '@/lib/multipleLinearRegression';
import {
  MAX_LAB_OBSERVATIONS,
  MAX_LAB_PARAMETER_MAGNITUDE,
  MAX_REGRESSION_TRAINING_ITERATIONS,
} from '@/lib/interactiveLabLimits';

type HistoryPoint = { iteration: number; loss: number };
type LabModel = ModelParameters & {
  learningRate: number;
  iterations: number;
  iteration: number;
  history: HistoryPoint[];
  status: string;
  isTraining: boolean;
};

function formatNumber(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : '—';
}

function initialModel(rows: DatasetRow[], standardize = true): LabModel {
  const observations = getValidObservations(rows);
  const weights = [...defaultTrainingConfig.weights];
  const bias = defaultTrainingConfig.bias;

  return {
    weights,
    bias,
    learningRate: defaultTrainingConfig.learningRate,
    iterations: defaultTrainingConfig.iterations,
    iteration: 0,
    history: [{ iteration: 0, loss: computeMSE(observations, { weights, bias }, getFeatureStats(observations), standardize) }],
    status: 'Ready for training.',
    isTraining: false,
  };
}

function buildComparisonChart(actual: number[], predicted: number[]) {
  const width = 500;
  const height = 300;
  const pad = 28;
  const allValues = [...actual, ...predicted];
  const min = Math.min(...allValues, 0);
  const max = Math.max(...allValues, 1);
  const span = Math.max(max - min, 1);
  const x = (value: number) => pad + ((value - min) / span) * (width - pad * 2);
  const y = (value: number) => height - pad - ((value - min) / span) * (height - pad * 2);

  return {
    width,
    height,
    pad,
    points: actual.map((value, index) => ({ x: x(value), y: y(predicted[index]) })),
  };
}

export function MultipleLinearRegressionLab() {
  const [dataset, setDataset] = useState<DatasetRow[]>(defaultDatasetRows);
  const [standardize, setStandardize] = useState(true);
  const [model, setModel] = useState<LabModel>(() => initialModel(defaultDatasetRows));
  const validObservations = useMemo(() => getValidObservations(dataset), [dataset]);
  const featureStats = useMemo(() => getFeatureStats(validObservations), [validObservations]);
  const currentParameters = useMemo<ModelParameters>(() => ({ weights: model.weights, bias: model.bias }), [model.weights, model.bias]);
  const currentLoss = useMemo(
    () => computeMSE(validObservations, currentParameters, featureStats, standardize),
    [validObservations, currentParameters, featureStats, standardize],
  );
  const r2 = useMemo(
    () => computeR2(validObservations, currentParameters, featureStats, standardize),
    [validObservations, currentParameters, featureStats, standardize],
  );
  const predictions = useMemo(
    () => validObservations.map((row) => predict(row.features, currentParameters, featureStats, standardize)),
    [validObservations, currentParameters, featureStats, standardize],
  );
  const chart = useMemo(
    () => buildComparisonChart(validObservations.map((row) => row.target), predictions),
    [validObservations, predictions],
  );

  useEffect(() => {
    if (!model.isTraining) {
      return undefined;
    }

    if (validObservations.length < 2) {
      setModel((previous) => ({ ...previous, isTraining: false, status: 'Enter at least two complete observations to train.' }));
      return undefined;
    }

    if (model.iteration >= model.iterations) {
      setModel((previous) => ({ ...previous, isTraining: false, status: `Training finished after ${previous.iteration} iterations.` }));
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setModel((previous) => {
        const step = computeGradientDescentStep(
          validObservations,
          { weights: previous.weights, bias: previous.bias },
          previous.learningRate,
          featureStats,
          standardize,
        );

        if (!step.valid) {
          return { ...previous, isTraining: false, status: step.message };
        }

        const iteration = previous.iteration + 1;
        const rateNote = step.actualLearningRate < previous.learningRate
          ? ` Learning rate reduced to ${formatMetric(step.actualLearningRate, 10)} for stability.`
          : '';
        return {
          ...previous,
          weights: step.weights,
          bias: step.bias,
          iteration,
          history: [...previous.history, { iteration, loss: step.loss }],
          isTraining: iteration < previous.iterations,
          status: iteration >= previous.iterations
            ? `Training finished after ${iteration} iterations.${rateNote}`
            : `Iteration ${iteration}: MSE ${formatMetric(step.loss)}.${rateNote}`,
        };
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [model.isTraining, model.iteration, model.iterations, model.learningRate, validObservations, featureStats, standardize]);

  const changeDataset = (nextDataset: DatasetRow[]) => {
    setDataset(nextDataset);
    const observations = getValidObservations(nextDataset);
    const nextStats = getFeatureStats(observations);
    setModel((previous) => ({
      ...previous,
      iteration: 0,
      history: [{
        iteration: 0,
        loss: computeMSE(observations, { weights: previous.weights, bias: previous.bias }, nextStats, standardize),
      }],
      isTraining: false,
      status: 'Dataset updated; training progress reset.',
    }));
  };

  const updateFeature = (id: number, feature: FeatureKey, value: string) => {
    changeDataset(dataset.map((row) => row.id === id ? { ...row, values: { ...row.values, [feature]: value } } : row));
  };

  const updateTarget = (id: number, target: string) => {
    changeDataset(dataset.map((row) => row.id === id ? { ...row, target } : row));
  };

  const addObservation = () => {
    if (dataset.length >= MAX_LAB_OBSERVATIONS) {
      return;
    }
    if (dataset.length >= MAX_LAB_OBSERVATIONS) {
      return;
    }
    const id = Date.now();
    changeDataset([...dataset, {
      id,
      values: { area: '', bedrooms: '', age: '', commute: '' },
      target: '',
    }]);
  };

  const removeObservation = (id: number) => {
    if (dataset.length > 2) {
      changeDataset(dataset.filter((row) => row.id !== id));
    }
  };

  const updateParameter = (index: number | null, value: string) => {
    const parsed = parseNumericInput(value);
    if (parsed === null) {
      return;
    }

    setModel((previous) => {
      const weights = index === null ? previous.weights : previous.weights.map((weight, weightIndex) => weightIndex === index ? parsed : weight);
      const bias = index === null ? parsed : previous.bias;
      return {
        ...previous,
        weights,
        bias,
        iteration: 0,
        history: [{ iteration: 0, loss: computeMSE(validObservations, { weights, bias }, featureStats, standardize) }],
        isTraining: false,
        status: 'Model parameter adjusted manually.',
      };
    });
  };

  const takeStep = () => {
    const step = computeGradientDescentStep(validObservations, currentParameters, model.learningRate, featureStats, standardize);
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
      status: step.actualLearningRate < model.learningRate
        ? `Updated after step ${iteration}. Learning rate reduced to ${formatMetric(step.actualLearningRate, 10)} for stability.`
        : `Updated after step ${iteration}.`,
    }));
  };

  const resetAll = () => {
    setDataset(defaultDatasetRows);
    setStandardize(true);
    setModel(initialModel(defaultDatasetRows));
  };

  const changeStandardization = (enabled: boolean) => {
    setStandardize(enabled);
    setModel((previous) => ({
      ...previous,
      iteration: 0,
      history: [{ iteration: 0, loss: computeMSE(validObservations, { weights: previous.weights, bias: previous.bias }, featureStats, enabled) }],
      isTraining: false,
      status: enabled
        ? 'Features standardized; training progress reset.'
        : 'Feature scaling disabled; training progress reset.',
    }));
  };

  const selectedObservation = validObservations[0];
  const selectedPrediction = selectedObservation
    ? predict(selectedObservation.features, currentParameters, featureStats, standardize)
    : null;
  const selectedTransformed = selectedObservation ? transformFeatures(selectedObservation.features, featureStats, standardize) : [];
  const selectedContributions = selectedTransformed.map((value, index) => value * model.weights[index]);

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
          <p className="mt-3 text-sm leading-relaxed text-ink-500">Estimate a home's price in $10,000 units using four features. Incomplete rows are ignored until all values are entered.</p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-100">
            <table className="min-w-[760px] text-left">
              <thead className="bg-ink-50 text-xs uppercase tracking-[0.12em] text-ink-500">
                <tr>
                  {regressionFeatures.map((feature) => <th key={feature.key} className="px-3 py-3">{feature.label}</th>)}
                  <th className="px-3 py-3">Price ($10k)</th>
                  <th className="px-3 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataset.map((row) => (
                  <tr key={row.id} className="border-t border-ink-100">
                    {regressionFeatures.map((feature) => (
                      <td key={feature.key} className="px-2 py-2">
                        <input
                          aria-label={`${feature.label}, observation ${row.id}`}
                          type="number"
                          min="-100000"
                          max="100000"
                          value={row.values[feature.key]}
                          onChange={(event) => updateFeature(row.id, feature.key, event.target.value)}
                          className="w-24 rounded-lg border border-ink-200 px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500"
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2">
                      <input
                        aria-label={`Price, observation ${row.id}`}
                        type="number"
                        min="-100000"
                        max="100000"
                        value={row.target}
                        onChange={(event) => updateTarget(row.id, event.target.value)}
                        className="w-24 rounded-lg border border-ink-200 px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex justify-end">
                        <button type="button" onClick={() => removeObservation(row.id)} disabled={dataset.length <= 2} aria-label={`Delete observation ${row.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:border-error-400 hover:text-error-600 disabled:opacity-40">
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
            <button type="button" onClick={addObservation} disabled={dataset.length >= MAX_LAB_OBSERVATIONS} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-50"><Plus className="h-4 w-4" /> Add observation</button>
            <p role="status" className="text-sm text-ink-500">
              {validObservations.length} complete observations. {validObservations.length < dataset.length
                ? `${dataset.length - validObservations.length} incomplete or out-of-range row(s) are excluded; values must be between −100,000 and 100,000. `
                : ''}Maximum ${MAX_LAB_OBSERVATIONS} observations.
            </p>
          </div>
        </section>

        <aside className="min-w-0 rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Section B</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Model parameters</h2>
          <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm font-medium text-ink-500">Prediction equation</p>
            <p className="mt-2 break-words text-sm font-semibold leading-relaxed text-ink-900">
              ŷ = {formatNumber(model.bias)}{model.weights.map((weight, index) => ` ${weight < 0 ? '−' : '+'} ${formatNumber(Math.abs(weight))}${standardize ? `z${index + 1}` : `x${index + 1}`}`).join('')}
            </p>
            <p className="mt-2 text-xs text-ink-500">{standardize ? 'z values are standardized features.' : 'x values are in their original units.'}</p>
          </div>

          <div className="mt-5 space-y-3">
            {regressionFeatures.map((feature, index) => (
              <label key={feature.key} className="flex items-center justify-between gap-3 text-sm text-ink-600">
                <span className="min-w-0">{feature.label}</span>
                <input aria-label={`Weight for ${feature.label}`} type="number" min={-MAX_LAB_PARAMETER_MAGNITUDE} max={MAX_LAB_PARAMETER_MAGNITUDE} step="0.1" value={model.weights[index]} onChange={(event) => updateParameter(index, event.target.value)} className="w-28 rounded-lg border border-ink-200 bg-white px-3 py-2 text-right text-ink-900 outline-none focus:border-accent-500" />
              </label>
            ))}
            <label className="flex items-center justify-between gap-3 text-sm text-ink-600">
              <span>Bias / intercept</span>
              <input aria-label="Bias or intercept" type="number" min={-MAX_LAB_PARAMETER_MAGNITUDE} max={MAX_LAB_PARAMETER_MAGNITUDE} step="0.1" value={model.bias} onChange={(event) => updateParameter(null, event.target.value)} className="w-28 rounded-lg border border-ink-200 bg-white px-3 py-2 text-right text-ink-900 outline-none focus:border-accent-500" />
            </label>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-3 text-sm text-ink-700">
            <input type="checkbox" checked={standardize} onChange={(event) => changeStandardization(event.target.checked)} className="mt-0.5 accent-accent-600" />
            <span><span className="font-medium text-ink-900">Standardize features</span><span className="mt-1 block text-xs leading-relaxed text-ink-500">Convert each input to a z-score before training.</span></span>
          </label>
        </aside>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section C</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Fit and evaluate</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-ink-600">Learning rate (maximum 1)<input aria-label="Learning rate" type="number" min="0.000000000001" max="1" step="0.005" value={model.learningRate} onChange={(event) => {
              const value = Number(event.target.value);
              if (Number.isFinite(value) && value > 0) {
                const learningRate = Math.min(value, 1);
                setModel((previous) => ({ ...previous, learningRate, isTraining: false, status: learningRate < value ? 'Learning rate limited to 1.' : 'Learning rate updated.' }));
              }
            }} className="mt-2 w-full rounded-lg border border-ink-200 px-3 py-2 text-ink-900 outline-none focus:border-accent-500" /></label>
            <label className="text-sm text-ink-600">Training steps (maximum {MAX_REGRESSION_TRAINING_ITERATIONS})<input aria-label="Training steps" type="number" min="1" max={MAX_REGRESSION_TRAINING_ITERATIONS} step="1" value={model.iterations} onChange={(event) => setModel((previous) => {
              const value = Number(event.target.value);
              if (!Number.isFinite(value) || value < 1) return previous;
              const iterations = Math.min(MAX_REGRESSION_TRAINING_ITERATIONS, Math.round(value));
              return { ...previous, iterations, isTraining: false, status: iterations < value ? `Training steps limited to ${MAX_REGRESSION_TRAINING_ITERATIONS}.` : 'Training schedule updated.' };
            })} className="mt-2 w-full rounded-lg border border-ink-200 px-3 py-2 text-ink-900 outline-none focus:border-accent-500" /></label>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={takeStep} disabled={model.iteration >= model.iterations} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"><Play className="h-4 w-4" /> Take one step</button>
            <button type="button" onClick={() => setModel((previous) => ({ ...previous, isTraining: !previous.isTraining, status: previous.isTraining ? 'Training paused.' : 'Training started.' }))} disabled={!model.isTraining && model.iteration >= model.iterations} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900 disabled:cursor-not-allowed disabled:opacity-50">{model.isTraining ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{model.isTraining ? 'Pause training' : 'Train model'}</button>
            <button type="button" onClick={() => setModel(initialModel(dataset, standardize))} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900"><RotateCcw className="h-4 w-4" /> Reset parameters</button>
          </div>
          <p role="status" className="mt-4 text-sm text-ink-600">{model.status} <span className="font-medium text-ink-900">Step {model.iteration}</span></p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-4"><p className="text-xs uppercase tracking-widest text-ink-400">MSE</p><p className="mt-2 text-xl font-semibold text-ink-900">{formatMetric(currentLoss)}</p></div>
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-4"><p className="text-xs uppercase tracking-widest text-ink-400">R squared</p><p className="mt-2 text-xl font-semibold text-ink-900">{formatMetric(r2)}</p></div>
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-4"><p className="text-xs uppercase tracking-widest text-ink-400">Valid rows</p><p className="mt-2 text-xl font-semibold text-ink-900">{validObservations.length}</p></div>
          </div>
        </div>

        <div className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Prediction breakdown</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Feature contributions</h2>
          {selectedObservation && selectedPrediction !== null ? (
            <>
              <p className="mt-3 text-sm text-ink-500">Observation {selectedObservation.id}: each term shows its contribution to this prediction.</p>
              <div className="mt-5 space-y-3">
                {regressionFeatures.map((feature, index) => (
                  <div key={feature.key} className="flex justify-between gap-4 border-b border-ink-100 pb-3 text-sm">
                    <span className="text-ink-600">{feature.label}<span className="ml-2 text-xs text-ink-400">{formatNumber(selectedObservation.features[index])}{standardize ? ` (z ${formatNumber(selectedTransformed[index])})` : ''}</span></span>
                    <span className="font-medium text-ink-900">{formatNumber(selectedContributions[index])}</span>
                  </div>
                ))}
                <div className="flex justify-between gap-4 text-sm"><span className="text-ink-600">Bias</span><span className="font-medium text-ink-900">{formatNumber(model.bias)}</span></div>
                <div className="flex justify-between gap-4 rounded-xl bg-ink-50 p-3 text-sm"><span className="font-medium text-ink-900">Predicted price</span><span className="font-semibold text-ink-900">{formatNumber(selectedPrediction)} ($10k)</span></div>
              </div>
            </>
          ) : <p className="mt-4 text-sm text-ink-500">Complete a row to see its prediction breakdown.</p>}
        </div>
      </section>

      <section className="mt-10 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
        <p className="mono-label">Section D</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Predicted versus actual</h2>
        <p className="mt-3 text-sm text-ink-500">Points closer to the diagonal represent more accurate predictions.</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-ink-100 bg-ink-50 p-2">
          <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="h-[280px] min-w-[420px] w-full" role="img" aria-label="Predicted versus actual home prices">
            <line x1={chart.pad} y1={chart.height - chart.pad} x2={chart.width - chart.pad} y2={chart.pad} stroke="#a6adb5" strokeDasharray="6 5" strokeWidth="2" />
            <line x1={chart.pad} y1={chart.height - chart.pad} x2={chart.width - chart.pad} y2={chart.height - chart.pad} stroke="#364152" strokeWidth="1.5" />
            <line x1={chart.pad} y1={chart.pad} x2={chart.pad} y2={chart.height - chart.pad} stroke="#364152" strokeWidth="1.5" />
            {chart.points.map((point, index) => <circle key={validObservations[index]?.id} cx={point.x} cy={point.y} r="5" fill="#3b6df0" />)}
            <text x={chart.width / 2} y={chart.height - 4} textAnchor="middle" fontSize="12" fill="#5a626d">Actual price ($10k)</text>
            <text x="12" y={chart.height / 2} textAnchor="middle" fontSize="12" fill="#5a626d" transform={`rotate(-90 12 ${chart.height / 2})`}>Predicted price ($10k)</text>
          </svg>
        </div>
        <div className="mt-5 flex flex-wrap gap-5 text-sm text-ink-600">
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-accent-600" /> Observations</span>
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-6 border-t-2 border-dashed border-ink-400" /> Perfect prediction</span>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs uppercase tracking-widest text-ink-500"><tr><th className="px-4 py-3">Observation</th><th className="px-4 py-3">Actual ($10k)</th><th className="px-4 py-3">Predicted ($10k)</th><th className="px-4 py-3">Residual</th></tr></thead>
            <tbody>{validObservations.map((row, index) => <tr key={row.id} className="border-t border-ink-100 text-ink-600"><td className="px-4 py-3">{row.id}</td><td className="px-4 py-3">{formatNumber(row.target)}</td><td className="px-4 py-3">{formatNumber(predictions[index])}</td><td className="px-4 py-3">{formatNumber(predictions[index] - row.target)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
        <p className="mono-label">Training history</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Loss versus step</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-ink-100 bg-ink-50 p-2">
          <svg viewBox="0 0 500 220" className="h-[220px] min-w-[420px] w-full" role="img" aria-label="Mean squared error by training step">
            <line x1="24" y1="190" x2="480" y2="190" stroke="#364152" strokeWidth="1.5" />
            <line x1="24" y1="20" x2="24" y2="190" stroke="#364152" strokeWidth="1.5" />
            {model.history.length > 1 && (() => {
              const losses = model.history.map((point) => point.loss);
              const min = Math.min(...losses);
              const max = Math.max(...losses);
              const span = max - min || 1;
              const points = model.history.map((point, index) => {
                const x = 24 + (index / (model.history.length - 1)) * 456;
                const y = 190 - ((point.loss - min) / span) * 150;
                return `${x},${y}`;
              }).join(' ');
              return <polyline points={points} fill="none" stroke="#3b6df0" strokeWidth="3" />;
            })()}
          </svg>
        </div>
        <p className="mt-4 text-sm text-ink-600">Starting MSE: <span className="font-medium text-ink-900">{formatMetric(model.history[0]?.loss ?? currentLoss)}</span> <span className="px-2 text-ink-300">|</span> Current MSE: <span className="font-medium text-ink-900">{formatMetric(currentLoss)}</span></p>
      </section>
    </div>
  );
}