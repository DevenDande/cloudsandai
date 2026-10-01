import type { CurriculumModule, TopicGroup } from '@/data/curriculum';

export function CurriculumAccordion({
  module,
  showNumber = true,
  title = module.title,
}: {
  module: CurriculumModule;
  showNumber?: boolean;
  title?: string;
}) {
  return (
    <section className="rounded-xl border border-ink-100 bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-ink-100 px-5 py-5 lg:px-6">
        <div className="flex items-center gap-4">
          {showNumber && (
            <span className="font-mono text-sm font-medium text-accent-500">
              {module.number}
            </span>
          )}
          <h3 className="text-sm font-semibold text-ink-900 lg:text-base">
            {title}
          </h3>
        </div>
        <span className="hidden text-xs text-ink-400 sm:block">
          {module.groups.length} sections
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 lg:px-6">
        {module.groups.map((group) => (
          <GroupBlock key={group.letter} group={group} />
        ))}
      </div>
    </section>
  );
}

function GroupBlock({ group }: { group: TopicGroup }) {
  return (
    <section className="rounded-lg border border-ink-100 bg-ink-50/30 p-4">
      <div className="flex items-start gap-2.5">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-ink-900 font-mono text-[10px] font-medium text-white">
          {group.letter}
        </span>
        <h4 className="pt-0.5 text-sm font-medium text-ink-800">{group.title}</h4>
      </div>
      <ul className="mt-2 pl-8">
          {group.topics.map((topic, i) => (
            <li
              key={i}
              className="flex items-start gap-2 py-1 text-sm text-ink-600"
            >
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-300" />
              {topic}
            </li>
          ))}
      </ul>
    </section>
  );
}
