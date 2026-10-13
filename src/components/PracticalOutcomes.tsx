const outcomes = [
  {
    title: 'Understand and Build Models',
    description:
      'Learn how data, mathematics and algorithms come together to produce predictions, and how to evaluate model performance.',
  },
  {
    title: 'Build Multimodal AI Applications',
    description: 'Integrate AI models to work with audio, text and images.',
  },
  {
    title: 'Build AI That Uses Tools',
    description:
      'Create applications that interact with APIs, execute controlled workflows and validate outputs.',
  },
];

export function PracticalOutcomes() {
  return (
    <section className="border-b border-ink-100 bg-ink-50/40 py-16 lg:py-20">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Practical Outcomes</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            From Understanding to Building
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {outcomes.map((outcome) => (
            <article key={outcome.title} className="rounded-xl border border-ink-100 bg-white p-5">
              <h3 className="text-base font-semibold text-ink-900">{outcome.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{outcome.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
