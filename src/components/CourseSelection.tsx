import { Check, ArrowRight } from 'lucide-react';

export function CourseSelection() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <div className="rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label">Course 1</span>
              <span className="font-mono text-2xl font-semibold text-ink-900">₹15,000</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">
              Foundation Track
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Choose Course 1 if you want to build a strong foundation in mathematics,
              statistics and machine learning, with 8 Python + Coding webinars.
            </p>
            <div className="mt-6 space-y-2">
              {['3 Core Areas', '8 Python + Coding Webinars', 'Math → Stats → ML → Python'].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success-500" />
                    <span className="text-sm text-ink-700">{item}</span>
                  </div>
                )
              )}
            </div>
            <button
              onClick={() => scrollTo('#contact')}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors hover:text-ink-700"
            >
              Enquire About Course 1
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Course 2 */}
          <div className="relative rounded-2xl border border-ink-900 bg-ink-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="mono-label !text-accent-300">Course 2</span>
              <span className="font-mono text-2xl font-semibold text-white">₹20,000</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Complete Track</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              Choose Course 2 if you want the complete Course 1 curriculum and want to
              progress into Deep Neural Networks, with 6 additional webinars.
            </p>
            <div className="mt-6 space-y-2">
              {[
                'Everything in Course 1',
                'Deep Neural Networks',
                '14 Total Webinars',
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
            <button
              onClick={() => scrollTo('#contact')}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accent-300"
            >
              Enquire About Course 2
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
