import { useMemo, useState } from 'react';
import { ArrowLeft, RotateCcw, Plus, Trash2 } from 'lucide-react';
import {
  buildDecisionTree,
  defaultDatasetRows,
  evaluateTree,
  flattenTreeRules,
  getValidObservations,
  predictClass,
  type Criterion,
} from '@/lib/decisionTreeClassification';

const plot = { width: 560, height: 360, pad: 40, columns: 28, rows: 18 };

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
  const bounds = { xMin: xMin - xPadding, xMax: xMax + xPadding, yMin: yMin - yPadding, yMax: yMax + yPadding };
  const xScale = (value: number) => plot.pad + ((value - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (plot.width - plot.pad * 2);
  const yScale = (value: number) => plot.height - plot.pad - ((value - bounds.yMin) / (bounds.yMax - bounds.yMin)) * (plot.height - plot.pad * 2);
  return { bounds, xScale, yScale };
}

function formatPercent(value: number | null) {
  return value === null ? '—' : `${(value * 100).toFixed(1)}%`;
}

export function DecisionTreeClassificationLab() {
  const [dataset, setDataset] = useState(defaultDatasetRows);
  const [criterion, setCriterion] = useState<Criterion>('gini');
  const [maxDepth, setMaxDepth] = useState(3);
  const [minSamplesLeaf, setMinSamplesLeaf] = useState(1);
  const observations = useMemo(() => getValidObservations(dataset), [dataset]);
  const tree = useMemo(
    () => buildDecisionTree(observations, criterion, maxDepth, minSamplesLeaf),
    [observations, criterion, maxDepth, minSamplesLeaf],
  );
  const metrics = useMemo(() => evaluateTree(observations, tree), [observations, tree]);
  const rules = useMemo(() => flattenTreeRules(tree), [tree]);
  const geometry = useMemo(() => getChartGeometry(observations), [observations]);
  const cells = useMemo(() => Array.from({ length: plot.columns * plot.rows }, (_, index) => {
    const column = index % plot.columns;
    const rowIndex = Math.floor(index / plot.columns);
    const studyHours = geometry.bounds.xMin + ((column + 0.5) / plot.columns) * (geometry.bounds.xMax - geometry.bounds.xMin);
    const practiceTests = geometry.bounds.yMin + ((rowIndex + 0.5) / plot.rows) * (geometry.bounds.yMax - geometry.bounds.yMin);
    return {
      column,
      rowIndex,
      prediction: predictClass(tree, studyHours, practiceTests),
      x: plot.pad + column * (plot.width - plot.pad * 2) / plot.columns,
      y: plot.height - plot.pad - (rowIndex + 1) * (plot.height - plot.pad * 2) / plot.rows,
    };
  }), [geometry.bounds, tree]);
  const boundaries = useMemo(() => {
    const byPosition = new Map(cells.map((cell) => [`${cell.column}:${cell.rowIndex}`, cell.prediction]));
    const cellWidth = (plot.width - plot.pad * 2) / plot.columns;
    const cellHeight = (plot.height - plot.pad * 2) / plot.rows;
    const segments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    cells.forEach((cell) => {
      const right = byPosition.get(`${cell.column + 1}:${cell.rowIndex}`);
      if (right !== undefined && right !== cell.prediction) {
        segments.push({ x1: cell.x + cellWidth, y1: cell.y, x2: cell.x + cellWidth, y2: cell.y + cellHeight });
      }
      const above = byPosition.get(`${cell.column}:${cell.rowIndex + 1}`);
      if (above !== undefined && above !== cell.prediction) {
        segments.push({ x1: cell.x, y1: cell.y, x2: cell.x + cellWidth, y2: cell.y });
      }
    });
    return segments;
  }, [cells]);

  const updateFeature = (id: number, feature: 'studyHours' | 'practiceTests', value: string) => {
    setDataset((current) => current.map((row) => row.id === id ? { ...row, [feature]: value } : row));
  };

  const reset = () => {
    setDataset(defaultDatasetRows);
    setCriterion('gini');
    setMaxDepth(3);
    setMinSamplesLeaf(1);
  };

  return (
    <div className="mx-auto max-w-8xl px-6 pb-20 pt-8 lg:px-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <a href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to Resources
        </a>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-3.5 py-2 text-sm font-medium text-ink-900 hover:border-ink-900">
          <RotateCcw className="h-4 w-4" /> Reset lab
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="min-w-0 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section A</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Explore the dataset</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">Classify whether a student passes using study hours and practice tests. Passing depends on both features being high, creating a nonlinear corner-shaped region. Incomplete rows are ignored.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-100">
            <table className="min-w-[550px] text-left">
              <thead className="bg-ink-50 text-xs uppercase tracking-[0.12em] text-ink-500">
                <tr><th className="px-3 py-3">Study hours</th><th className="px-3 py-3">Practice tests</th><th className="px-3 py-3">Outcome</th><th className="px-3 py-3 text-right">Action</th></tr>
              </thead>
              <tbody>
                {dataset.map((row) => (
                  <tr key={row.id} className="border-t border-ink-100">
                    <td className="px-2 py-2"><input aria-label={`Study hours, observation ${row.id}`} type="number" step="0.5" value={row.studyHours} onChange={(event) => updateFeature(row.id, 'studyHours', event.target.value)} className="w-28 rounded-lg border border-ink-200 px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500" /></td>
                    <td className="px-2 py-2"><input aria-label={`Practice tests, observation ${row.id}`} type="number" step="0.5" value={row.practiceTests} onChange={(event) => updateFeature(row.id, 'practiceTests', event.target.value)} className="w-28 rounded-lg border border-ink-200 px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500" /></td>
                    <td className="px-2 py-2">
                      <select aria-label={`Outcome, observation ${row.id}`} value={row.label} onChange={(event) => setDataset((current) => current.map((item) => item.id === row.id ? { ...item, label: event.target.value === '1' ? '1' : '0' } : item))} className="rounded-lg border border-ink-200 bg-white px-2.5 py-2 text-sm text-ink-900 outline-none focus:border-accent-500">
                        <option value="0">0 · Fail</option><option value="1">1 · Pass</option>
                      </select>
                    </td>
                    <td className="px-2 py-2"><div className="flex justify-end"><button type="button" onClick={() => setDataset((current) => current.length > 2 ? current.filter((item) => item.id !== row.id) : current)} disabled={dataset.length <= 2} aria-label={`Delete observation ${row.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:border-error-400 hover:text-error-600 disabled:opacity-40"><Trash2 className="h-4 w-4" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setDataset((current) => [...current, { id: Date.now(), studyHours: '', practiceTests: '', label: '0' }])} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-ink-700"><Plus className="h-4 w-4" /> Add observation</button>
            <p className="text-sm text-ink-500">{observations.length} complete observations</p>
          </div>
        </section>

        <aside className="min-w-0 rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Section B</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Tree settings</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">At each node, the tree picks the split with the greatest impurity reduction.</p>
          <label className="mt-5 block text-sm text-ink-600">Split criterion
            <select aria-label="Split criterion" value={criterion} onChange={(event) => setCriterion(event.target.value as Criterion)} className="mt-2 w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-ink-900 outline-none focus:border-accent-500">
              <option value="gini">Gini impurity</option><option value="entropy">Entropy (information gain)</option>
            </select>
          </label>
          <label className="mt-5 block text-sm text-ink-600">
            <span className="flex justify-between"><span>Maximum depth</span><span className="font-mono text-ink-900">{maxDepth}</span></span>
            <input aria-label="Maximum depth" type="range" min="1" max="6" step="1" value={maxDepth} onChange={(event) => setMaxDepth(Number(event.target.value))} className="mt-3 w-full accent-accent-600" />
            <span className="mt-1 block text-xs text-ink-500">Limits how many decisions can follow a path.</span>
          </label>
          <label className="mt-5 block text-sm text-ink-600">
            <span className="flex justify-between"><span>Minimum samples per leaf</span><span className="font-mono text-ink-900">{minSamplesLeaf}</span></span>
            <input aria-label="Minimum samples per leaf" type="range" min="1" max="5" step="1" value={minSamplesLeaf} onChange={(event) => setMinSamplesLeaf(Number(event.target.value))} className="mt-3 w-full accent-accent-600" />
            <span className="mt-1 block text-xs text-ink-500">Larger leaves simplify the tree and can limit overfitting.</span>
          </label>
          <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm font-medium text-ink-500">Root node</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-900">{tree.samples} observations · {criterion === 'gini' ? 'Gini' : 'Entropy'} {tree.impurity.toFixed(3)}{tree.feature ? ` · split gain ${tree.gain.toFixed(3)}` : ' · no useful split found'}</p>
          </div>
        </aside>
      </div>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Section C</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Decision regions</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">Unlike logistic regression’s straight boundary, a decision tree makes axis-aligned splits that form rectangular regions.</p>
          <div className="mt-5 overflow-x-auto">
            <svg role="img" aria-label="Decision tree classification regions and student observations" viewBox={`0 0 ${plot.width} ${plot.height}`} className="h-auto min-w-[420px] w-full">
              {cells.map((cell) => (
                <rect key={`${cell.column}-${cell.rowIndex}`} x={cell.x} y={cell.y} width={(plot.width - plot.pad * 2) / plot.columns + 0.3} height={(plot.height - plot.pad * 2) / plot.rows + 0.3} fill={cell.prediction === 1 ? '#dff4e8' : '#fff0e8'} />
              ))}
              <g stroke="#3b6df0" strokeWidth="2.5">
                {boundaries.map((segment, index) => <line key={index} {...segment} />)}
              </g>
              <line x1={plot.pad} y1={plot.height - plot.pad} x2={plot.width - plot.pad} y2={plot.height - plot.pad} stroke="#7d8792" />
              <line x1={plot.pad} y1={plot.pad} x2={plot.pad} y2={plot.height - plot.pad} stroke="#7d8792" />
              {observations.map((row) => <circle key={row.id} cx={geometry.xScale(row.studyHours)} cy={geometry.yScale(row.practiceTests)} r="6" fill={row.label === 1 ? '#16834b' : '#d35d2d'} stroke="white" strokeWidth="2"><title>{`Study ${row.studyHours} hours, ${row.practiceTests} practice tests, actual class ${row.label}`}</title></circle>)}
              <text x={plot.width / 2} y={plot.height - 5} textAnchor="middle" className="fill-ink-500 text-[11px]">Study hours</text>
              <text x="15" y={plot.height / 2} textAnchor="middle" transform={`rotate(-90 15 ${plot.height / 2})`} className="fill-ink-500 text-[11px]">Practice tests</text>
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap gap-5 text-xs text-ink-600">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#d35d2d]" /> Fail · class 0</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#16834b]" /> Pass · class 1</span>
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4 bg-accent-600" /> Tree split</span>
          </div>
        </div>

        <div className="min-w-0 rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Section D</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Learn the rules</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">Each root-to-leaf path becomes an interpretable IF–THEN rule.</p>
          <div className="mt-4 space-y-2">
            {rules.map((rule, index) => <p key={index} className="rounded-xl border border-ink-100 bg-white p-3 text-xs leading-relaxed text-ink-700">{rule}</p>)}
          </div>
          <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-900">Evaluate the tree</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              ['Accuracy', formatPercent(metrics.accuracy)],
              ['Precision', formatPercent(metrics.precision)],
              ['Recall', formatPercent(metrics.recall)],
              ['Leaves', String(rules.length)],
            ].map(([label, value]) => <div key={label} className="rounded-xl border border-ink-100 bg-white p-3"><p className="text-xs text-ink-500">{label}</p><p className="mt-1 text-lg font-semibold text-ink-900">{value}</p></div>)}
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-ink-100 bg-white">
            <p className="px-3 pt-3 text-xs font-medium text-ink-500">Confusion matrix · rows are actual, columns are predicted</p>
            <table className="mt-2 w-full text-center text-sm">
              <thead className="text-xs text-ink-500"><tr><th className="px-2 py-2" /><th className="px-2 py-2">Predicted fail</th><th className="px-2 py-2">Predicted pass</th></tr></thead>
              <tbody>
                <tr className="border-t border-ink-100"><th className="px-2 py-2 text-left text-xs font-medium text-ink-600">Actual fail</th><td className="px-2 py-2 font-semibold text-ink-900">{metrics.trueNegative}</td><td className="px-2 py-2 font-semibold text-ink-900">{metrics.falsePositive}</td></tr>
                <tr className="border-t border-ink-100"><th className="px-2 py-2 text-left text-xs font-medium text-ink-600">Actual pass</th><td className="px-2 py-2 font-semibold text-ink-900">{metrics.falseNegative}</td><td className="px-2 py-2 font-semibold text-ink-900">{metrics.truePositive}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
