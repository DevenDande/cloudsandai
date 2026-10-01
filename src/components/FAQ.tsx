import { faqItems } from '@/data/curriculum';

export function FAQ() {
  return (
    <section id="faq" className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">FAQ</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-xl border border-ink-100 bg-white p-5 transition-colors hover:border-ink-200"
            >
              <h3 className="text-sm font-medium text-ink-900 lg:text-base">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
