import { GraduationCap, Sparkles, Wrench, Code2, BrainCircuit } from 'lucide-react';

const audiences = [
  {
    icon: GraduationCap,
    title: 'Polytechnic & Engineering Students',
    text: 'For students looking for structured coverage of mathematical foundations, statistics, programming and machine learning.',
  },
  {
    icon: Sparkles,
    title: 'Recent Graduates',
    text: 'For recent graduates who want to strengthen their foundations and connect theory with implementation.',
  },
  {
    icon: Wrench,
    title: 'Data Analysts & Data Scientists',
    text: 'For data professionals who want to deepen their understanding of the mathematics and mechanics behind machine learning.',
  },
  {
    icon: Code2,
    title: 'ML Engineers Who Need to Understand the Basics',
    text: 'For ML engineers who know how to build systems but want to understand why the methods work.',
  },
  {
    icon: BrainCircuit,
    title: 'Curious Learners, Irrespective of Background',
    text: 'For curious learners who want to understand machine learning from the foundations up, regardless of their background.',
  },
];

export function WhoFor() {
  return (
    <section className="border-b border-ink-100 bg-ink-50/40 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Audience</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Who Is This For?
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((aud, i) => (
            <div
              key={i}
              className={`rounded-xl border border-ink-100 bg-white p-6 transition-all hover:border-ink-200 hover:shadow-md ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-900 text-white">
                <aud.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-900">{aud.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{aud.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
