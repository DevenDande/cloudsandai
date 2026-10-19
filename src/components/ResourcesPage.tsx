const resources = [
  {
    title: 'Simple Linear Regression',
    badge: 'SL',
    description:
      'Explore how a model learns from data. Adjust the weight and bias, run predictions with your own input, visualize errors, and experiment with gradient descent.',
    href: '/resources/simple-linear-regression',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Multiple Linear Regression',
    badge: 'ML',
    description:
      'Explore how four input features work together to predict a target. Adjust model coefficients, train with gradient descent, and run inference with your own feature values.',
    href: '/resources/multiple-linear-regression',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Binary Classification with Logistic Regression',
    badge: 'LC',
    description:
      'Learn how a model turns input features into class probabilities. Adjust the decision threshold, train logistic regression, and explore the decision boundary and confusion matrix.',
    href: '/resources/logistic-classification',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Decision Tree Classification',
    badge: 'DT',
    description:
      'Explore how a tree makes interpretable, rule-based predictions. Adjust tree depth and leaf size, compare Gini impurity with entropy, and visualize nonlinear decision regions.',
    href: '/resources/decision-tree-classification',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'K-Means Clustering',
    badge: 'KM',
    description:
      'Explore unsupervised learning by grouping observations. Adjust the number of clusters and iterations to see centroids move and points get assigned.',
    href: '/resources/k-means-clustering',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'K-Nearest Neighbors',
    badge: 'KNN',
    description:
      'Classify new observations by their closest neighbors. Adjust k, inspect decision regions, and run inference with custom feature values.',
    href: '/resources/knn-classification',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Gaussian Naive Bayes',
    badge: 'NB',
    description:
      'Explore probabilistic classification using feature distributions. Adjust variance smoothing and compare predictions across the feature space.',
    href: '/resources/naive-bayes',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Random Forest Classification',
    badge: 'RF',
    description:
      'See how an ensemble of randomized decision trees combines votes. Change the number of trees and compare its decision regions and accuracy.',
    href: '/resources/random-forest',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Support Vector Machine',
    badge: 'SVM',
    description:
      'Explore a maximum-margin linear classifier. Adjust regularization, inspect the decision boundary, and predict outcomes from your own inputs.',
    href: '/resources/support-vector-machine',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Principal Component Analysis',
    badge: 'PCA',
    description:
      'Explore dimensionality reduction by projecting standardized data onto principal components and comparing the variance each component explains.',
    href: '/resources/pca',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Neural Network Classification',
    badge: 'NN',
    description:
      'Train a small neural network in your browser. Adjust hidden-layer size and training epochs, then inspect its learned decision regions.',
    href: '/resources/neural-network',
    cta: 'Explore Interactive Lab',
  },
];

const learningAreas = [
  {
    title: 'AI & Machine Learning',
    description: 'Free interactive labs for regression and classification.',
    label: 'Free resources',
    href: '/resources/',
  },
  {
    title: 'Python & Deep Learning',
    description: 'Explore the foundations curriculum, including Python, scientific computing and introductory deep learning.',
    label: 'Paid program curriculum',
    href: '/courses/#course-1',
  },
  {
    title: 'Generative AI & AI Engineering',
    description: 'Explore curriculum topics including LLMs, APIs, retrieval-augmented generation and AI application projects.',
    label: 'Paid program curriculum',
    href: '/courses/#course-2',
  },
  {
    title: 'AWS & Cloud Engineering',
    description: 'See how AWS deployment fits into the AI Engineering learning path.',
    label: 'Paid program curriculum',
    href: '/courses/#course-2',
  },
];

export function ResourcesPage() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Free learning resources</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Learn by exploring and building
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Work through interactive machine learning labs and practical examples, with more learning materials added as they are ready.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-[0_12px_35px_rgba(13,15,18,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_18px_40px_rgba(13,15,18,0.08)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
                <span className="text-lg font-semibold">
                  {resource.badge}
                </span>
              </div>

              <p className="mono-label">Free interactive resource</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-900">{resource.title}</h2>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink-500">{resource.description}</p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
                {resource.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-20">
          <div className="max-w-2xl">
            <p className="mono-label">Learning areas</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Learning pathways
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-500">
              Start with free browser-based machine learning experiments, or explore related topics covered in the optional structured program curricula.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {learningAreas.map((area) => (
              <a
                key={area.title}
                href={area.href}
                className="group rounded-2xl border border-ink-100 p-6 transition-colors hover:border-ink-300"
              >
                <p className="mono-label">{area.label}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{area.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
                  Explore
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
