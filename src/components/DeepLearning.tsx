import { Cpu, ArrowRight } from 'lucide-react';
import { AIEngineeringCurriculum } from './AIEngineeringCurriculum';

export function DeepLearning() {
  return (
    <section id="deep-learning" className="relative border-b border-ink-100 overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-accent-500" />
            <p className="mono-label !text-accent-600">AI Engineering</p>
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Practical AI Applications
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Move beyond fundamentals to build LLM-powered apps, document-grounded workflows, agentic systems and cloud-deployed solutions.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700">
              12-week application-first course
            </span>
          </div>
        </div>

        <div className="mt-10">
          <AIEngineeringCurriculum />
        </div>

        {/* Topic highlight grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            'LLMs',
            'RAG',
            'FastAPI',
            'Agentic AI',
            'Tool Calling',
            'Embeddings',
            'Grounded Answers',
            'Model Evaluation',
            'AWS Deployment',
            'Application Security',
          ].map((topic, i) => (
            <div
              key={i}
              className="rounded-lg border border-ink-100 bg-white px-3 py-3 text-center"
            >
              <span className="font-mono text-xs text-accent-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1 text-xs font-medium text-ink-700">{topic}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800"
          >
            Enquire About AI Engineering
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/courses"
            className="inline-flex items-center justify-center rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:border-ink-400"
          >
            Back to Courses
          </a>
        </div>
      </div>
    </section>
  );
}
