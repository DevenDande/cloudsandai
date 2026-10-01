import { useState } from 'react';
import { BookOpen, Brain, BarChart3, Cpu } from 'lucide-react';
import { CurriculumAccordion } from './CurriculumAccordion';
import {
  deepNeuralNetworks,
  course1Modules,
  integratedProgrammingImplementation,
} from '@/data/curriculum';

const course1Icons = [BookOpen, BarChart3, Brain];
const implementationElements = [
  'Python',
  'NumPy',
  'Pandas',
  'Matplotlib',
  'Scientific Computing',
  'Algorithm Implementation',
  'Data Analysis',
  'ML Implementation',
  'Problem Solving',
  'Experiments and Visualization',
];

export function Curriculum() {
  const [tab, setTab] = useState<'course1' | 'course2'>('course1');

  return (
    <section id="curriculum" className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="mono-label">Curriculum</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            The Curriculum
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Three academic areas form the course structure. Programming and implementation are integrated throughout both courses.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-8 inline-flex rounded-full border border-ink-200 bg-white p-1">
          <button
            onClick={() => setTab('course1')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              tab === 'course1'
                ? 'bg-ink-900 text-white'
                : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            Course 1 — Foundation
          </button>
          <button
            onClick={() => setTab('course2')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              tab === 'course2'
                ? 'bg-ink-900 text-white'
                : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            Course 2 — Complete
          </button>
        </div>

        {/* Course 1 curriculum */}
        {tab === 'course1' && (
          <div className="mt-8 space-y-4">
            {course1Modules.map((mod, i) => {
              const Icon = course1Icons[i] || BookOpen;
              return (
                <div key={mod.number}>
                  <div className="mb-2 flex items-center gap-2 text-ink-400">
                    <Icon className="h-4 w-4" />
                    <span className="mono-label">Module {mod.number}</span>
                  </div>
                  <CurriculumAccordion module={mod} />
                </div>
              );
            })}
          </div>
        )}

        {/* Course 2 curriculum */}
        {tab === 'course2' && (
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-accent-200 bg-accent-50/40 p-4">
              <p className="text-sm text-accent-800">
                <span className="font-medium">Course 2</span> includes all of Course 1
                plus the Deep Neural Networks module below and additional implementation sessions.
              </p>
            </div>

            {course1Modules.map((mod, i) => {
              const Icon = course1Icons[i] || BookOpen;
              return (
                <div key={mod.number}>
                  <div className="mb-2 flex items-center gap-2 text-ink-400">
                    <Icon className="h-4 w-4" />
                    <span className="mono-label">Module {mod.number} — Course 1</span>
                  </div>
                  <CurriculumAccordion module={mod} />
                </div>
              );
            })}

            <div className="pt-4">
              <div className="mb-2 flex items-center gap-2 text-accent-600">
                <Cpu className="h-4 w-4" />
                <span className="mono-label !text-accent-600">Course 2 Extension</span>
              </div>
              <CurriculumAccordion module={deepNeuralNetworks} />
            </div>
          </div>
        )}

        <section className="mt-12 border-t border-ink-100 pt-10">
          <div className="max-w-3xl">
            <p className="mono-label">Learning Methodology</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-3xl">
              Integrated Programming &amp; Implementation
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-500">
              Programming runs alongside the academic curriculum rather than being treated as a separate subject. Every major concept is connected to computation, coding, experimentation, visualization, and algorithm implementation.
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50/40 p-5 text-center">
            <p className="text-sm font-semibold text-accent-800">Learn the concept → Code it → Experiment with it → Understand it</p>
            <p className="mt-2 text-sm text-ink-600">Theory ↔ Computation ↔ Implementation, throughout the curriculum</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {['Mathematics', 'Code & Compute', 'Experiment', 'Machine Learning'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
                <span className="font-mono text-xs font-medium text-accent-600">0{i + 1}</span>
                <span className="text-sm font-medium text-ink-800">{step}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-500">This is a recurring learning cycle, not a sequence completed before coding begins.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {implementationElements.map((element) => (
              <span key={element} className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700">
                {element}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <CurriculumAccordion
              module={integratedProgrammingImplementation}
              showNumber={false}
              title="Explore integrated programming topics"
            />
          </div>
        </section>
      </div>
    </section>
  );
}
