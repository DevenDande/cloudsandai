const learningApplications = [
  {
    concept: 'Mathematics',
    appliedThrough: 'Python, NumPy, computation and visualization',
  },
  {
    concept: 'Statistics',
    appliedThrough: 'Python, data analysis and experiments',
  },
  {
    concept: 'Machine Learning',
    appliedThrough: 'Algorithm implementation, experimentation and evaluation',
  },
];

export function Philosophy() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-7xl">
          <p className="mono-label">Learning Philosophy</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            How You Learn
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-ink-800">
            Learn the concept. Code it. Experiment with it. Understand it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Programming is not taught as a separate subject. It is used throughout the curriculum to turn mathematical and statistical concepts into working implementations and experiments.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-ink-100 bg-white">
          <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 border-b border-ink-100 bg-ink-50/60 px-5 py-3 sm:grid lg:px-6">
            <span className="mono-label">Academic Concept</span>
            <span className="mono-label">Applied Through</span>
          </div>
          {learningApplications.map((item) => (
            <div
              key={item.concept}
              className="grid grid-cols-1 gap-2 border-b border-ink-100 px-5 py-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6 lg:px-6"
            >
              <div>
                <span className="mono-label sm:hidden">Academic Concept</span>
                <p className="mt-1 text-sm font-semibold text-ink-900 sm:mt-0">{item.concept}</p>
              </div>
              <div>
                <span className="mono-label sm:hidden">Applied Through</span>
                <p className="mt-1 text-sm leading-relaxed text-ink-600 sm:mt-0">{item.appliedThrough}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-accent-200 bg-accent-50/40 px-5 py-4 text-center lg:px-6">
            <p className="text-sm font-medium text-accent-800">Theory ↔ Computation ↔ Implementation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
