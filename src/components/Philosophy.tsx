const academicTrack = ['Mathematics', 'Statistics', 'Machine Learning'];
const computationalTrack = ['Python', 'Scientific Computing', 'Algorithms', 'Implementation'];

export function Philosophy() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-7xl">
          <p className="mono-label">Learning Philosophy</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Theory and computation, learned together.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-500">
            Machine learning is easier to understand when the mathematics, statistics,
            algorithms, and implementation are connected.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Mathematical, statistical and machine learning concepts develop alongside
            programming, algorithms and scientific computing. Learn the concept, implement
            it, experiment with it, and understand the relationship between theory and computation.
          </p>
        </div>

        {/* Parallel progression visual */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[{ title: 'Academic Foundations', items: academicTrack }, { title: 'Computational Foundations', items: computationalTrack }].map((track) => (
              <div key={track.title} className="rounded-xl border border-ink-100 bg-white p-6">
                <p className="mono-label">{track.title}</p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {track.items.map((item, i) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-ink-900 font-mono text-xs font-medium text-white">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="text-sm font-medium text-ink-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50/40 p-5 text-center">
            <p className="text-sm font-medium text-accent-800">Theory ↔ Computation ↔ Implementation</p>
            <p className="mt-2 text-sm text-ink-600">Deep Neural Networks follows as the advanced Course 2 extension.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
