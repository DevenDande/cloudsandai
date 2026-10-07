import { Check, ArrowRight } from 'lucide-react';

export function CourseSelection() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Course Selection</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Which Track Is Right For You?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Course 1 */}
          <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label">Course 1</span>
              <a
                href="tel:+918830628242"
                className="inline-flex items-center justify-center rounded-full bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-ink-200"
              >
                Call to know more
              </a>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">
              Foundation Track
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Build a foundation in mathematics, statistics and machine learning, with Python for Machine Learning and implementation integrated throughout.
            </p>
            <div className="mt-6 space-y-2">
              {['3 Core Areas', '120 hrs · 60 lectures', '8 Integrated Programming Sessions', 'Theory ↔ Computation ↔ Implementation'].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success-500" />
                    <span className="text-sm text-ink-700">{item}</span>
                  </div>
                )
              )}
            </div>
            <a
              href="tel:+918830628242"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-ink-900 transition-colors hover:text-ink-700"
            >
              Call to know more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Course 2 */}
          <div className="relative flex flex-col rounded-2xl border border-ink-900 bg-ink-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="mono-label !text-accent-300">Course 2</span>
              <a
                href="tel:+918830628242"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
              >
                Call to know more
              </a>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Machine Learning + Deep Neural Networks
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              Includes everything from Course 1, then extends into Deep Neural Networks, CNNs, Sequence Models, Attention, Transformers and advanced deep learning. Implementation continues throughout these topics.
            </p>
            <div className="mt-6 space-y-2">
              {[
                'Everything in Course 1',
                'Deep Neural Networks, CNNs and Sequence Models',
                'Attention, Transformers and Advanced Deep Learning',
                '180 hrs · 90 lectures (60 + 30 lectures)',
                '8 integrated programming + 6 additional deep-learning implementation sessions',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-400" />
                  <span className="text-sm text-ink-200">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-accent-500/10 px-3 py-2">
              <p className="text-xs font-medium text-accent-300">
                Course 2 includes everything in Course 1.
              </p>
            </div>
            <a
              href="tel:+918830628242"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-white transition-colors hover:text-accent-300"
            >
              Call to know more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
