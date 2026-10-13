import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, Pause, Play, Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
  computeClosedFormSolution,
  computeGradientDescentStep,
  computeGradients,
  computeMSE,
  computeResiduals,
  defaultDatasetRows,
  defaultTrainingConfig,
  formatMetric,
  getRangeForChart,
  getValidObservations,
  parseNumericInput,
  predict,
  type DatasetRow,
  type Observation,
} from '@/lib/simpleLinearRegression';
import {
  MAX_LAB_OBSERVATIONS,
  MAX_LAB_PARAMETER_MAGNITUDE,
  MAX_REGRESSION_TRAINING_ITERATIONS,
} from '@/lib/interactiveLabLimits';

type ModelState = {
  w: number;
  b: number;
  learningRate: number;
  iterations: number;
  iteration: number;
  history: Array<{ iteration: number; loss: number }>;
  status: string;
  isTraining: boolean;
};

const defaultHistory = (rows: Observation[], w: number, b: number) => [{ iteration: 0, loss: computeMSE(rows, w, b) }];

function formatNumber(value: number | null | undefined, digits = 3) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '—';
  }

  return Number(value).toFixed(digits);
}

function buildChart(availableRows: Observation[], w: number, b: number) {
  const range = getRangeForChart(availableRows);
  const width = 420;
  const height = 260;
  const pad = 16;
  const xSpan = Math.max(range.maxX - range.minX, 1);
  const ySpan = Math.max(range.maxY - range.minY, 1);

  const xScale = (value: number) => ((value - range.minX) / xSpan) * (width - pad * 2) + pad;
  const yScale = (value: number) => height - (((value - range.minY) / ySpan) * (height - pad * 2) + pad);

  const linePoints = Array.from({ length: 200 }, (_, index) => {
    const x = range.minX + (index / 199) * xSpan;
    const y = w * x + b;
    return `${xScale(x)},${yScale(y)}`;
  }).join(' ');

  const scatterPoints = availableRows.map((row) => ({
    x: xScale(row.x),
    y: yScale(row.y),
    predictionX: xScale(row.x),
    predictionY: yScale(predict(w, b, row.x)),
  }));

  return { linePoints, scatterPoints, xScale, yScale, range };
}

export function SimpleLinearRegressionLab() {
  const validRows = useMemo(() => getValidObservations(defaultDatasetRows), []);
  const [dataset, setDataset] = useState<DatasetRow[]>(defaultDatasetRows);
  const [initialSettings, setInitialSettings] = useState({
    initialW: defaultTrainingConfig.initialW,
    initialB: defaultTrainingConfig.initialB,
    learningRate: defaultTrainingConfig.learningRate,
    iterations: defaultTrainingConfig.iterations,
  });
  const [model, setModel] = useState<ModelState>({
    w: defaultTrainingConfig.initialW,
    b: defaultTrainingConfig.initialB,
    learningRate: defaultTrainingConfig.learningRate,
    iterations: defaultTrainingConfig.iterations,
    iteration: 0,
    history: defaultHistory(validRows, defaultTrainingConfig.initialW, defaultTrainingConfig.initialB),
    status: 'Ready for training.',
    isTraining: false,
  });
  const [closedForm, setClosedForm] = useState<ReturnType<typeof computeClosedFormSolution> | null>(null);
  const validObservations = useMemo(() => getValidObservations(dataset), [dataset]);
  const currentLoss = useMemo(() => computeMSE(validObservations, model.w, model.b), [validObservations, model.w, model.b]);
  const residuals = useMemo(() => computeResiduals(validObservations, model.w, model.b), [validObservations, model.w, model.b]);
  const gradients = useMemo(() => computeGradients(validObservations, model.w, model.b), [validObservations, model.w, model.b]);
  const nextStep = useMemo(() => {
    if (validObservations.length < 2) {
      return null;
    }

    return computeGradientDescentStep(validObservations, model.w, model.b, model.learningRate);
  }, [model.b, model.learningRate, model.w, validObservations]);
  const chart = useMemo(() => buildChart(validObservations, model.w, model.b), [model.b, model.w, validObservations]);

  useEffect(() => {
    if (validObservations.length >= 2) {
      setClosedForm(computeClosedFormSolution(validObservations));
    } else {
      setClosedForm(null);
    }
  }, [validObservations]);

  useEffect(() => {
    if (!model.isTraining) {
      return undefined;
    }

    if (validObservations.length < 2) {
      setModel((prev) => ({ ...prev, isTraining: false, status: 'Need at least two valid observations to train.' }));
      return undefined;
    }

    if (model.iteration >= model.iterations) {
      setModel((prev) => ({
        ...prev,
        isTraining: false,
        status: `Training finished after ${prev.iteration} iterations.`,
      }));
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setModel((prev) => {
        if (!prev.isTraining) {
          return prev;
        }

        const step = computeGradientDescentStep(validObservations, prev.w, prev.b, prev.learningRate);

        if (!step.valid) {
          return {
            ...prev,
            isTraining: false,
            status: step.message,
          };
        }

        const nextIteration = prev.iteration + 1;
        const nextHistory = [...prev.history, { iteration: nextIteration, loss: step.loss }];
        const shouldStop = nextIteration >= prev.iterations;
        const rateNote = step.actualLearningRate < prev.learningRate
          ? ` Learning rate reduced to ${formatMetric(step.actualLearningRate, 10)} for stability.`
          : '';

        return {
          ...prev,
          w: step.w,
          b: step.b,
          iteration: nextIteration,
          history: nextHistory,
          isTraining: !shouldStop,
          status: shouldStop
            ? `Training finished after ${nextIteration} iterations.${rateNote}`
            : `Iteration ${nextIteration}: loss ${formatMetric(step.loss)}.${rateNote}`,
        };
      });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [model.isTraining, model.iteration, model.iterations, validObservations, model.learningRate]);

  const changeDataset = (nextDataset: DatasetRow[]) => {
    const observations = getValidObservations(nextDataset);
    setDataset(nextDataset);
    setModel((previous) => {
      return {
        ...previous,
        iteration: 0,
        history: defaultHistory(observations, previous.w, previous.b),
        isTraining: false,
        status: 'Dataset updated; training progress reset.',
      };
    });
  };

  const updateRow = (id: number, field: 'x' | 'y', value: string) => {
    changeDataset(dataset.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const addRow = () => {
    if (dataset.length < MAX_LAB_OBSERVATIONS) {
      changeDataset([...dataset, { id: Date.now() + Math.random(), x: '', y: '' }]);
    }
  };

  const removeRow = (id: number) => {
    if (dataset.length > 2) {
      changeDataset(dataset.filter((row) => row.id !== id));
    }
  };

  const resetDataset = () => {
    setDataset(defaultDatasetRows);
    setModel((prev) => ({
      ...prev,
      w: initialSettings.initialW,
      b: initialSettings.initialB,
      iteration: 0,
      history: defaultHistory(getValidObservations(defaultDatasetRows), initialSettings.initialW, initialSettings.initialB),
      status: 'Dataset reset to the default observations.',
      isTraining: false,
    }));
  };

  const applyStep = () => {
    if (validObservations.length < 2) {
      setModel((prev) => ({ ...prev, status: 'Need at least two valid observations for training.' }));
      return;
    }

    const step = computeGradientDescentStep(validObservations, model.w, model.b, model.learningRate);

    if (!step.valid) {
      setModel((prev) => ({ ...prev, isTraining: false, status: step.message }));
      return;
    }

    const nextIteration = model.iteration + 1;
    setModel((prev) => ({
      ...prev,
      w: step.w,
      b: step.b,
      iteration: nextIteration,
      history: [...prev.history, { iteration: nextIteration, loss: step.loss }],
      isTraining: false,
      status: step.actualLearningRate < model.learningRate
        ? `Updated after step ${nextIteration}. Learning rate reduced to ${formatMetric(step.actualLearningRate, 10)} for stability.`
        : `Updated after step ${nextIteration}.`,
    }));
  };

  const resetParameters = () => {
    const nextLoss = computeMSE(validObservations, initialSettings.initialW, initialSettings.initialB);
    setModel((prev) => ({
      ...prev,
      w: initialSettings.initialW,
      b: initialSettings.initialB,
      learningRate: initialSettings.learningRate,
      iterations: initialSettings.iterations,
      iteration: 0,
      history: [{ iteration: 0, loss: nextLoss }],
      status: 'Parameters reset to the starting configuration.',
      isTraining: false,
    }));
  };

  const resetAll = () => {
    const defaultLoss = computeMSE(getValidObservations(defaultDatasetRows), defaultTrainingConfig.initialW, defaultTrainingConfig.initialB);
    setDataset(defaultDatasetRows);
    setInitialSettings({
      initialW: defaultTrainingConfig.initialW,
      initialB: defaultTrainingConfig.initialB,
      learningRate: defaultTrainingConfig.learningRate,
      iterations: defaultTrainingConfig.iterations,
    });
    setModel({
      w: defaultTrainingConfig.initialW,
      b: defaultTrainingConfig.initialB,
      learningRate: defaultTrainingConfig.learningRate,
      iterations: defaultTrainingConfig.iterations,
      iteration: 0,
      history: [{ iteration: 0, loss: defaultLoss }],
      status: 'Reset to the default dataset and parameters.',
      isTraining: false,
    });
  };

  const updateInitialSetting = (field: 'initialW' | 'initialB' | 'learningRate' | 'iterations', value: string) => {
    const parsed = parseNumericInput(value);
    if (parsed === null) {
      return;
    }

    if (field === 'iterations') {
      const iterations = Math.min(MAX_REGRESSION_TRAINING_ITERATIONS, Math.max(1, Math.round(parsed)));
      setInitialSettings((prev) => ({ ...prev, iterations }));
      setModel((prev) => ({ ...prev, iterations, isTraining: false, status: `Training schedule set to ${iterations} iterations (maximum ${MAX_REGRESSION_TRAINING_ITERATIONS}).` }));
      return;
    }

    if (field === 'learningRate') {
      const learningRate = Math.max(1e-12, Math.min(parsed, 1));
      setInitialSettings((prev) => ({ ...prev, learningRate }));
      setModel((prev) => ({
        ...prev,
        learningRate,
        isTraining: false,
        status: learningRate < parsed ? 'Learning rate limited to 1.' : 'Learning rate updated.',
      }));
      return;
    }

    const parameter = Math.max(-MAX_LAB_PARAMETER_MAGNITUDE, Math.min(parsed, MAX_LAB_PARAMETER_MAGNITUDE));
    setInitialSettings((prev) => ({
      ...prev,
      [field]: parameter,
    }));
    setModel((prev) => {
      return {
        ...prev,
        [field === 'initialW' ? 'w' : 'b']: parameter,
        isTraining: false,
        status: 'Starting configuration updated.',
      };
    });
  };

  const applyClosedForm = () => {
    if (!closedForm || !closedForm.valid) {
      return;
    }

    setModel((prev) => ({
      ...prev,
      w: closedForm.w,
      b: closedForm.b,
      status: 'Closed-form solution applied. This is a comparison, not an automatic replacement.',
      isTraining: false,
    }));
  };

  return (
    <div className="mx-auto max-w-8xl px-6 pb-20 pt-8 lg:px-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <a href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to Resources
        </a>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="mono-label">Section A</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Understand the data</h2>
            </div>
            <button type="button" onClick={resetDataset} className="inline-flex items-center justify-center rounded-full border border-ink-200 px-3.5 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white">
              Reset Dataset
            </button>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500">
            The feature is the input variable, and the target is the value the model tries to predict. Here, the input is hours studied and the target is an exam score.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100">
            <table className="min-w-full text-left">
              <thead className="bg-ink-50 text-xs uppercase tracking-[0.15em] text-ink-500">
                <tr>
                  <th className="px-4 py-3">Feature (x)</th>
                  <th className="px-4 py-3">Target (y)</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataset.map((row) => (
                  <tr key={row.id} className="border-t border-ink-100">
                    <td className="px-4 py-3"><input aria-label={`Feature value for row ${row.id}`} type="number" min={-100_000} max={100_000} value={row.x} onChange={(event) => updateRow(row.id, 'x', event.target.value)} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-accent-500" /></td>
                    <td className="px-4 py-3"><input aria-label={`Target value for row ${row.id}`} type="number" min={-100_000} max={100_000} value={row.y} onChange={(event) => updateRow(row.id, 'y', event.target.value)} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-accent-500" /></td>
                    <td className="px-4 py-3"><div className="flex justify-end"><button type="button" onClick={() => removeRow(row.id)} disabled={dataset.length <= 2} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:border-error-400 hover:text-error-600 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Delete row ${row.id}`}><Trash2 className="h-4 w-4" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={addRow} disabled={dataset.length >= MAX_LAB_OBSERVATIONS} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-50"><Plus className="h-4 w-4" /> Add observation</button>
          </div>

          <p role="status" className="mt-4 text-sm text-ink-500">
            {validObservations.length < 2
              ? 'Enter at least two complete observations with values between −100,000 and 100,000 to train.'
              : validObservations.length < dataset.length
                ? `${dataset.length - validObservations.length} incomplete or out-of-range row(s) are excluded. Complete all rows with values between −100,000 and 100,000.`
                : `Dataset is ready. Maximum ${MAX_LAB_OBSERVATIONS} observations.`}
          </p>
        </section>

        <aside className="rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Section B</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Model</h2>
          <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm font-medium text-ink-500">Current equation</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">ŷ = {formatNumber(model.w)}x + {formatNumber(model.b)}</p>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-ink-600"><label htmlFor="weight-slider">Weight (w)</label><span>{formatNumber(model.w)}</span></div>
              <input id="weight-slider" type="range" min={-5} max={5} step={0.05} value={model.w} onChange={(event) => setModel((prev) => ({ ...prev, w: Number(event.target.value), status: 'Model weight adjusted manually.' }))} className="w-full accent-accent-600" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-ink-600"><label htmlFor="bias-slider">Bias (b)</label><span>{formatNumber(model.b)}</span></div>
              <input id="bias-slider" type="range" min={-5} max={5} step={0.05} value={model.b} onChange={(event) => setModel((prev) => ({ ...prev, b: Number(event.target.value), status: 'Model bias adjusted manually.' }))} className="w-full accent-accent-600" />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-4 text-sm text-ink-600">
            <p><span className="font-medium text-ink-900">x</span> = input feature</p>
            <p><span className="font-medium text-ink-900">y</span> = actual target</p>
            <p><span className="font-medium text-ink-900">ŷ</span> = predicted target</p>
            <p><span className="font-medium text-ink-900">w</span> = weight / slope</p>
            <p><span className="font-medium text-ink-900">b</span> = bias / intercept</p>
          </div>
        </aside>
      </div>

      <section className="mt-10 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
        <p className="mono-label">Section B</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Scatter plot and prediction line</h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 p-3">
          <svg viewBox="0 0 420 260" className="h-[260px] w-full" role="img" aria-label="Linear regression scatter plot with prediction line">
            <rect x="0" y="0" width="420" height="260" fill="#f7f8f9" />
            <line x1="16" y1="228" x2="404" y2="228" stroke="#364152" strokeWidth="1.5" />
            <line x1="16" y1="16" x2="16" y2="228" stroke="#364152" strokeWidth="1.5" />
            {Array.from({ length: 6 }, (_, index) => (<line key={`x-grid-${index}`} x1={16 + index * 64} y1="16" x2={16 + index * 64} y2="228" stroke="#dfe4e8" strokeWidth="1" />))}
            {Array.from({ length: 5 }, (_, index) => (<line key={`y-grid-${index}`} x1="16" y1={16 + index * 42} x2="404" y2={16 + index * 42} stroke="#dfe4e8" strokeWidth="1" />))}
            {chart.scatterPoints.map((point, index) => (
              <g key={`scatter-${index}`}>
                <line x1={point.predictionX} y1={point.predictionY} x2={point.x} y2={point.y} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                <circle cx={point.x} cy={point.y} r="5" fill="#1a1d21" />
                <circle cx={point.predictionX} cy={point.predictionY} r="4" fill="#3b6df0" />
              </g>
            ))}
            {validObservations.length > 1 && (<polyline points={chart.linePoints} fill="none" stroke="#3b6df0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
            <text x="200" y="250" textAnchor="middle" fontSize="12" fill="#5a626d">Feature (x)</text>
            <text x="10" y="130" textAnchor="middle" fontSize="12" fill="#5a626d" transform="rotate(-90 10 130)">Target (y)</text>
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink-600">
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-ink-900" /> Actual observations</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-accent-600" /> Prediction</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-6 rounded-full bg-warning-400" /> Residual</span>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section C</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Prediction error and loss</h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100">
            <table className="min-w-full text-left">
              <thead className="bg-ink-50 text-xs uppercase tracking-[0.15em] text-ink-500">
                <tr>
                  <th className="px-4 py-3">Actual</th>
                  <th className="px-4 py-3">Predicted</th>
                  <th className="px-4 py-3">Residual</th>
                  <th className="px-4 py-3">Squared residual</th>
                </tr>
              </thead>
              <tbody>
                {residuals.map((row, index) => (
                  <tr key={`${row.x}-${row.y}-${index}`} className="border-b border-ink-100 text-sm text-ink-600">
                    <td className="px-4 py-3">{formatNumber(row.y)}</td>
                    <td className="px-4 py-3">{formatNumber(row.prediction)}</td>
                    <td className="px-4 py-3">{formatNumber(row.residual)}</td>
                    <td className="px-4 py-3">{formatNumber(row.squaredResidual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-ink-400">MSE</p><p className="mt-2 text-2xl font-semibold text-ink-900">{formatMetric(currentLoss)}</p></div>
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-ink-400">Average residual</p><p className="mt-2 text-2xl font-semibold text-ink-900">{formatMetric(residuals.reduce((sum, item) => sum + item.residual, 0) / Math.max(residuals.length, 1))}</p></div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-500">Mean squared error emphasises larger mistakes by squaring residuals before averaging. It is not the same as the average residual.</p>
        </div>

        <div className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section D</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Gradient descent</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-ink-600"><span className="mb-2 block">Initial weight</span><input type="number" min={-MAX_LAB_PARAMETER_MAGNITUDE} max={MAX_LAB_PARAMETER_MAGNITUDE} value={initialSettings.initialW} step="0.05" onChange={(event) => updateInitialSetting('initialW', event.target.value)} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500" /></label>
            <label className="block text-sm text-ink-600"><span className="mb-2 block">Initial bias</span><input type="number" min={-MAX_LAB_PARAMETER_MAGNITUDE} max={MAX_LAB_PARAMETER_MAGNITUDE} value={initialSettings.initialB} step="0.05" onChange={(event) => updateInitialSetting('initialB', event.target.value)} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500" /></label>
            <label className="block text-sm text-ink-600"><span className="mb-2 block">Learning rate (maximum 1)</span><input type="number" value={initialSettings.learningRate} min="0.000000000001" max="1" step="0.001" onChange={(event) => updateInitialSetting('learningRate', event.target.value)} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500" /></label>
            <label className="block text-sm text-ink-600"><span className="mb-2 block">Iterations (max {MAX_REGRESSION_TRAINING_ITERATIONS})</span><input type="number" value={initialSettings.iterations} min="1" max={MAX_REGRESSION_TRAINING_ITERATIONS} step="1" onChange={(event) => updateInitialSetting('iterations', event.target.value)} className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500" /></label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={applyStep} disabled={model.iteration >= model.iterations} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"><Play className="h-4 w-4" /> Take One Step</button>
            <button type="button" onClick={() => setModel((prev) => ({ ...prev, isTraining: !prev.isTraining, status: prev.isTraining ? 'Training paused.' : 'Training started.' }))} disabled={!model.isTraining && model.iteration >= model.iterations} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900 disabled:cursor-not-allowed disabled:opacity-50">{model.isTraining ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{model.isTraining ? 'Pause' : 'Train'}</button>
            <button type="button" onClick={resetParameters} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900"><RotateCcw className="h-4 w-4" /> Reset Parameters</button>
            <button type="button" onClick={resetAll} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900"><RotateCcw className="h-4 w-4" /> Reset All</button>
          </div>

          <div className="mt-6 rounded-2xl border border-ink-100 bg-ink-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-ink-400">Training status</p><p className="mt-2 text-base font-medium text-ink-900">{model.status}</p><div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm text-ink-600"><p>Iteration: <span className="font-medium text-ink-900">{model.iteration}</span></p><p>Loss change: <span className="font-medium text-ink-900">{formatMetric((model.history[model.history.length - 1]?.loss ?? 0) - (model.history[0]?.loss ?? 0))}</span></p></div></div>

          <div className="mt-6 space-y-3 rounded-2xl border border-ink-100 bg-white p-4 text-sm text-ink-600">
            <p><span className="font-medium text-ink-900">Gradient w</span>: {formatNumber(gradients.gradientW)}</p>
            <p><span className="font-medium text-ink-900">Gradient b</span>: {formatNumber(gradients.gradientB)}</p>
            <p><span className="font-medium text-ink-900">Current loss</span>: {formatNumber(currentLoss)}</p>
            {nextStep && <p><span className="font-medium text-ink-900">Next update</span>: w {formatNumber(nextStep.w)} | b {formatNumber(nextStep.b)}</p>}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
        <p className="mono-label">Section E</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Loss versus iteration</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 p-3">
          <svg viewBox="0 0 420 220" className="h-[220px] w-full" role="img" aria-label="Loss versus iteration chart">
            <rect x="0" y="0" width="420" height="220" fill="#f7f8f9" />
            <line x1="20" y1="190" x2="400" y2="190" stroke="#364152" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="20" y2="190" stroke="#364152" strokeWidth="1.5" />
            {model.history.length > 1 && (() => {
              const values = model.history.map((point) => point.loss);
              const minValue = Math.min(...values, 0);
              const maxValue = Math.max(...values, 1);
              const safeRange = maxValue - minValue || 1;
              const xStep = 360 / Math.max(model.history.length - 1, 1);
              const linePoints = model.history.map((point, index) => {
                const x = 20 + index * xStep;
                const y = 190 - ((point.loss - minValue) / safeRange) * 150;
                return `${x},${y}`;
              }).join(' ');
              return <polyline points={linePoints} fill="none" stroke="#3b6df0" strokeWidth="3" />;
            })()}
            {model.history.map((point, index) => {
              const values = model.history.map((item) => item.loss);
              const minValue = Math.min(...values, 0);
              const maxValue = Math.max(...values, 1);
              const safeRange = maxValue - minValue || 1;
              const x = 20 + (index / Math.max(model.history.length - 1, 1)) * 360;
              const y = 190 - ((point.loss - minValue) / safeRange) * 150;
              return <circle key={`loss-point-${point.iteration}`} cx={x} cy={y} r="4" fill="#1a1d21" />;
            })}
          </svg>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-ink-600">
          <p>Initial loss: <span className="font-medium text-ink-900">{formatMetric(model.history[0]?.loss ?? 0)}</span></p>
          <p>Current loss: <span className="font-medium text-ink-900">{formatMetric(model.history[model.history.length - 1]?.loss ?? currentLoss)}</span></p>
        </div>
      </section>

      <details open className="mt-10 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-xl font-semibold tracking-tight text-ink-900"><span>What happens during one gradient descent step?</span><ChevronDown className="h-5 w-5 text-ink-500" /></summary>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-ink-600">
          <ol className="space-y-4">
            <li><span className="font-medium text-ink-900">1. Predictions</span>: {validObservations.map((row, index) => <span key={`pred-${index}`}>{`(${row.x}, ${row.y}) → ŷ = ${formatNumber(predict(model.w, model.b, row.x))}`}{index < validObservations.length - 1 ? '; ' : ''}</span>)}</li>
            <li><span className="font-medium text-ink-900">2. Residuals</span>: {residuals.map((row, index) => <span key={`res-${index}`}>{`e${index + 1} = ${formatNumber(row.residual)}`}{index < residuals.length - 1 ? '; ' : ''}</span>)}</li>
            <li><span className="font-medium text-ink-900">3. Current MSE</span>: {formatMetric(currentLoss)}</li>
            <li><span className="font-medium text-ink-900">4. Gradient with respect to weight</span>: {formatNumber(gradients.gradientW)}</li>
            <li><span className="font-medium text-ink-900">5. Gradient with respect to bias</span>: {formatNumber(gradients.gradientB)}</li>
            <li><span className="font-medium text-ink-900">6. Weight update</span>: w_new = w − α∂J/∂w = {formatNumber(model.w)} − {formatNumber(nextStep?.actualLearningRate ?? model.learningRate)} × {formatNumber(gradients.gradientW)} = {formatNumber(nextStep?.w ?? model.w)}</li>
            <li><span className="font-medium text-ink-900">7. Bias update</span>: b_new = b − α∂J/∂b = {formatNumber(model.b)} − {formatNumber(nextStep?.actualLearningRate ?? model.learningRate)} × {formatNumber(gradients.gradientB)} = {formatNumber(nextStep?.b ?? model.b)}</li>
            <li><span className="font-medium text-ink-900">8. Result</span>: {`w = ${formatNumber(nextStep?.w ?? model.w)}, b = ${formatNumber(nextStep?.b ?? model.b)}, loss = ${formatNumber(nextStep?.loss ?? currentLoss)}`}</li>
          </ol>
          <p>The gradient tells us the direction of steepest increase in error, so subtracting it moves the model toward a lower loss. The learning rate controls the step size; if a step would increase loss, it is automatically reduced to keep training stable.</p>
        </div>
      </details>

      <section className="mt-10 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
        <p className="mono-label">Section G</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Least squares comparison</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-500">Gradient descent is one method for minimizing the least-squares objective. The closed-form solution gives the exact minimum when the denominator is not zero.</p>

        {closedForm && (
          <div className="mt-6 rounded-2xl border border-ink-100 bg-ink-50 p-4">
            <p className="text-sm text-ink-600">{closedForm.valid ? `w* = ${formatNumber(closedForm.w)} and b* = ${formatNumber(closedForm.b)} with MSE ${formatNumber(closedForm.mse)}` : closedForm.message}</p>
            {closedForm.valid && <button type="button" onClick={applyClosedForm} className="mt-4 inline-flex items-center justify-center rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-900">Apply closed-form solution</button>}
          </div>
        )}
      </section>
    </div>
  );
}
