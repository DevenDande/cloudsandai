import { ArrowDown } from 'lucide-react';

const stages = [
  { num: '01', title: 'Mathematical Foundations', course: 1 },
  { num: '02', title: 'Statistical Methods', course: 1 },
  { num: '03', title: 'Machine Learning', course: 1 },
  { num: '04', title: 'Python + Coding', course: 1 },
  { num: '05', title: 'Deep Neural Networks', course: 2 },
];

export function Philosophy() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="mono-label">Learning Philosophy</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            From Mathematics to Machine Learning. From Machine Learning to Deep Learning.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-500">
            Machine learning is easier to understand when the mathematics, statistics,
            algorithms, and implementation are connected.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            cloudsandai follows a structured progression: mathematical foundations →
            statistical methods → machine learning → Python and coding → deep neural
            networks.
          </p>
        </div>

        {/* Progression visual */}
        <div className="mt-16">
          <div className="flex flex-col items-stretch gap-0">
            {stages.map((stage, i) => (
              <div key={stage.num}>
                <div
                  className={`group flex items-center gap-6 rounded-xl border p-6 transition-all hover:shadow-md ${
                    stage.course === 2
                      ? 'border-accent-200 bg-accent-50/40'
                      : 'border-ink-100 bg-white hover:border-ink-200'
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg font-mono text-lg font-medium ${
                      stage.course === 2
                        ? 'bg-accent-500 text-white'
                        : 'bg-ink-900 text-white'
                    }`}
                  >
                    {stage.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-ink-900">{stage.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          stage.course === 2
                            ? 'bg-accent-100 text-accent-700'
                            : 'bg-ink-100 text-ink-600'
                        }`}
                      >
                        {stage.course === 2 ? 'Course 2' : 'Course 1'}
                      </span>
                    </div>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-5 w-5 text-ink-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 rounded-xl border border-ink-100 bg-ink-50/50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-600">
              <span className="font-medium text-ink-900">Course 1</span> covers stages 01–04.
              <span className="font-medium text-ink-900"> Course 2</span> adds stage 05.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
