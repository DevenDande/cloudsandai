import { FunctionSquare, BarChart3, Cpu, Code2, BrainCircuit } from 'lucide-react';

const reasons = [
  {
    icon: FunctionSquare,
    title: 'Mathematical Intuition',
    text: 'Understand the mathematical structures behind machine learning rather than treating algorithms as black boxes.',
  },
  {
    icon: BarChart3,
    title: 'Statistical Understanding',
    text: 'Build familiarity with probability, distributions, estimation, hypothesis testing and statistical modelling.',
  },
  {
    icon: Cpu,
    title: 'Algorithmic Understanding',
    text: 'Study classical machine learning methods including regression, classification, trees, SVMs, Bayesian learning, ensembles and unsupervised learning.',
  },
  {
    icon: Code2,
    title: 'Implementation',
    text: 'Use dedicated Python and coding webinars to connect concepts with implementation.',
  },
  {
    icon: BrainCircuit,
    title: 'Deep Learning Progression',
    text: 'Course 2 builds on the previous foundation and moves into DNNs, CNNs, RNNs, attention, transformers and additional deep learning techniques.',
  },
];

export function WhyApproach() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Why This Approach</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Why Start With the Foundations?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`group rounded-xl border border-ink-100 bg-white p-6 transition-all hover:border-ink-200 hover:shadow-md ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                <reason.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
