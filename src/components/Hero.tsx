import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import { MathMotif } from './MathMotif';

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-ink-100 pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

      <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          {/* Left: Content */}
          <div className="lg:col-span-7">
            <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
              <p className="mono-label">
                Mathematics · Statistics · Machine Learning · Programming · Deep Learning
              </p>
            </div>

            <h1
              className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl animate-fade-up opacity-0"
              style={{ animationDelay: '0.2s' }}
            >
              Understand Machine Learning from the Foundations Up.
            </h1>

            <p
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-500 animate-fade-up opacity-0"
              style={{ animationDelay: '0.3s' }}
            >
              Learn mathematics, statistics, machine learning, programming, algorithms and
              scientific computing together through a structured, instructor-led curriculum.
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up opacity-0"
              style={{ animationDelay: '0.4s' }}
            >
              <button
                onClick={() => scrollTo('#courses')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800 hover:shadow-lg hover:shadow-ink-900/10"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:border-ink-400 hover:bg-ink-50"
              >
                <Mail className="h-4 w-4" />
                Contact Deven
              </button>
            </div>

            <div
              className="mt-10 flex items-center gap-3 animate-fade-up opacity-0"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="text-sm text-ink-400">By Deven Dande</span>
              <span className="h-1 w-1 rounded-full bg-ink-200" />
              <a
                href="https://www.linkedin.com/company/cloudsandai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-accent-600"
              >
                <Linkedin className="h-4 w-4" />
                cloudsandai LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Visual motif */}
          <div className="lg:col-span-5">
            <div
              className="relative animate-fade-in opacity-0"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="rounded-2xl border border-ink-100 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="mono-label">network.topology</span>
                  <span className="font-mono text-xs text-accent-500">●</span>
                </div>
                <MathMotif className="h-64 w-full" />
                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
                  <span className="font-mono text-xs text-ink-400">f(x) = σ(Wx + b)</span>
                  <span className="font-mono text-xs text-ink-400">∇θ 𝓛(θ)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
