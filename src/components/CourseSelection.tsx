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
          {/* AI/ML Foundations */}
          <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label">AI/ML Foundations</span>
              <a
                href="tel:+919028028869"
                className="inline-flex items-center justify-center rounded-full bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-ink-200"
              >
                Call to know more
              </a>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">
              A beginner-friendly start
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Learn Python, mathematics, statistics and machine learning fundamentals through guided practice, hands-on coding and a beginner-level capstone project.
            </p>
            <div className="mt-6 space-y-2">
              {['Beginners from zero', '16 weeks', 'Python and scientific computing', 'Capstone project', 'Theory ↔ Computation ↔ Implementation'].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success-500" />
                    <span className="text-sm text-ink-700">{item}</span>
                  </div>
                )
              )}
            </div>
            <a
              href="tel:+919028028869"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-ink-900 transition-colors hover:text-ink-700"
            >
              Call to know more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* AI Engineering */}
          <div className="relative flex flex-col rounded-2xl border border-ink-900 bg-ink-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="mono-label !text-accent-300">AI Engineering</span>
              <a
                href="tel:+919028028869"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
              >
                Book a consultation
              </a>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Build practical AI systems
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              Learn to integrate LLMs, APIs, open-source models, RAG and agentic workflows into production-minded AI applications, with AWS deployment as part of the learning path.
            </p>
            <div className="mt-6 space-y-2">
              {[
                '16 weeks',
                'Python proficiency and consultation with Deven before admission',
                'LLMs, RAG and API integration',
                'Three end-to-end AI engineering projects',
                'AWS deployment and application workflow design',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent-400" />
                  <span className="text-sm text-ink-200">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="tel:+919028028869"
              className="group mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-white transition-colors hover:text-accent-300"
            >
              Book a consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
