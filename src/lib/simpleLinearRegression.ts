import { parseBoundedLabNumber } from './interactiveLabLimits';

export type Observation = {
  x: number;
  y: number;
};

export type DatasetRow = {
  id: number;
  x: string;
  y: string;
};

export type LossPoint = {
  iteration: number;
  loss: number;
};

export const defaultDatasetRows: DatasetRow[] = [
  { id: 1, x: '1', y: '2' },
  { id: 2, x: '2', y: '4' },
  { id: 3, x: '3', y: '5' },
  { id: 4, x: '4', y: '8' },
];

export const defaultTrainingConfig = {
  initialW: 0.8,
  initialB: 0.5,
  learningRate: 0.06,
  iterations: 30,
};

export function parseNumericInput(value: string | number | null | undefined): number | null {
  return parseBoundedLabNumber(value);
}

export function getValidObservations(rows: DatasetRow[]): Observation[] {
  return rows.flatMap((row) => {
    const x = parseNumericInput(row.x);
    const y = parseNumericInput(row.y);

    if (x === null || y === null) {
      return [];
    }

    return [{ x, y }];
  });
}

export function predict(w: number, b: number, x: number): number {
  return w * x + b;
}

export function computeResiduals(rows: Observation[], w: number, b: number) {
  return rows.map((row) => {
    const prediction = predict(w, b, row.x);
    const residual = prediction - row.y;

    return {
      ...row,
      prediction,
      residual,
      squaredResidual: residual * residual,
    };
  });
}

export function computeMSE(rows: Observation[], w: number, b: number): number {
  if (rows.length === 0) {
    return 0;
  }

  const residuals = computeResiduals(rows, w, b);
  const totalSquaredResidual = residuals.reduce((sum, item) => sum + item.squaredResidual, 0);
  return totalSquaredResidual / rows.length;
}

export function computeGradients(rows: Observation[], w: number, b: number) {
  if (rows.length === 0) {
    return { gradientW: 0, gradientB: 0 };
  }

  const n = rows.length;
  const gradientW = (2 / n) * rows.reduce((sum, row) => {
    const error = predict(w, b, row.x) - row.y;
    return sum + row.x * error;
  }, 0);

  const gradientB = (2 / n) * rows.reduce((sum, row) => {
    const error = predict(w, b, row.x) - row.y;
    return sum + error;
  }, 0);

  return { gradientW, gradientB };
}

export function computeGradientDescentStep(
  rows: Observation[],
  currentW: number,
  currentB: number,
  learningRate: number,
) {
  if (rows.length === 0) {
    return {
      w: currentW,
      b: currentB,
      gradientW: 0,
      gradientB: 0,
      loss: 0,
      valid: false,
      message: 'At least two valid observations are required for training.',
    };
  }

  const { gradientW, gradientB } = computeGradients(rows, currentW, currentB);
  const nextW = currentW - learningRate * gradientW;
  const nextB = currentB - learningRate * gradientB;
  const loss = computeMSE(rows, nextW, nextB);
  const hasFiniteValues = [nextW, nextB, loss, gradientW, gradientB].every(Number.isFinite);

  return {
    w: nextW,
    b: nextB,
    gradientW,
    gradientB,
    loss,
    valid: hasFiniteValues,
    message: hasFiniteValues ? 'Gradient descent step completed.' : 'Training produced non-finite values and stopped safely.',
  };
}

export function computeClosedFormSolution(rows: Observation[]) {
  if (rows.length < 2) {
    return {
      valid: false,
      message: 'At least two valid observations are required to compute a least-squares line.',
      w: 0,
      b: 0,
      mse: 0,
    };
  }

  const meanX = rows.reduce((sum, row) => sum + row.x, 0) / rows.length;
  const meanY = rows.reduce((sum, row) => sum + row.y, 0) / rows.length;
  const denominator = rows.reduce((sum, row) => sum + (row.x - meanX) ** 2, 0);

  if (!Number.isFinite(denominator) || Math.abs(denominator) < 1e-12) {
    return {
      valid: false,
      message: 'All feature values are identical, so the closed-form slope is undefined.',
      w: 0,
      b: 0,
      mse: computeMSE(rows, 0, meanY),
    };
  }

  const w = rows.reduce((sum, row) => sum + (row.x - meanX) * (row.y - meanY), 0) / denominator;
  const b = meanY - w * meanX;
  const mse = computeMSE(rows, w, b);

  return {
    valid: true,
    message: 'Closed-form least squares solution computed.',
    w,
    b,
    mse,
  };
}

export function formatMetric(value: number, digits = 3): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return Number(value).toFixed(digits);
}

export function getRangeForChart(rows: Observation[]) {
  if (rows.length === 0) {
    return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
  }

  const xs = rows.map((row) => row.x);
  const ys = rows.map((row) => row.y);

  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 0);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, 0);

  const xPad = Math.max((maxX - minX) * 0.25, 0.5);
  const yPad = Math.max((maxY - minY) * 0.25, 0.5);

  return {
    minX: minX - xPad,
    maxX: maxX + xPad,
    minY: minY - yPad,
    maxY: maxY + yPad,
  };
}
