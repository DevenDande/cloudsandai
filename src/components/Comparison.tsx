import { Check, Minus } from 'lucide-react';
import { comparisonRows } from '@/data/curriculum';

function Cell({ value, highlighted }: { value: string; highlighted: boolean }) {
  if (value === 'check') {
    return (
      <div className="flex justify-center">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            highlighted ? 'bg-accent-100' : 'bg-success-100'
          }`}
        >
          <Check
            className={`h-4 w-4 ${highlighted ? 'text-accent-600' : 'text-success-600'}`}
          />
        </div>
      </div>
    );
  }
  if (value === 'dash') {
    return (
      <div className="flex justify-center">
        <Minus className="h-4 w-4 text-ink-300" />
      </div>
    );
  }
  return (
    <span
      className={`text-sm font-medium ${
        value.startsWith('₹')
          ? highlighted
            ? 'text-accent-700 font-semibold'
            : 'text-ink-900 font-semibold'
          : highlighted
            ? 'text-accent-700'
            : 'text-ink-700'
      }`}
    >
      {value}
    </span>
  );
}

export function Comparison() {
  return (
    <section className="border-b border-ink-100 bg-ink-50/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Comparison</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Compare the Courses
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-ink-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-ink-500">
                  Feature
                </th>
                <th className="px-5 py-4 text-center text-sm font-medium text-ink-900">
                  Course 1
                  <span className="block text-xs font-normal text-ink-400">Foundation</span>
                </th>
                <th className="px-5 py-4 text-center text-sm font-medium text-accent-700">
                  Course 2
                  <span className="block text-xs font-normal text-accent-500">Complete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-ink-100 last:border-0 transition-colors hover:bg-ink-50/60 ${
                    row.feature === 'Price' ? 'bg-ink-50/40' : ''
                  }`}
                >
                  <td className="px-5 py-4 text-sm text-ink-700">
                    {row.feature === 'Price' ? (
                      <span className="font-medium text-ink-900">{row.feature}</span>
                    ) : (
                      row.feature
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.course1} highlighted={false} />
                  </td>
                  <td className="px-5 py-4 text-center bg-accent-50/30">
                    <Cell value={row.course2} highlighted={true} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-ink-500">
          Course 2 includes the complete Course 1 curriculum.
        </p>
      </div>
    </section>
  );
}
