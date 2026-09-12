import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import type { CurriculumModule, TopicGroup } from '@/data/curriculum';

export function CurriculumAccordion({ module }: { module: CurriculumModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all ${
        open
          ? 'border-ink-300 bg-white shadow-sm'
          : 'border-ink-100 bg-white hover:border-ink-200'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left lg:px-6"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-medium text-accent-500">
            {module.number}
          </span>
          <h4 className="text-sm font-semibold text-ink-900 lg:text-base">
            {module.title}
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-ink-400 sm:block">
            {module.groups.length} sections
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50 text-ink-600">
            {open ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-ink-100 px-5 py-5 lg:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {module.groups.map((group) => (
              <GroupBlock key={group.letter} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GroupBlock({ group }: { group: TopicGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-ink-100 bg-ink-50/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-ink-900 font-mono text-[10px] font-medium text-white">
            {group.letter}
          </span>
          <span className="text-sm font-medium text-ink-800">{group.title}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-ink-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <ul className="px-4 pb-4 pl-12">
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
      )}
    </div>
  );
}
