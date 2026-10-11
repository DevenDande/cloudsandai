const resources = [
  {
    title: 'Simple Linear Regression',
    description:
      'Explore how a model learns from data. Adjust the weight and bias, visualize prediction errors, and experiment with gradient descent in an interactive lab.',
    href: '/resources/simple-linear-regression',
    cta: 'Explore Interactive Lab',
  },
  {
    title: 'Multiple Linear Regression',
    description:
      'Explore how four input features work together to predict a target. Adjust model coefficients, standardize inputs, and train with gradient descent.',
    href: '/resources/multiple-linear-regression',
    cta: 'Explore Interactive Lab',
  },
];

export function ResourcesPage() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-[0_12px_35px_rgba(13,15,18,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_18px_40px_rgba(13,15,18,0.08)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
                <span className="text-lg font-semibold">{resource.title.startsWith('Simple') ? 'SL' : 'ML'}</span>
              </div>

              <p className="mono-label">Interactive resource</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-900">{resource.title}</h2>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink-500">{resource.description}</p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
                {resource.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
