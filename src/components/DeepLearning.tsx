import { Cpu, ArrowRight } from 'lucide-react';
import { deepNeuralNetworks } from '@/data/curriculum';
import { CurriculumAccordion } from './CurriculumAccordion';

export function DeepLearning() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="deep-learning" className="relative border-b border-ink-100 overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-accent-500" />
            <p className="mono-label !text-accent-600">Course 2 Extension</p>
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Deep Neural Networks
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Progress from classical machine learning into modern deep learning.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700">
              Included in Course 2
            </span>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-2 flex items-center gap-2 text-accent-600">
            <span className="mono-label !text-accent-600">Module 04</span>
          </div>
          <CurriculumAccordion module={deepNeuralNetworks} />
        </div>

        {/* Topic highlight grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            'Fundamentals',
            'Feedforward Networks',
            'Optimization',
            'Regularization',
            'CNNs',
            'Sequence Models',
            'Attention',
            'Transformers',
            'Neural Network Search',
            'Time Series Forecasting',
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
          <button
            onClick={() => scrollTo('#contact')}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800"
          >
            Enquire About Course 2
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo('#courses')}
            className="inline-flex items-center justify-center rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:border-ink-400"
          >
            Back to Courses
          </button>
        </div>
      </div>
    </section>
  );
}
