export type DatasetRow = {
  id: number;
  studyHours: string;
  practiceTests: string;
  label: '0' | '1';
};

export type Observation = {
  id: number;
  studyHours: number;
  practiceTests: number;
  label: number;
};

export type ModelParameters = {
  weights: [number, number];
  bias: number;
};

export const defaultDatasetRows: DatasetRow[] = [
  { id: 1, studyHours: '1', practiceTests: '1', label: '0' },
  { id: 2, studyHours: '1.5', practiceTests: '2', label: '0' },
  { id: 3, studyHours: '2', practiceTests: '1', label: '0' },
  { id: 4, studyHours: '2.5', practiceTests: '3', label: '0' },
  { id: 5, studyHours: '3', practiceTests: '2', label: '0' },
  { id: 6, studyHours: '3.5', practiceTests: '4', label: '0' },
  { id: 7, studyHours: '4', practiceTests: '3', label: '0' },
  { id: 8, studyHours: '4', practiceTests: '5', label: '1' },
  { id: 9, studyHours: '5', practiceTests: '4', label: '1' },
  { id: 10, studyHours: '5.5', practiceTests: '6', label: '1' },
  { id: 11, studyHours: '6', practiceTests: '5', label: '1' },
  { id: 12, studyHours: '6.5', practiceTests: '7', label: '1' },
  { id: 13, studyHours: '7', practiceTests: '6', label: '1' },
  { id: 14, studyHours: '8', practiceTests: '7', label: '1' },
];

export const defaultTrainingConfig = {
  learningRate: 0.2,
  iterations: 100,
  weights: [0, 0] as [number, number],
  bias: 0,
};

export function getValidObservations(rows: DatasetRow[]): Observation[] {
  return rows.flatMap((row) => {
    const studyHours = Number(row.studyHours);
    const practiceTests = Number(row.practiceTests);

    if (
      row.studyHours.trim() === '' ||
      row.practiceTests.trim() === '' ||
      !Number.isFinite(studyHours) ||
      !Number.isFinite(practiceTests)
    ) {
      return [];
    }

    return [{ id: row.id, studyHours, practiceTests, label: Number(row.label) }];
  });
}

export function getFeatureStats(rows: Observation[]) {
  const values = [
    rows.map((row) => row.studyHours),
    rows.map((row) => row.practiceTests),
  ];

  return values.map((featureValues) => {
    const mean = featureValues.reduce((sum, value) => sum + value, 0) / Math.max(featureValues.length, 1);
    const variance = featureValues.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(featureValues.length, 1);
    return { mean, standardDeviation: Math.sqrt(variance) || 1 };
  }) as [{ mean: number; standardDeviation: number }, { mean: number; standardDeviation: number }];
}

function transformedFeatures(row: Observation, stats: ReturnType<typeof getFeatureStats>) {
  return [
    (row.studyHours - stats[0].mean) / stats[0].standardDeviation,
    (row.practiceTests - stats[1].mean) / stats[1].standardDeviation,
  ] as const;
}

function sigmoid(value: number) {
  if (value >= 0) {
    return 1 / (1 + Math.exp(-value));
  }

  const exponential = Math.exp(value);
  return exponential / (1 + exponential);
}

export function predictProbability(
  row: Observation,
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
) {
  const features = transformedFeatures(row, stats);
  return sigmoid(model.bias + features[0] * model.weights[0] + features[1] * model.weights[1]);
}

export function computeLogLoss(
  rows: Observation[],
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
) {
  if (rows.length === 0) {
    return 0;
  }

  const epsilon = 1e-15;
  return rows.reduce((sum, row) => {
    const probability = Math.min(Math.max(predictProbability(row, model, stats), epsilon), 1 - epsilon);
    return sum - row.label * Math.log(probability) - (1 - row.label) * Math.log(1 - probability);
  }, 0) / rows.length;
}

export function computeGradientDescentStep(
  rows: Observation[],
  model: ModelParameters,
  learningRate: number,
  stats: ReturnType<typeof getFeatureStats>,
) {
  if (rows.length < 2 || new Set(rows.map((row) => row.label)).size < 2) {
    return {
      ...model,
      loss: computeLogLoss(rows, model, stats),
      valid: false,
      message: 'Add at least two complete observations, including both classes, to train.',
    };
  }

  let weightGradient0 = 0;
  let weightGradient1 = 0;
  let biasGradient = 0;

  rows.forEach((row) => {
    const features = transformedFeatures(row, stats);
    const error = predictProbability(row, model, stats) - row.label;
    weightGradient0 += error * features[0];
    weightGradient1 += error * features[1];
    biasGradient += error;
  });

  const nextModel: ModelParameters = {
    weights: [
      model.weights[0] - learningRate * weightGradient0 / rows.length,
      model.weights[1] - learningRate * weightGradient1 / rows.length,
    ],
    bias: model.bias - learningRate * biasGradient / rows.length,
  };
  const loss = computeLogLoss(rows, nextModel, stats);
  const valid = [...nextModel.weights, nextModel.bias, loss].every(Number.isFinite);

  return {
    ...nextModel,
    loss,
    valid,
    message: valid ? 'Gradient descent step completed.' : 'Training produced non-finite values and stopped safely.',
  };
}

export function evaluateClassification(
  rows: Observation[],
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
  threshold: number,
) {
  const counts = { truePositive: 0, trueNegative: 0, falsePositive: 0, falseNegative: 0 };

  rows.forEach((row) => {
    const predictedLabel = Number(predictProbability(row, model, stats) >= threshold);
    if (predictedLabel === 1 && row.label === 1) counts.truePositive += 1;
    else if (predictedLabel === 0 && row.label === 0) counts.trueNegative += 1;
    else if (predictedLabel === 1) counts.falsePositive += 1;
    else counts.falseNegative += 1;
  });

  const total = rows.length;
  const safeRatio = (numerator: number, denominator: number) => denominator === 0 ? null : numerator / denominator;
  return {
    ...counts,
    accuracy: safeRatio(counts.truePositive + counts.trueNegative, total),
    precision: safeRatio(counts.truePositive, counts.truePositive + counts.falsePositive),
    recall: safeRatio(counts.truePositive, counts.truePositive + counts.falseNegative),
  };
}
