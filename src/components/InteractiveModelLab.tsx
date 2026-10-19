import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  buildClassifier,
  classificationDataset,
  clusteringDataset,
  computePCA,
  nearestCentroid,
  projectOntoPC1,
  runKMeans,
  type ClassificationModel,
} from '@/lib/interactiveModels';

export type InteractiveModelKind = 'kmeans' | 'knn' | 'naive-bayes' | 'random-forest' | 'svm' | 'pca' | 'neural-network';

const details: Record<InteractiveModelKind, { title: string; summary: string; concept: string }> = {
  kmeans: {
    title: 'K-Means Clustering',
    summary: 'Choose a cluster count and iteration limit to watch centroids group unlabeled observations by similarity.',
    concept: 'K-Means alternates between assigning each point to its nearest centroid and moving each centroid to the mean of its assigned points.',
  },
  knn: {
    title: 'K-Nearest Neighbors',
    summary: 'Choose how many nearby examples vote, then see how the neighborhood size changes the classification regions.',
    concept: 'KNN stores the labeled examples. To classify a new point, it finds the k closest examples and predicts their majority class.',
  },
  'naive-bayes': {
    title: 'Gaussian Naive Bayes',
    summary: 'Explore probabilistic classification with two numeric features and adjustable variance smoothing.',
    concept: 'For each class, Gaussian Naive Bayes estimates a distribution for each feature and combines their likelihoods with the class prior. It assumes features are conditionally independent.',
  },
  'random-forest': {
    title: 'Random Forest Classification',
    summary: 'Compare classification regions as you change the number of randomized decision trees voting together.',
    concept: 'A random forest aggregates votes from decision trees trained on bootstrap samples. Random feature choices help decorrelate trees and improve the ensemble.',
  },
  svm: {
    title: 'Support Vector Machine',
    summary: 'Explore a linear maximum-margin classifier and see how regularization changes its decision boundary.',
    concept: 'A support vector machine seeks a separating line with a wide margin. Hinge loss penalizes points on the wrong side of that margin.',
  },
  pca: {
    title: 'Principal Component Analysis',
    summary: 'Project standardized feature values onto orthogonal directions and compare the variance captured by each component.',
    concept: 'PCA finds orthogonal directions that capture as much variation in the feature data as possible. The first component captures the most; the second captures the most remaining variance.',
  },
  'neural-network': {
    title: 'Neural Network Classification',
    summary: 'Adjust hidden-layer size and training steps to see how a small neural network learns a classification boundary.',
    concept: 'This small feed-forward network uses a tanh hidden layer and sigmoid output. Batch gradient descent adjusts its weights to reduce classification error.',
  },
};

function format(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : '—';
}

function Control({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-xl border border-ink-100 bg-white p-4 text-sm text-ink-700">
      <span className="flex items-center justify-between gap-3">
        <span className="font-medium text-ink-900">{label}</span>
        <span className="font-mono text-ink-600">{value}</span>
      </span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-accent-600"
      />
    </label>
  );
}

export function InteractiveModelLab({ kind }: { kind: InteractiveModelKind }) {
  const [neighbors, setNeighbors] = useState(3);
  const [smoothing, setSmoothing] = useState(0.25);
  const [trees, setTrees] = useState(7);
  const [regularization, setRegularization] = useState(0.1);
  const [hiddenUnits, setHiddenUnits] = useState(4);
  const [epochs, setEpochs] = useState(200);
  const [clusterCount, setClusterCount] = useState(3);
  const [clusterIterations, setClusterIterations] = useState(5);
  const [component, setComponent] = useState(1);
  const [inputX, setInputX] = useState('6');
  const [inputY, setInputY] = useState('7');
  const x = inputX.trim() === '' ? null : Number(inputX);
  const y = inputY.trim() === '' ? null : Number(inputY);
  const validInput = x !== null && y !== null && Number.isFinite(x) && Number.isFinite(y)
    && x >= 0 && x <= 10 && y >= 0 && y <= 10;
  const pca = useMemo(() => computePCA(classificationDataset), []);
  const kmeans = useMemo(
    () => runKMeans(clusteringDataset, clusterCount, clusterIterations),
    [clusterCount, clusterIterations],
  );
  const model = useMemo<ClassificationModel | null>(() => {
    if (kind === 'knn') return { kind, neighbors };
    if (kind === 'naive-bayes') return { kind, smoothing };
    if (kind === 'random-forest') return { kind, trees };
    if (kind === 'svm') return { kind, regularization };
    if (kind === 'neural-network') return { kind, hiddenUnits, epochs };
    return null;
  }, [kind, neighbors, smoothing, trees, regularization, hiddenUnits, epochs]);
  const classifier = useMemo(
    () => model ? buildClassifier(classificationDataset, model) : null,
    [model],
  );
  const result = validInput && x !== null && y !== null
    ? kind === 'pca'
      ? projectOntoPC1(pca, x, y)
      : kind === 'kmeans'
        ? nearestCentroid(kmeans.centroids, x, y)
        : classifier?.(x, y) ?? null
    : null;
  const accuracy = classifier
    ? classificationDataset.reduce(
      (correct, point) => correct + Number(classifier(point.x, point.y) === point.label),
      0,
    ) / classificationDataset.length
    : null;
  const chart = { size: 320, pad: 24, extent: 10 };
  const scale = (value: number) => chart.pad + (value / chart.extent) * (chart.size - chart.pad * 2);
  const cellCount = 20;
  const cellSize = (chart.size - chart.pad * 2) / cellCount;
  const boundary = useMemo(() => {
    if (!classifier || kind === 'pca') return [];
    return Array.from({ length: cellCount * cellCount }, (_unused, index) => {
      const column = index % cellCount;
      const row = Math.floor(index / cellCount);
      const pointX = ((column + 0.5) / cellCount) * chart.extent;
      const pointY = ((cellCount - row - 0.5) / cellCount) * chart.extent;
      return { column, row, label: classifier(pointX, pointY) };
    });
  }, [classifier, kind, chart.extent]);
  const projectedVariance = component === 1 ? pca.variance1 : pca.variance2;
  const totalVariance = pca.variance1 + pca.variance2;
  const selectedScores = pca.scores.map((point) => ({
    ...point,
    horizontal: component === 1 ? point.pc1 : point.pc2,
    vertical: component === 1 ? point.pc2 : point.pc1,
  }));
  const scoreMin = Math.min(...selectedScores.map((point) => point.horizontal));
  const scoreMax = Math.max(...selectedScores.map((point) => point.horizontal));

  return (
    <div className="mx-auto max-w-8xl px-6 pb-20 pt-8 lg:px-10">
      <div className="mb-8">
        <a href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to Resources
        </a>
      </div>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-[0_12px_35px_rgba(13,15,18,0.04)] lg:p-7">
          <p className="mono-label">Interactive model</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">{details[kind].title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">{details[kind].summary}</p>

          {kind === 'pca' ? (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-100 bg-ink-50 p-3">
              <svg viewBox={`0 0 ${chart.size} ${chart.size}`} className="mx-auto h-[320px] w-full max-w-[420px]" role="img" aria-label="PCA projection showing the first and second principal component scores">
                <line x1={chart.pad} y1={chart.size / 2} x2={chart.size - chart.pad} y2={chart.size / 2} stroke="#aeb5be" strokeDasharray="4 4" />
                <line x1={chart.size / 2} y1={chart.pad} x2={chart.size / 2} y2={chart.size - chart.pad} stroke="#aeb5be" strokeDasharray="4 4" />
                {selectedScores.map((point, index) => (
                  <circle
                    key={index}
                    cx={chart.size / 2 + (point.horizontal / Math.max(Math.abs(scoreMin), Math.abs(scoreMax), 1)) * (chart.size / 2 - chart.pad)}
                    cy={chart.size / 2 - (point.vertical / Math.max(Math.abs(scoreMin), Math.abs(scoreMax), 1)) * (chart.size / 2 - chart.pad)}
                    r="5"
                    fill={point.label === 1 ? '#16864b' : '#e46d3a'}
                    fillOpacity="0.78"
                  >
                    <title>{`Study ${point.x}, practice ${point.y}; PC${component} score ${format(point.horizontal)}`}</title>
                  </circle>
                ))}
                <text x={chart.size / 2} y={chart.size - 3} textAnchor="middle" fontSize="11" fill="#5a626d">PC{component} score</text>
                <text x="12" y={chart.size / 2} textAnchor="middle" fontSize="11" fill="#5a626d" transform={`rotate(-90 12 ${chart.size / 2})`}>PC{component === 1 ? 2 : 1} score</text>
              </svg>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-100 bg-ink-50 p-3">
              <svg
                viewBox={`0 0 ${chart.size} ${chart.size}`}
                className="mx-auto h-[320px] w-full max-w-[420px]"
                role="img"
                aria-label={kind === 'kmeans' ? 'K-Means clusters, assignments and centroids' : `${details[kind].title} classification regions`}
              >
                {kind === 'kmeans'
                  ? Array.from({ length: cellCount * cellCount }, (_unused, index) => {
                    const column = index % cellCount;
                    const row = Math.floor(index / cellCount);
                    const pointX = ((column + 0.5) / cellCount) * chart.extent;
                    const pointY = ((cellCount - row - 0.5) / cellCount) * chart.extent;
                    return { column, row, cluster: nearestCentroid(kmeans.centroids, pointX, pointY) };
                  }).map((cell) => (
                    <rect
                      key={`${cell.column}-${cell.row}`}
                      x={chart.pad + cell.column * cellSize}
                      y={chart.pad + cell.row * cellSize}
                      width={cellSize + 0.4}
                      height={cellSize + 0.4}
                      fill={['#e5efff', '#fce9dc', '#e2f5e8', '#f2e8fa', '#fff4cc'][cell.cluster]}
                    />
                  ))
                  : boundary.map((cell) => (
                  <rect
                    key={`${cell.column}-${cell.row}`}
                    x={chart.pad + cell.column * cellSize}
                    y={chart.pad + cell.row * cellSize}
                    width={cellSize + 0.4}
                    height={cellSize + 0.4}
                    fill={cell.label === 1 ? '#dff4e8' : '#fff0e8'}
                  />
                ))}
                {(kind === 'kmeans' ? clusteringDataset : classificationDataset).map((point, index) => {
                  const cluster = kmeans.assignments[index];
                  const label = 'label' in point ? point.label : 0;
                  const fill = kind === 'kmeans'
                    ? ['#3974c6', '#e46d3a', '#16864b', '#8751ad', '#c28a00'][cluster]
                    : label === 1 ? '#16864b' : '#e46d3a';
                  return (
                  <circle key={index} cx={scale(point.x)} cy={chart.size - scale(point.y)} r="5.5" fill={fill} stroke="white" strokeWidth="1.5">
                    <title>{kind === 'kmeans'
                      ? `Study hours ${point.x}, practice tests ${point.y}, cluster ${cluster + 1}`
                      : `Study hours ${point.x}, practice tests ${point.y}, class ${label}`}</title>
                  </circle>
                  );
                })}
                {kind === 'kmeans' && kmeans.centroids.map((centroid, index) => (
                  <g key={index}>
                    <path d={`M ${scale(centroid.x) - 6} ${chart.size - scale(centroid.y) - 6} L ${scale(centroid.x) + 6} ${chart.size - scale(centroid.y) + 6} M ${scale(centroid.x) + 6} ${chart.size - scale(centroid.y) - 6} L ${scale(centroid.x) - 6} ${chart.size - scale(centroid.y) + 6}`} stroke="#17202b" strokeWidth="3" />
                    <title>{`Cluster ${index + 1} centroid`}</title>
                  </g>
                ))}
                {validInput && x !== null && y !== null && (
                  <g>
                    <circle cx={scale(x)} cy={chart.size - scale(y)} r="9" fill="#29384b" stroke="white" strokeWidth="2" />
                    <text x={scale(x) + 11} y={chart.size - scale(y) - 10} fontSize="11" fill="#29384b" fontWeight="bold">you</text>
                  </g>
                )}
                <text x={chart.size / 2} y={chart.size - 3} textAnchor="middle" fontSize="11" fill="#5a626d">Study hours</text>
                <text x="12" y={chart.size / 2} textAnchor="middle" fontSize="11" fill="#5a626d" transform={`rotate(-90 12 ${chart.size / 2})`}>Practice tests</text>
              </svg>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-600">
            {kind !== 'pca' && kind !== 'kmeans' && (
              <>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#e46d3a]" /> Class 0</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#16864b]" /> Class 1</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#dff4e8]" /> Predicted class region</span>
              </>
            )}
            {kind === 'pca' && (
              <>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#e46d3a]" /> Class 0 (for reference)</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#16864b]" /> Class 1 (for reference)</span>
              </>
            )}
            {kind === 'kmeans' && kmeans.centroids.map((_centroid, index) => (
              <span key={index} className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: ['#3974c6', '#e46d3a', '#16864b', '#8751ad', '#c28a00'][index] }} />
                Cluster {index + 1}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border border-ink-100 bg-ink-50 p-5 lg:p-7">
          <p className="mono-label">Explore the model</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">Adjust settings</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">{details[kind].concept}</p>

          <div className="mt-5 space-y-3">
            {kind === 'knn' && <Control label="Neighbors (k)" value={neighbors} min={1} max={15} step={2} onChange={setNeighbors} />}
            {kind === 'naive-bayes' && <Control label="Variance smoothing" value={smoothing} min={0.05} max={3} step={0.05} onChange={setSmoothing} />}
            {kind === 'random-forest' && <Control label="Trees in the forest" value={trees} min={1} max={15} step={2} onChange={setTrees} />}
            {kind === 'svm' && <Control label="Regularization" value={regularization} min={0.01} max={1} step={0.01} onChange={setRegularization} />}
            {kind === 'neural-network' && (
              <>
                <Control label="Hidden units" value={hiddenUnits} min={2} max={8} step={1} onChange={setHiddenUnits} />
                <Control label="Training epochs" value={epochs} min={20} max={400} step={20} onChange={setEpochs} />
              </>
            )}
            {kind === 'kmeans' && (
              <>
                <Control label="Number of clusters (k)" value={clusterCount} min={2} max={5} step={1} onChange={setClusterCount} />
                <Control label="Algorithm iterations" value={clusterIterations} min={1} max={15} step={1} onChange={setClusterIterations} />
              </>
            )}
            {kind === 'pca' && <Control label="Component to inspect" value={component} min={1} max={2} step={1} onChange={setComponent} />}
          </div>

          <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-4">
            <p className="text-sm font-medium text-ink-900">
              {kind === 'pca' ? `Variance explained by PC${component}` : kind === 'kmeans' ? 'Find the nearest cluster' : 'Try a new observation'}
            </p>
            {kind === 'pca' ? (
              <>
                <p className="mt-2 text-2xl font-semibold text-ink-900">{format(projectedVariance / totalVariance * 100)}%</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">
                  PC1 captures {format(pca.variance1 / totalVariance * 100)}%; PC2 captures {format(pca.variance2 / totalVariance * 100)}%. Select feature values to see their PC1 projection.
                </p>
              </>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="text-xs text-ink-600">
                  Study hours
                  <input aria-label="Inference input: study hours" type="number" min="0" max="10" step="0.1" value={inputX} onChange={(event) => setInputX(event.target.value)} className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-900 outline-none focus:border-accent-500" />
                </label>
                <label className="text-xs text-ink-600">
                  Practice tests
                  <input aria-label="Inference input: practice tests" type="number" min="0" max="10" step="0.1" value={inputY} onChange={(event) => setInputY(event.target.value)} className="mt-1 w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-900 outline-none focus:border-accent-500" />
                </label>
              </div>
            )}
            <div aria-live="polite" className="mt-4 rounded-xl bg-ink-50 p-3">
              {result === null ? (
                <p className="text-sm text-ink-600">Enter both feature values between 0 and 10.</p>
              ) : kind === 'pca' ? (
                <p className="text-sm text-ink-700">
                  New point projection on PC1: <span className="font-semibold text-ink-900">{format(result)}</span>
                </p>
              ) : kind === 'kmeans' ? (
                <p className="text-sm text-ink-700">
                  Nearest centroid: <span className="font-semibold text-ink-900">Cluster {Number(result) + 1}</span>
                  <span className="block text-xs text-ink-500">Cluster labels are arbitrary; only the assigned groups matter.</span>
                </p>
              ) : (
                <p className="text-sm text-ink-700">
                  Predicted class: <span className="font-semibold text-ink-900">{result}</span>
                  <span className="block text-xs text-ink-500">Example labels use study hours + practice tests ≥ 11; each algorithm may learn a different boundary.</span>
                </p>
              )}
            </div>
          </div>

          {accuracy !== null && (
            <div className="mt-4 rounded-xl border border-ink-100 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-ink-500">Training-set accuracy</p>
              <p className="mt-1 text-xl font-semibold text-ink-900">{format(accuracy * 100)}%</p>
              <p className="mt-1 text-xs text-ink-500">Calculated on the 25 labeled example points shown.</p>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
