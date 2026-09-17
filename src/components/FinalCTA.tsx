import { ArrowRight, Mail } from 'lucide-react';

export function FinalCTA() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-ink-950 py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-[0.07]" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="mono-label !text-accent-300">Start Learning</p>
        <h2 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build the Foundations.
          <br />
          Then Go Deeper.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-400">
          Learn theory and computation together, then continue into deep neural networks
          with Course 2.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => scrollTo('#courses')}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:bg-ink-100"
          >
            Explore Courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            <Mail className="h-4 w-4" />
            Contact Deven
          </button>
        </div>
      </div>
    </section>
  );
}
