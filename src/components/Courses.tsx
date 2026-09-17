import { Check, ArrowRight, BookOpen, Award, Video } from 'lucide-react';
import { courses } from '@/data/curriculum';

export function Courses() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="courses" className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="mono-label">Courses</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            Two structured programs. One foundations-first approach.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all lg:p-10 ${
                course.highlighted
                  ? 'border-ink-900 bg-ink-950 text-white shadow-xl shadow-ink-900/10'
                  : 'border-ink-100 bg-white hover:border-ink-200 hover:shadow-lg'
              }`}
            >
              {course.badge && (
                <span className="absolute -top-3 right-8 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-xs font-medium text-white shadow-md">
                  <Check className="h-3 w-3" />
                  {course.badge}
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`mono-label ${
                      course.highlighted ? '!text-accent-300' : ''
                    }`}
                  >
                    {course.label}
                  </span>
                  <h3
                    className={`mt-3 text-xl font-semibold leading-snug tracking-tight lg:text-2xl ${
                      course.highlighted ? 'text-white' : 'text-ink-900'
                    }`}
                  >
                    {course.title}
                  </h3>
                </div>
                <div className="text-right">
                  <p
                    className={`text-2xl font-semibold tracking-tight lg:text-3xl ${
                      course.highlighted ? 'text-white' : 'text-ink-900'
                    }`}
                  >
                    {course.price}
                  </p>
                </div>
              </div>

              <p
                className={`mt-4 text-sm leading-relaxed ${
                  course.highlighted ? 'text-ink-300' : 'text-ink-500'
                }`}
              >
                {course.description}
              </p>

              <div
                className={`mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium ${
                  course.highlighted
                    ? 'bg-white/10 text-accent-200'
                    : 'bg-ink-50 text-ink-700'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                {course.summary}
              </div>

              <div
                className={`mt-3 text-sm ${
                  course.highlighted ? 'text-ink-200' : 'text-ink-700'
                }`}
              >
                <span className="font-medium">{course.duration}</span>
                {' · '}
                <span className="font-medium">{course.lectures}</span>
                {course.additionalDuration && course.additionalLectures && (
                  <span className="ml-2 text-xs opacity-75">
                    ({course.additionalDuration} + {course.additionalLectures})
                  </span>
                )}
              </div>

              {/* Core areas */}
              <div className="mt-6 space-y-2.5">
                {course.coreAreas.map((area, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded ${
                        course.highlighted
                          ? 'bg-white/10 text-accent-300'
                          : 'bg-ink-50 text-ink-600'
                      }`}
                    >
                      <span className="font-mono text-[10px] font-medium">{i + 1}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        course.highlighted ? 'text-ink-200' : 'text-ink-700'
                      }`}
                    >
                      {area}
                    </span>
                  </div>
                ))}
              </div>

              {/* Practice sessions */}
              <div
                className={`mt-6 border-t pt-5 ${
                  course.highlighted ? 'border-white/10' : 'border-ink-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Video
                    className={`h-4 w-4 ${
                      course.highlighted ? 'text-accent-300' : 'text-ink-400'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium uppercase tracking-wider ${
                      course.highlighted ? 'text-ink-300' : 'text-ink-400'
                    }`}
                  >
                    Sessions
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {course.webinars.map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Award
                        className={`h-3.5 w-3.5 ${
                          course.highlighted ? 'text-accent-300' : 'text-ink-400'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          course.highlighted ? 'text-ink-200' : 'text-ink-700'
                        }`}
                      >
                        {w}
                      </span>
                    </div>
                  ))}
                  <div
                    className={`mt-2 text-sm font-medium ${
                      course.highlighted ? 'text-white' : 'text-ink-900'
                    }`}
                  >
                    Total: {course.totalWebinars} Sessions
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div
                className={`${course.highlighted ? 'mt-8' : 'mt-auto'} flex flex-col gap-3 sm:flex-row sm:items-center`}
              >
                <button
                  onClick={() => scrollTo('#contact')}
                  className={`group inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                    course.highlighted
                      ? 'bg-white text-ink-900 hover:bg-ink-100'
                      : 'bg-ink-900 text-white hover:bg-ink-800'
                  }`}
                >
                  Enquire About Course
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => scrollTo('#curriculum')}
                  className={`inline-flex items-center justify-center text-sm font-medium underline-offset-4 hover:underline ${
                    course.highlighted ? 'text-accent-200' : 'text-ink-500'
                  }`}
                >
                  View Curriculum
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
