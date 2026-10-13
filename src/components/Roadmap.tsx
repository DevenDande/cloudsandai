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
            Choose a beginner path into machine learning foundations or build practical AI applications with Python.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* AI/ML Foundations Path */}
          <div className="rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-center justify-between">
              <span className="mono-label">Course 1</span>
              <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600">16 weeks</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">
              AI/ML Foundations
            </h3>
            <p className="mt-2 text-sm font-medium text-ink-500">Beginners starting from zero</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Build a strong foundation in Python, mathematics, statistics, machine learning and introductory deep learning.
            </p>
            <div className="mt-5 space-y-3">
              <p className="text-sm leading-relaxed text-ink-500">
                <span className="font-semibold text-ink-800">Practical outcome:</span> Build predictive models, analyze real datasets and train your first neural network.
              </p>
              <p className="text-sm leading-relaxed text-ink-500">
                <span className="font-semibold text-ink-800">Project:</span> Complete one guided, assessed ML capstone.
              </p>
            </div>
            <a
              href="/courses/#course-1"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors hover:text-ink-700"
            >
              Explore Foundations
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* AI Engineering Path */}
          <div className="rounded-2xl border border-ink-900 bg-ink-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <span className="mono-label !text-accent-300">Course 2</span>
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-white">16 weeks</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              AI Engineering
            </h3>
            <p className="mt-2 text-sm font-medium text-ink-300">Learners with Python proficiency</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              Build AI applications using LLMs, APIs, multimodal models, retrieval-augmented generation and agentic workflows.
            </p>
            <div className="mt-5 space-y-3">
              <p className="text-sm leading-relaxed text-ink-300">
                <span className="font-semibold text-white">Practical outcome:</span> Build applications that work with documents and media, integrate AI models, and use tools to execute controlled workflows.
              </p>
              <p className="text-sm leading-relaxed text-ink-300">
                <span className="font-semibold text-white">Projects:</span> Complete three guided, assessed end-to-end projects, one from each category: Knowledge-Grounded AI, Multimodal AI and Agentic AI.
              </p>
            </div>
            <a
              href="/courses/#course-2"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accent-300"
            >
              Explore AI Engineering
              <span aria-hidden="true">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
