import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Braces,
  CircleDot,
  Compass,
  Database,
  Network,
  Sigma,
} from 'lucide-react';

const labGroups = [
  {
    title: 'Model Training and Optimization',
    description: 'Fit linear models, tune their parameters, and explore how training changes predictions.',
    labs: [
      {
        name: 'Simple Linear Regression',
        topic: 'Regression',
        description: 'Adjust a line’s weight and bias, inspect prediction errors, and step through gradient descent.',
        href: '/resources/simple-linear-regression',
        icon: BarChart3,
      },
      {
        name: 'Multiple Linear Regression',
        topic: 'Regression',
        description: 'Train a model with four input features and see how coefficients work together to predict a target.',
        href: '/resources/multiple-linear-regression',
        icon: Sigma,
      },
    ],
  },
  {
    title: 'Classification Algorithms',
    description: 'Compare how different classifiers use data to draw decision regions and predict labels.',
    labs: [
      {
        name: 'Binary Classification with Logistic Regression',
        topic: 'Classification',
        description: 'Train a probability-based classifier, adjust its decision threshold, and inspect its boundary.',
        href: '/resources/logistic-classification',
        icon: CircleDot,
      },
      {
        name: 'Decision Tree Classification',
        topic: 'Classification',
        description: 'Change tree depth and split criteria to explore interpretable rules and nonlinear regions.',
        href: '/resources/decision-tree-classification',
        icon: Network,
      },
      {
        name: 'K-Nearest Neighbors',
        topic: 'Classification',
        description: 'Adjust the number of neighbors and see how nearby examples shape classification regions.',
        href: '/resources/knn-classification',
        icon: CircleDot,
      },
      {
        name: 'Gaussian Naive Bayes',
        topic: 'Classification',
        description: 'Explore how feature distributions and class probabilities inform predictions.',
        href: '/resources/naive-bayes',
        icon: BarChart3,
      },
      {
        name: 'Random Forest Classification',
        topic: 'Classification',
        description: 'Change the number of randomized trees and compare how their combined votes classify data.',
        href: '/resources/random-forest',
        icon: Network,
      },
      {
        name: 'Support Vector Machine',
        topic: 'Classification',
        description: 'Adjust regularization and inspect how a maximum-margin classifier separates observations.',
        href: '/resources/support-vector-machine',
        icon: CircleDot,
      },
    ],
  },
  {
    title: 'Unsupervised Learning',
    description: 'Find structure in unlabeled data by exploring cluster assignments and centroids.',
    labs: [
      {
        name: 'K-Means Clustering',
        topic: 'Clustering',
        description: 'Choose the number of clusters and iterations, then watch centroids and point assignments change.',
        href: '/resources/k-means-clustering',
        icon: Compass,
      },
    ],
  },
  {
    title: 'Neural Networks and Dimensionality Reduction',
    description: 'Explore a trainable neural classifier and how principal components summarize data variation.',
    labs: [
      {
        name: 'Neural Network Classification',
        topic: 'Neural networks',
        description: 'Adjust hidden-layer size and training steps to see how a small network learns a boundary.',
        href: '/resources/neural-network',
        icon: Braces,
      },
      {
        name: 'Principal Component Analysis',
        topic: 'Dimensionality reduction',
        description: 'Project standardized features onto principal components and compare the variance they capture.',
        href: '/resources/pca',
        icon: BarChart3,
      },
    ],
  },
];

const upcomingLabs = [
  {
    title: 'Model Training',
    description: 'Experiment with architectures, hyperparameters, optimization, and model performance.',
    icon: Network,
  },
  {
    title: 'AI System Experiments',
    description: 'Explore embeddings, retrieval, model outputs, and evaluation workflows.',
    icon: Braces,
  },
  {
    title: 'RAG Experiments',
    description: 'Investigate document chunking, retrieval quality, context construction, and grounded responses.',
    icon: Database,
  },
  {
    title: 'AI Evaluation',
    description: 'Compare outputs, evaluate quality, and understand trade-offs between system configurations.',
    icon: BarChart3,
  },
];

const learningSteps = [
  {
    number: '01',
    title: 'Configure',
    description: 'Change model parameters and experiment settings.',
  },
  {
    number: '02',
    title: 'Observe',
    description: 'Run experiments and visualize predictions or model behaviour.',
  },
  {
    number: '03',
    title: 'Understand',
    description: 'Compare outcomes and develop an intuition for how algorithms work.',
  },
];

export function LabsPage() {
  return (
    <>
      <section className="border-b border-ink-100 bg-white pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20">
        <div className="mx-auto grid max-w-8xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16 lg:px-10">
          <div className="max-w-3xl">
            <p className="mono-label text-accent-700">Interactive AI experiments</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              Understand AI by experimenting with it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">
              Explore interactive machine-learning labs that let you change model parameters, train algorithms, visualize predictions, and understand how AI systems learn.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#available-labs"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600 motion-reduce:transition-none"
              >
                Explore 11 Free Labs
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
              <a
                href="#coming-next"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-400 hover:bg-ink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600 motion-reduce:transition-none"
              >
                Explore What’s Next
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="border-l-2 border-accent-500 pl-4 text-sm leading-relaxed text-ink-600 lg:mb-1">
            <span className="font-semibold text-ink-900">11 interactive machine-learning labs</span>
            {' · Free access · Runs in your browser'}
          </p>
        </div>
      </section>

      <section id="available-labs" className="scroll-mt-24 border-b border-ink-100 bg-ink-50/50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="mono-label text-accent-700">Available now · Free</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-950 sm:text-4xl">
                Start with an experiment.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Each lab is an interactive learning resource. Change its settings, inspect the results, and build intuition one model at a time.
              </p>
            </div>
            <a
              href="/resources/"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
            >
              Browse all free resources <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-12">
            {labGroups.map((group) => {
              const headingId = `lab-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              return (
                <section key={group.title} aria-labelledby={headingId}>
                  <div className="mb-5 flex flex-col gap-1 border-b border-ink-200 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 id={headingId} className="text-xl font-semibold tracking-tight text-ink-900">
                      {group.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-ink-500">{group.description}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {group.labs.map((lab) => {
                      const Icon = lab.icon;
                      return (
                        <a
                          key={lab.href}
                          href={lab.href}
                          className="group flex min-h-52 flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-[0_12px_32px_rgba(13,15,18,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 motion-reduce:transform-none motion-reduce:transition-none"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1.5 text-xs font-medium text-accent-800">
                              <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                              {lab.topic}
                            </span>
                            <ArrowRight aria-hidden="true" className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-700 motion-reduce:transition-none" />
                          </div>
                          <h4 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-ink-900">{lab.name}</h4>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{lab.description}</p>
                          <span className="mt-5 text-sm font-semibold text-accent-700 group-hover:text-accent-900">Open Lab</span>
                        </a>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-100 py-16 sm:py-20 lg:py-24" aria-labelledby="learning-experience">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="mono-label">A practical learning loop</p>
            <h2 id="learning-experience" className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              Learn by Experimenting
            </h2>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {learningSteps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-ink-200 bg-white p-6">
                <p className="font-mono text-xs font-medium tracking-wider text-accent-700">{step.number}</p>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="coming-next" className="scroll-mt-24 border-b border-ink-100 bg-ink-50/50 py-16 sm:py-20 lg:py-24" aria-labelledby="beyond-tutorials">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="mb-9 max-w-2xl">
            <p className="mono-label text-accent-700">Planned capabilities</p>
            <h2 id="beyond-tutorials" className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              Beyond Interactive Tutorials
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Explore upcoming interactive environments designed to help learners experiment with advanced AI systems and understand their behaviour.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {upcomingLabs.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-ink-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-ink-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-600">
                    Planned
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-500">
            These advanced capabilities are planned and are not available as working labs today. Subscription access is also planned; no payment or subscription is required for the 11 labs above.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="early-access-heading">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="flex flex-col gap-7 rounded-2xl border border-ink-200 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="mono-label">Stay in the loop</p>
              <h2 id="early-access-heading" className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
                Get Early Access to Advanced AI Labs
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Be among the first to explore upcoming interactive environments for advanced AI experimentation.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-500">
                An online signup form still needs an email-collection integration. This link opens your email app; emailing expresses interest and does not guarantee access.
              </p>
            </div>
            <a
              href="mailto:deven@cloudsandai.com?subject=Early%20access%20to%20advanced%20AI%20labs&body=I%27m%20interested%20in%20hearing%20about%20upcoming%20advanced%20AI%20labs."
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600 motion-reduce:transition-none"
            >
              Join the Early-Access List
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
