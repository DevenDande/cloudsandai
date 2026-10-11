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
  label: 0 | 1;
};

export type Criterion = 'gini' | 'entropy';
export type FeatureKey = 'studyHours' | 'practiceTests';

export type TreeNode = {
  prediction: 0 | 1;
  samples: number;
  impurity: number;
  feature: FeatureKey | null;
  threshold: number | null;
  gain: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

export const featureLabels: Record<FeatureKey, string> = {
  studyHours: 'Study hours',
  practiceTests: 'Practice tests',
};

export const defaultDatasetRows: DatasetRow[] = [
  { id: 1, studyHours: '1', practiceTests: '1', label: '0' },
  { id: 2, studyHours: '1', practiceTests: '2', label: '0' },
  { id: 3, studyHours: '2', practiceTests: '1', label: '0' },
  { id: 4, studyHours: '2', practiceTests: '2', label: '0' },
  { id: 5, studyHours: '1', practiceTests: '5', label: '0' },
  { id: 6, studyHours: '1', practiceTests: '6', label: '0' },
  { id: 7, studyHours: '2', practiceTests: '5', label: '0' },
  { id: 8, studyHours: '2', practiceTests: '6', label: '0' },
  { id: 9, studyHours: '5', practiceTests: '1', label: '0' },
  { id: 10, studyHours: '5', practiceTests: '2', label: '0' },
  { id: 11, studyHours: '6', practiceTests: '1', label: '0' },
  { id: 12, studyHours: '6', practiceTests: '2', label: '0' },
  { id: 13, studyHours: '5', practiceTests: '5', label: '1' },
  { id: 14, studyHours: '5', practiceTests: '6', label: '1' },
  { id: 15, studyHours: '6', practiceTests: '5', label: '1' },
  { id: 16, studyHours: '6', practiceTests: '6', label: '1' },
];

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

    return [{ id: row.id, studyHours, practiceTests, label: Number(row.label) as 0 | 1 }];
  });
}

function impurity(rows: Observation[], criterion: Criterion) {
  if (rows.length === 0) return 0;
  const positives = rows.reduce((count, row) => count + row.label, 0);
  const probability = positives / rows.length;
  if (criterion === 'gini') return 2 * probability * (1 - probability);
  const binaryEntropy = (value: number) => value === 0 || value === 1 ? 0 : -value * Math.log2(value);
  return binaryEntropy(probability) + binaryEntropy(1 - probability);
}

function majorityClass(rows: Observation[]): 0 | 1 {
  return rows.reduce((count, row) => count + row.label, 0) * 2 >= rows.length ? 1 : 0;
}

export function buildDecisionTree(
  rows: Observation[],
  criterion: Criterion,
  maxDepth: number,
  minSamplesLeaf: number,
): TreeNode {
  const build = (subset: Observation[], depth: number): TreeNode => {
    const node: TreeNode = {
      prediction: majorityClass(subset),
      samples: subset.length,
      impurity: impurity(subset, criterion),
      feature: null,
      threshold: null,
      gain: 0,
      left: null,
      right: null,
    };

    if (subset.length === 0 || depth >= maxDepth || node.impurity === 0 || subset.length < 2 * minSamplesLeaf) {
      return node;
    }

    let bestSplit: {
      feature: FeatureKey;
      threshold: number;
      gain: number;
      leftRows: Observation[];
      rightRows: Observation[];
    } | null = null;

    for (const feature of ['studyHours', 'practiceTests'] as const) {
      const values = [...new Set(subset.map((row) => row[feature]))].sort((a, b) => a - b);
      for (let index = 0; index < values.length - 1; index += 1) {
        const threshold = (values[index] + values[index + 1]) / 2;
        const leftRows = subset.filter((row) => row[feature] <= threshold);
        const rightRows = subset.filter((row) => row[feature] > threshold);
        if (leftRows.length < minSamplesLeaf || rightRows.length < minSamplesLeaf) continue;
        const childImpurity = (
          leftRows.length * impurity(leftRows, criterion) +
          rightRows.length * impurity(rightRows, criterion)
        ) / subset.length;
        const gain = node.impurity - childImpurity;

        if (gain > (bestSplit?.gain ?? 1e-12)) {
          bestSplit = { feature, threshold, gain, leftRows, rightRows };
        }
      }
    }

    if (!bestSplit) return node;
    node.feature = bestSplit.feature;
    node.threshold = bestSplit.threshold;
    node.gain = bestSplit.gain;
    node.left = build(bestSplit.leftRows, depth + 1);
    node.right = build(bestSplit.rightRows, depth + 1);
    return node;
  };

  return build(rows, 0);
}

export function predictClass(node: TreeNode, studyHours: number, practiceTests: number): 0 | 1 {
  if (node.feature === null || node.threshold === null || !node.left || !node.right) return node.prediction;
  const value = node.feature === 'studyHours' ? studyHours : practiceTests;
  return value <= node.threshold
    ? predictClass(node.left, studyHours, practiceTests)
    : predictClass(node.right, studyHours, practiceTests);
}

export function flattenTreeRules(node: TreeNode) {
  const rules: string[] = [];
  const visit = (current: TreeNode, conditions: string[]) => {
    if (current.feature === null || current.threshold === null || !current.left || !current.right) {
      const path = conditions.length > 0 ? conditions.join(' AND ') : 'All observations';
      rules.push(`IF ${path} THEN predict ${current.prediction === 1 ? 'pass (class 1)' : 'fail (class 0)'} · ${current.samples} sample${current.samples === 1 ? '' : 's'}`);
      return;
    }

    const label = featureLabels[current.feature];
    visit(current.left, [...conditions, `${label} ≤ ${current.threshold.toFixed(2)}`]);
    visit(current.right, [...conditions, `${label} > ${current.threshold.toFixed(2)}`]);
  };

  visit(node, []);
  return rules;
}

export function evaluateTree(rows: Observation[], tree: TreeNode) {
  const counts = { truePositive: 0, trueNegative: 0, falsePositive: 0, falseNegative: 0 };
  rows.forEach((row) => {
    const prediction = predictClass(tree, row.studyHours, row.practiceTests);
    if (prediction === 1 && row.label === 1) counts.truePositive += 1;
    else if (prediction === 0 && row.label === 0) counts.trueNegative += 1;
    else if (prediction === 1) counts.falsePositive += 1;
    else counts.falseNegative += 1;
  });

  const ratio = (numerator: number, denominator: number) => denominator === 0 ? null : numerator / denominator;
  return {
    ...counts,
    accuracy: ratio(counts.truePositive + counts.trueNegative, rows.length),
    precision: ratio(counts.truePositive, counts.truePositive + counts.falsePositive),
    recall: ratio(counts.truePositive, counts.truePositive + counts.falseNegative),
  };
}
