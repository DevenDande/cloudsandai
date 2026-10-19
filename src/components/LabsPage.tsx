import { ArrowRight, BrainCircuit, FlaskConical } from 'lucide-react';

const labIdeas = [
  {
    title: 'Model-training experiments',
    description:
      'Interactive simulations for changing model inputs and training settings, then observing how learning and predictions respond.',
    icon: BrainCircuit,
  },
  {
    title: 'AI engineering labs',
    description:
      'Guided environments for exploring the building blocks of AI applications, including models, APIs and retrieval workflows.',
    icon: FlaskConical,
  },
];

export function LabsPage() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mono-label">Interactive learning</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              Learn by experimenting
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              cloudsandai is building toward hands-on labs that make AI concepts easier to explore through experimentation, not just explanation.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Free educational resources will remain accessible. A future subscription is planned for additional advanced lab capabilities; no subscription or payment is required to use the resources available today.
            </p>
            <a
              href="/resources/"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-800"
            >
              Explore Free Resources
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-700">
              Advanced subscription labs · Coming Soon
            </div>
            <div className="space-y-4">
              {labIdeas.map(({ title, description, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-ink-100 bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
