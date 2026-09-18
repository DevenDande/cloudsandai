import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Mail, Linkedin } from 'lucide-react';

const courseImages = [
  { src: '/courses/1_deeplearning.png', alt: 'Deep Neural Networks course' },
  { src: '/courses/2_machinelearning.png', alt: 'Machine Learning course' },
  {
    src: '/courses/3_maths.png',
    alt: 'Mathematics for Machine Learning course',
  },
  { src: '/courses/4_Probandstats.png', alt: 'Probability and Statistics course' },
  {
    src: '/courses/5_numpypandas.png',
    alt: 'NumPy, Pandas and Matplotlib course',
  },
];

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % courseImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const showPrevious = () => {
    setActiveImage((current) => (current - 1 + courseImages.length) % courseImages.length);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % courseImages.length);
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

          {/* Right: Course carousel */}
          <div className="lg:col-span-5">
            <div
              className="relative animate-fade-in opacity-0"
              style={{ animationDelay: '0.4s' }}
            >
              <div
                className="overflow-hidden rounded-2xl border border-ink-100 bg-white/60 shadow-sm backdrop-blur-sm"
                role="region"
                aria-roledescription="carousel"
                aria-label="Cloudsandai course curriculum"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="relative aspect-square bg-white">
                  {courseImages.map((image, index) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 motion-reduce:transition-none ${
                        activeImage === index ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden={activeImage !== index}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-ink-100 bg-white/80 px-4 py-3 backdrop-blur-sm">
                  <span className="font-mono text-xs text-ink-400">course.curriculum</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                      aria-label="Show previous course image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div
                      className="flex items-center gap-1.5"
                      aria-label={`Image ${activeImage + 1} of ${courseImages.length}`}
                    >
                      {courseImages.map((image, index) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            activeImage === index ? 'w-5 bg-ink-900' : 'w-1.5 bg-ink-300'
                          }`}
                          aria-label={`Show course image ${index + 1}`}
                          aria-current={activeImage === index}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={showNext}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                      aria-label="Show next course image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
