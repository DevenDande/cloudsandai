export type ClassificationPoint = {
  x: number;
  y: number;
  label: 0 | 1;
};

export type ClassificationModel =
  | { kind: 'knn'; neighbors: number }
  | { kind: 'naive-bayes'; smoothing: number }
  | { kind: 'random-forest'; trees: number }
  | { kind: 'svm'; regularization: number }
  | { kind: 'neural-network'; hiddenUnits: number; epochs: number };

export const classificationDataset: ClassificationPoint[] = [1, 3, 5, 7, 9].flatMap((x) =>
  [1, 3, 5, 7, 9].map((y) => ({ x, y, label: x + y >= 11 ? 1 as const : 0 as const })),
);

export const clusteringDataset = classificationDataset.map(({ x, y }) => ({ x, y }));

export type KMeansResult = {
  centroids: Array<{ x: number; y: number }>;
  assignments: number[];
};

export function runKMeans(points: Array<{ x: number; y: number }>, clusterCount: number, iterations: number): KMeansResult {
  let centroids = Array.from({ length: clusterCount }, (_unused, index) => {
    const point = points[Math.floor((index * points.length) / clusterCount)];
    return { x: point.x, y: point.y };
  });
  let assignments = points.map(() => 0);
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    assignments = points.map((point) => centroids.reduce((best, centroid, index) => {
      const distance = (point.x - centroid.x) ** 2 + (point.y - centroid.y) ** 2;
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index);
    centroids = centroids.map((centroid, cluster) => {
      const members = points.filter((_point, index) => assignments[index] === cluster);
      if (members.length === 0) return centroid;
      return {
        x: members.reduce((sum, point) => sum + point.x, 0) / members.length,
        y: members.reduce((sum, point) => sum + point.y, 0) / members.length,
      };
    });
  }
  return { centroids, assignments };
}

export function nearestCentroid(centroids: Array<{ x: number; y: number }>, x: number, y: number) {
  return centroids.reduce((best, centroid, index) => {
    const distance = (x - centroid.x) ** 2 + (y - centroid.y) ** 2;
    return distance < best.distance ? { index, distance } : best;
  }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
}

function sigmoid(value: number) {
  if (value >= 0) return 1 / (1 + Math.exp(-value));
  const exponential = Math.exp(value);
  return exponential / (1 + exponential);
}

function predictKnn(points: ClassificationPoint[], x: number, y: number, neighbors: number): 0 | 1 {
  const nearest = points
    .map((point) => ({ label: point.label, distance: (point.x - x) ** 2 + (point.y - y) ** 2 }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.min(neighbors, points.length));
  return nearest.reduce((votes, point) => votes + point.label, 0) * 2 >= nearest.length ? 1 : 0;
}

function predictNaiveBayes(points: ClassificationPoint[], x: number, y: number, smoothing: number): 0 | 1 {
  const classes = ([0, 1] as const).map((label) => {
    const subset = points.filter((point) => point.label === label);
    const meanX = subset.reduce((sum, point) => sum + point.x, 0) / subset.length;
    const meanY = subset.reduce((sum, point) => sum + point.y, 0) / subset.length;
    const varianceX = Math.max(
      subset.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0) / subset.length,
      smoothing,
    );
    const varianceY = Math.max(
      subset.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0) / subset.length,
      smoothing,
    );
    const logLikelihood = (value: number, mean: number, variance: number) =>
      -0.5 * Math.log(2 * Math.PI * variance) - (value - mean) ** 2 / (2 * variance);
    return {
      label,
      score: Math.log(subset.length / points.length)
        + logLikelihood(x, meanX, varianceX)
        + logLikelihood(y, meanY, varianceY),
    };
  });
  return classes[1].score > classes[0].score ? 1 : 0;
}

type ForestNode = {
  prediction: 0 | 1;
  feature: 0 | 1 | null;
  threshold: number;
  left: ForestNode | null;
  right: ForestNode | null;
};

function trainForestTree(points: ClassificationPoint[], seed: number, depth: number): ForestNode {
  const positives = points.reduce((sum, point) => sum + point.label, 0);
  const majority = positives * 2 >= points.length ? 1 : 0;
  if (depth === 0 || positives === 0 || positives === points.length || points.length < 3) {
    return { prediction: majority, feature: null, threshold: 0, left: null, right: null };
  }

  const feature = ((seed + depth) % 2) as 0 | 1;
  const sortedValues = [...new Set(points.map((point) => feature === 0 ? point.x : point.y))].sort((a, b) => a - b);
  let best: { threshold: number; score: number; left: ClassificationPoint[]; right: ClassificationPoint[] } | null = null;
  for (let index = 0; index < sortedValues.length - 1; index += 1) {
    const threshold = (sortedValues[index] + sortedValues[index + 1]) / 2;
    const left = points.filter((point) => (feature === 0 ? point.x : point.y) <= threshold);
    const right = points.filter((point) => (feature === 0 ? point.x : point.y) > threshold);
    if (left.length === 0 || right.length === 0) continue;
    const gini = (subset: ClassificationPoint[]) => {
      const probability = subset.reduce((sum, point) => sum + point.label, 0) / subset.length;
      return 2 * probability * (1 - probability);
    };
    const score = (left.length * gini(left) + right.length * gini(right)) / points.length;
    if (!best || score < best.score) best = { threshold, score, left, right };
  }

  if (!best) return { prediction: majority, feature: null, threshold: 0, left: null, right: null };
  return {
    prediction: majority,
    feature,
    threshold: best.threshold,
    left: trainForestTree(best.left, seed, depth - 1),
    right: trainForestTree(best.right, seed, depth - 1),
  };
}

function forestPredict(tree: ForestNode, x: number, y: number): 0 | 1 {
  if (tree.feature === null || !tree.left || !tree.right) return tree.prediction;
  return forestPredict((tree.feature === 0 ? x : y) <= tree.threshold ? tree.left : tree.right, x, y);
}

function trainSvm(points: ClassificationPoint[], regularization: number) {
  let weightX = 0;
  let weightY = 0;
  let bias = 0;
  const learningRate = 0.04;
  for (let step = 0; step < 600; step += 1) {
    let gradientX = regularization * weightX;
    let gradientY = regularization * weightY;
    let gradientBias = 0;
    for (const point of points) {
      const target = point.label === 1 ? 1 : -1;
      const margin = target * (weightX * (point.x - 5) / 4 + weightY * (point.y - 5) / 4 + bias);
      if (margin < 1) {
        gradientX -= target * (point.x - 5) / (4 * points.length);
        gradientY -= target * (point.y - 5) / (4 * points.length);
        gradientBias -= target / points.length;
      }
    }
    weightX -= learningRate * gradientX;
    weightY -= learningRate * gradientY;
    bias -= learningRate * gradientBias;
  }
  return (x: number, y: number): 0 | 1 => weightX * (x - 5) / 4 + weightY * (y - 5) / 4 + bias >= 0 ? 1 : 0;
}

function trainNeuralNetwork(points: ClassificationPoint[], hiddenUnits: number, epochs: number) {
  const inputWeights = Array.from({ length: hiddenUnits }, (_, unit) => [
    Math.sin(unit * 2.17 + 0.5) * 0.8,
    Math.cos(unit * 1.43 + 0.8) * 0.8,
  ]);
  const hiddenBiases = Array.from({ length: hiddenUnits }, (_, unit) => Math.sin(unit + 1) * 0.2);
  const outputWeights = Array.from({ length: hiddenUnits }, (_, unit) => Math.cos(unit * 1.71 + 0.4) * 0.5);
  let outputBias = 0;
  const learningRate = 0.45;

  for (let epoch = 0; epoch < epochs; epoch += 1) {
    const weightGradients = inputWeights.map(() => [0, 0]);
    const hiddenBiasGradients = Array.from({ length: hiddenUnits }, () => 0);
    const outputWeightGradients = Array.from({ length: hiddenUnits }, () => 0);
    let outputBiasGradient = 0;
    for (const point of points) {
      const inputX = (point.x - 5) / 4;
      const inputY = (point.y - 5) / 4;
      const hidden = inputWeights.map((weights, unit) => Math.tanh(
        weights[0] * inputX + weights[1] * inputY + hiddenBiases[unit],
      ));
      const output = sigmoid(hidden.reduce((sum, value, unit) => sum + value * outputWeights[unit], outputBias));
      const outputError = output - point.label;
      hidden.forEach((value, unit) => {
        outputWeightGradients[unit] += outputError * value;
        const hiddenError = outputError * outputWeights[unit] * (1 - value * value);
        weightGradients[unit][0] += hiddenError * inputX;
        weightGradients[unit][1] += hiddenError * inputY;
        hiddenBiasGradients[unit] += hiddenError;
      });
      outputBiasGradient += outputError;
    }
    const scale = learningRate / points.length;
    inputWeights.forEach((weights, unit) => {
      weights[0] -= scale * weightGradients[unit][0];
      weights[1] -= scale * weightGradients[unit][1];
      hiddenBiases[unit] -= scale * hiddenBiasGradients[unit];
      outputWeights[unit] -= scale * outputWeightGradients[unit];
    });
    outputBias -= scale * outputBiasGradient;
  }

  return (x: number, y: number): 0 | 1 => {
    const inputX = (x - 5) / 4;
    const inputY = (y - 5) / 4;
    const hidden = inputWeights.map((weights, unit) => Math.tanh(
      weights[0] * inputX + weights[1] * inputY + hiddenBiases[unit],
    ));
    const output = sigmoid(hidden.reduce((sum, value, unit) => sum + value * outputWeights[unit], outputBias));
    return output >= 0.5 ? 1 : 0;
  };
}

export function buildClassifier(points: ClassificationPoint[], model: ClassificationModel) {
  switch (model.kind) {
    case 'knn':
      return (x: number, y: number) => predictKnn(points, x, y, model.neighbors);
    case 'naive-bayes':
      return (x: number, y: number) => predictNaiveBayes(points, x, y, model.smoothing);
    case 'random-forest': {
      const trees = Array.from({ length: model.trees }, (_, seed) => {
        const bootstrap = Array.from({ length: points.length }, (_unused, index) =>
          points[(index * (seed + 3) + seed * 7 + index * index) % points.length],
        );
        return trainForestTree(bootstrap, seed, 3);
      });
      return (x: number, y: number): 0 | 1 =>
        trees.reduce((votes, tree) => votes + forestPredict(tree, x, y), 0) * 2 >= trees.length ? 1 : 0;
    }
    case 'svm':
      return trainSvm(points, model.regularization);
    case 'neural-network':
      return trainNeuralNetwork(points, model.hiddenUnits, model.epochs);
  }
}

export function predictClassification(points: ClassificationPoint[], model: ClassificationModel, x: number, y: number): 0 | 1 {
  return buildClassifier(points, model)(x, y);
}

export type PCAResult = {
  meanX: number;
  meanY: number;
  standardDeviationX: number;
  standardDeviationY: number;
  component1: [number, number];
  component2: [number, number];
  variance1: number;
  variance2: number;
  scores: Array<{ x: number; y: number; label: 0 | 1; pc1: number; pc2: number }>;
};

export function computePCA(points: ClassificationPoint[]): PCAResult {
  const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const meanY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  const standardDeviationX = Math.sqrt(points.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0) / points.length) || 1;
  const standardDeviationY = Math.sqrt(points.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0) / points.length) || 1;
  const xx = points.reduce((sum, point) => sum + ((point.x - meanX) / standardDeviationX) ** 2, 0) / points.length;
  const yy = points.reduce((sum, point) => sum + ((point.y - meanY) / standardDeviationY) ** 2, 0) / points.length;
  const xy = points.reduce((sum, point) => sum + ((point.x - meanX) / standardDeviationX) * ((point.y - meanY) / standardDeviationY), 0) / points.length;
  const angle = 0.5 * Math.atan2(2 * xy, xx - yy);
  const component1: [number, number] = [Math.cos(angle), Math.sin(angle)];
  const component2: [number, number] = [-Math.sin(angle), Math.cos(angle)];
  const variance1 = component1[0] ** 2 * xx + 2 * component1[0] * component1[1] * xy + component1[1] ** 2 * yy;
  const variance2 = Math.max(0, xx + yy - variance1);
  const scores = points.map((point) => {
    const x = (point.x - meanX) / standardDeviationX;
    const y = (point.y - meanY) / standardDeviationY;
    return {
      ...point,
      pc1: x * component1[0] + y * component1[1],
      pc2: x * component2[0] + y * component2[1],
    };
  });
  return { meanX, meanY, standardDeviationX, standardDeviationY, component1, component2, variance1, variance2, scores };
}

export function projectOntoPC1(result: PCAResult, x: number, y: number) {
  const standardizedX = (x - result.meanX) / result.standardDeviationX;
  const standardizedY = (y - result.meanY) / result.standardDeviationY;
  return standardizedX * result.component1[0] + standardizedY * result.component1[1];
}
