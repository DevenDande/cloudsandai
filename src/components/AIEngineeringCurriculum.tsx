import { aiEngineeringCoreAreas } from '@/data/curriculum';

export function AIEngineeringCurriculum() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {aiEngineeringCoreAreas.map((area, index) => (
        <section
          key={area.title}
          className="rounded-lg border border-ink-100 bg-ink-50/30 p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-ink-900 font-mono text-[10px] font-medium text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-sm font-medium text-ink-800">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {area.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
