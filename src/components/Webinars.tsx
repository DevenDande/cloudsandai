import { Code2, Terminal, Cpu, Puzzle, BrainCircuit } from 'lucide-react';

const categories = [
  { icon: Code2, label: 'Python' },
  { icon: Terminal, label: 'Coding' },
  { icon: Cpu, label: 'Implementation' },
  { icon: Puzzle, label: 'Problem Solving' },
  { icon: BrainCircuit, label: 'ML-oriented Programming' },
];

export function Webinars() {
  return (
    <section id="webinars" className="border-b border-ink-100 bg-ink-50/40 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Computational practice sessions */}
          <div>
            <p className="mono-label">Course 1</p>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-3xl">
              8 Programming & Scientific Computing Sessions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Course 1 includes 8 Programming Sessions that run alongside the
              academic curriculum, connecting concepts with implementation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700"
                >
                  <cat.icon className="h-4 w-4 text-ink-400" />
                  {cat.label}
                </div>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-5 py-4">
              <span className="font-mono text-3xl font-semibold text-ink-900">8</span>
              <span className="text-sm text-ink-500">
                Programming
                <br />
                Sessions
              </span>
            </div>
          </div>

          {/* Additional deep-learning sessions */}
          <div>
            <p className="mono-label">Course 2</p>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-3xl">
              6 Additional Deep Learning Sessions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Course 2 adds 6 deep-learning implementation sessions alongside the 8
              Programming & Scientific Computing sessions included in Course 1.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-ink-100 bg-white px-5 py-4">
              <span className="font-mono text-3xl font-semibold text-ink-900">14</span>
              <span className="text-sm text-ink-500">
                Programming
                <br />
                Sessions
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-ink-100 font-mono text-xs font-medium text-ink-600">
                  8
                </span>
                <span className="text-sm text-ink-700">Programming & Scientific Computing</span>
              </div>
              <div className="flex items-center gap-1 pl-4 text-ink-300">
                <span className="text-xs">+</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-accent-200 bg-accent-50/40 px-4 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-accent-100 font-mono text-xs font-medium text-accent-700">
                  6
                </span>
                <span className="text-sm font-medium text-accent-800">
                  Deep Learning Implementation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
