import { ArrowRight } from 'lucide-react';

const course1Path = ['Mathematics', 'Statistics', 'Machine Learning', 'Python + Coding'];

const course2Extra = [
  'Deep Neural Networks',
  'CNNs',
  'RNNs',
  'Attention',
  'Transformers',
  'Advanced Deep Learning Topics',
];

export function Roadmap() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Learning Roadmap</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            The Learning Path
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            A clear progression from foundations to advanced deep learning.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Course 1 Path */}
          <div className="rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label">Course 1</span>
              <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600">
                Foundation Track
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">
              Introduction to Machine Learning
            </h3>
            <div className="mt-6 space-y-0">
              {course1Path.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-ink-50 font-mono text-xs font-medium text-ink-700">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-ink-800">{step}</span>
                  </div>
                  {i < course1Path.length - 1 && (
                    <div className="ml-[18px] h-6 w-px bg-ink-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Course 2 Path */}
          <div className="rounded-2xl border border-ink-900 bg-ink-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="mono-label !text-accent-300">Course 2</span>
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-white">
                Complete Track
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              ML + Deep Neural Networks
            </h3>
            <div className="mt-6 space-y-0">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 font-mono text-xs font-medium text-ink-300">
                  ↻
                </div>
                <span className="text-sm font-medium text-ink-200">
                  Everything in Course 1
                </span>
              </div>
              <div className="ml-[18px] h-6 w-px bg-white/15" />
              {course2Extra.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/10 font-mono text-xs font-medium text-accent-300">
                      {i + 2}
                    </div>
                    <span className="text-sm font-medium text-ink-100">{step}</span>
                  </div>
                  {i < course2Extra.length - 1 && (
                    <div className="ml-[18px] h-6 w-px bg-white/15" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
