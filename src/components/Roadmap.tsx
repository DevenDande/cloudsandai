const academicPath = [
  {
    title: 'Python Programming',
    description: 'Python fundamentals, data structures and scientific computing for AI and ML tasks.',
  },
  {
    title: 'Mathematics and Statistics',
    description: 'Vectors, matrices, derivatives, probability, distributions and useful ML intuition.',
  },
  {
    title: 'Machine Learning Fundamentals',
    description: 'Regression, classification, evaluation, overfitting, generalization and model understanding.',
  },
];

const aiEngineeringPath = [
  'LLM fundamentals',
  'Model selection and local/cloud inference',
  'APIs and FastAPI',
  'RAG and grounded answers',
  'Agentic AI workflows',
  'AWS deployment',
];

export function Roadmap() {
  return (
    <section id="ai-engineering" className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Learning Roadmap</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            The Learning Path
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Start with the fundamentals of AI and ML, then move into practical AI application development with LLMs, APIs and deployment workflows.
          </p>
          <p className="mt-5 text-sm font-medium text-ink-600">
            AI/ML Foundations <span className="px-1 text-ink-300">→</span> Understand the core ideas{' '}
            <span className="px-1 text-ink-300">→</span> AI Engineering{' '}
            <span className="px-1 text-ink-300">→</span> Build and deploy AI applications
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* AI/ML Foundations Path */}
          <div className="rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label">Course 1</span>
              <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600">
                AI/ML Foundations
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">
              Learn the fundamentals from zero
            </h3>
            <div className="mt-6 space-y-3">
              {academicPath.map((area, i) => (
                <div key={area.title} className="flex items-start gap-4 rounded-lg border border-ink-100 bg-ink-50/40 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-white font-mono text-xs font-medium text-ink-700">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{area.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{area.description}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-lg border border-accent-200 bg-accent-50/40 p-4">
                <p className="text-sm font-medium text-accent-800">Theory ↔ Computation ↔ Implementation</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">Each concept is connected to code, experiments and a clear understanding of how the model works.</p>
              </div>
            </div>
          </div>

          {/* AI Engineering Path */}
          <div className="rounded-2xl border border-ink-900 bg-ink-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="mono-label !text-accent-300">Course 2</span>
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-white">
                AI Engineering
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Build and deploy AI applications
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              For learners with Python proficiency. Admission includes a consultation with Deven.
            </p>
            <div className="mt-6 space-y-0">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 font-mono text-xs font-medium text-ink-300">
                  ↻
                </div>
                <span className="text-sm font-medium text-ink-200">
                  Build on the fundamentals with practical, project-based learning
                </span>
              </div>
              <div className="ml-[18px] h-6 w-px bg-white/15" />
              {aiEngineeringPath.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/10 font-mono text-xs font-medium text-accent-300">
                      {i + 2}
                    </div>
                    <span className="text-sm font-medium text-ink-100">{step}</span>
                  </div>
                  {i < aiEngineeringPath.length - 1 && (
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
