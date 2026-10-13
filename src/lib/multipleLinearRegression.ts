import { parseBoundedLabNumber } from './interactiveLabLimits';

export const regressionFeatures = [
  { key: 'area', label: 'Area (100 sq ft)' },
  { key: 'bedrooms', label: 'Bedrooms' },
  { key: 'age', label: 'Age (years)' },
  { key: 'commute', label: 'Commute (minutes)' },
] as const;

export type FeatureKey = (typeof regressionFeatures)[number]['key'];

export type DatasetRow = {
  id: number;
  values: Record<FeatureKey, string>;
  target: string;
};

export type Observation = {
  id: number;
  features: number[];
  target: number;
};

export type ModelParameters = {
  weights: number[];
  bias: number;
};

export const defaultDatasetRows: DatasetRow[] = [
  { id: 1, values: { area: '8', bedrooms: '2', age: '12', commute: '18' }, target: '43' },
  { id: 2, values: { area: '10', bedrooms: '3', age: '8', commute: '12' }, target: '55' },
  { id: 3, values: { area: '7', bedrooms: '2', age: '24', commute: '30' }, target: '37' },
  { id: 4, values: { area: '12', bedrooms: '3', age: '5', commute: '16' }, target: '65' },
  { id: 5, values: { area: '14', bedrooms: '4', age: '10', commute: '9' }, target: '74' },
  { id: 6, values: { area: '9', bedrooms: '2', age: '18', commute: '25' }, target: '45' },
  { id: 7, values: { area: '16', bedrooms: '4', age: '4', commute: '11' }, target: '86' },
  { id: 8, values: { area: '11', bedrooms: '3', age: '16', commute: '22' }, target: '57' },
  { id: 9, values: { area: '18', bedrooms: '5', age: '7', commute: '8' }, target: '96' },
  { id: 10, values: { area: '13', bedrooms: '3', age: '22', commute: '35' }, target: '59' },
];

export const defaultTrainingConfig = {
  learningRate: 0.03,
  iterations: 100,
  weights: [0, 0, 0, 0],
  bias: 0,
};

export function parseNumericInput(value: string | number | null | undefined): number | null {
  return parseBoundedLabNumber(value);
}

export function getValidObservations(rows: DatasetRow[]): Observation[] {
  return rows.flatMap((row) => {
    const features = regressionFeatures.map(({ key }) => parseNumericInput(row.values[key]));
    const target = parseNumericInput(row.target);

    if (target === null || features.some((value) => value === null)) {
      return [];
    }

    return [{ id: row.id, features: features as number[], target }];
  });
}

export function getFeatureStats(rows: Observation[]) {
  return regressionFeatures.map((_, index) => {
    const values = rows.map((row) => row.features[index]);
    const mean = values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
    const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(values.length, 1);
    const standardDeviation = Math.sqrt(variance);

    return { mean, standardDeviation: standardDeviation || 1 };
  });
}

export function transformFeatures(features: number[], stats: ReturnType<typeof getFeatureStats>, standardize: boolean) {
  return standardize ? features.map((value, index) => (value - stats[index].mean) / stats[index].standardDeviation) : features;
}

export function predict(
  features: number[],
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
  standardize: boolean,
) {
  const transformed = transformFeatures(features, stats, standardize);
  return model.bias + transformed.reduce((sum, value, index) => sum + value * model.weights[index], 0);
}

export function computeMSE(
  rows: Observation[],
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
  standardize: boolean,
) {
  if (rows.length === 0) {
    return 0;
  }

  return rows.reduce((sum, row) => sum + (predict(row.features, model, stats, standardize) - row.target) ** 2, 0) / rows.length;
}

export function computeR2(
  rows: Observation[],
  model: ModelParameters,
  stats: ReturnType<typeof getFeatureStats>,
  standardize: boolean,
) {
  if (rows.length === 0) {
    return 0;
  }

  const meanTarget = rows.reduce((sum, row) => sum + row.target, 0) / rows.length;
  const totalVariation = rows.reduce((sum, row) => sum + (row.target - meanTarget) ** 2, 0);
  const residualVariation = rows.reduce((sum, row) => sum + (predict(row.features, model, stats, standardize) - row.target) ** 2, 0);

  return totalVariation === 0 ? (residualVariation === 0 ? 1 : 0) : 1 - residualVariation / totalVariation;
}

export function computeGradientDescentStep(
  rows: Observation[],
  model: ModelParameters,
  learningRate: number,
  stats: ReturnType<typeof getFeatureStats>,
  standardize: boolean,
) {
  if (rows.length < 2) {
    return { ...model, loss: computeMSE(rows, model, stats, standardize), valid: false, message: 'Enter at least two complete observations to train.' };
  }

  const gradients = Array.from({ length: model.weights.length }, () => 0);
  let biasGradient = 0;

  rows.forEach((row) => {
    const transformed = transformFeatures(row.features, stats, standardize);
    const error = model.bias + transformed.reduce((sum, value, index) => sum + value * model.weights[index], 0) - row.target;
    biasGradient += error;
    transformed.forEach((value, index) => {
      gradients[index] += value * error;
    });
  });

  const nextModel = {
    weights: model.weights.map((weight, index) => weight - learningRate * (2 / rows.length) * gradients[index]),
    bias: model.bias - learningRate * (2 / rows.length) * biasGradient,
  };
  const loss = computeMSE(rows, nextModel, stats, standardize);
  const valid = [...nextModel.weights, nextModel.bias, loss].every(Number.isFinite);

  return {
    ...nextModel,
    loss,
    valid,
    message: valid ? 'Gradient descent step completed.' : 'Training produced non-finite values and stopped safely.',
  };
}

export function formatMetric(value: number, digits = 3) {
  return Number.isFinite(value) ? Number(value).toFixed(digits) : '—';
}