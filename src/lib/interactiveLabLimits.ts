export const MAX_LAB_OBSERVATIONS = 100;
export const MAX_LAB_INPUT_MAGNITUDE = 100_000;
export const MAX_LAB_PARAMETER_MAGNITUDE = 100_000;
export const MAX_LAB_TRAINING_ITERATIONS = 1_000;
export const MAX_REGRESSION_TRAINING_ITERATIONS = 100;
export const MAX_CLASSIFICATION_OBSERVATIONS = 1_000;
export const MAX_DECISION_TREE_OBSERVATIONS = 200;
export const MAX_CLASSIFICATION_INPUT_MAGNITUDE = 1_000_000_000;
export const MAX_CLASSIFICATION_PARAMETER_MAGNITUDE = 1_000_000_000;

export function parseBoundedLabNumber(
  value: string | number | null | undefined,
  maxMagnitude = MAX_LAB_INPUT_MAGNITUDE,
): number | null {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return null;
  }

  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) && Math.abs(numeric) <= maxMagnitude
    ? numeric
    : null;
}
