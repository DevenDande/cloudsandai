export const MAX_LAB_OBSERVATIONS = 100;
export const MAX_LAB_INPUT_MAGNITUDE = 100_000;
export const MAX_LAB_PARAMETER_MAGNITUDE = 100_000;
export const MAX_LAB_TRAINING_ITERATIONS = 1_000;

export function parseBoundedLabNumber(value: string | number | null | undefined): number | null {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return null;
  }

  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) && Math.abs(numeric) <= MAX_LAB_INPUT_MAGNITUDE
    ? numeric
    : null;
}
