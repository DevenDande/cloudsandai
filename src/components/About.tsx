import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Mail, Phone } from 'lucide-react';

const profileImages = [
  { src: '/1735043718836.jpeg', alt: 'Deven Dande teaching an AI and machine learning session' },
  { src: '/WhatsApp_Image_2026-09-09_at_5.16.37_PM copy.jpeg', alt: 'Deven Dande with students during an academic session' },
  { src: '/WhatsApp_Image_2026-09-09_at_5.16.38_PM copy.jpeg', alt: 'Deven Dande with a student and colleague' },
];

export function About() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % profileImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setActiveImage((current) => (current - 1 + profileImages.length) % profileImages.length);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % profileImages.length);
  };

  return (
    <section id="about" className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mono-label">About</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              About the Instructor
            </h2>

            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100">
              <div className="relative aspect-[4/5] bg-ink-100">
                {profileImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      activeImage === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={activeImage !== index}
                  />
                ))}

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-white/30 bg-white/80 px-4 py-3 backdrop-blur-sm">
                  <p className="font-mono text-xs text-ink-400">instructor.profile</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                      aria-label="Show previous instructor image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-1.5" aria-label={`Image ${activeImage + 1} of ${profileImages.length}`}>
                      {profileImages.map((image, index) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            activeImage === index ? 'w-5 bg-ink-900' : 'w-1.5 bg-ink-300'
                          }`}
                          aria-label={`Show instructor image ${index + 1}`}
                          aria-current={activeImage === index}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={showNext}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                      aria-label="Show next instructor image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-16">
            <h3 className="text-2xl font-semibold tracking-tight text-ink-900">
              Deven Dande & team of 3+ AI Engineers
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Deven Dande and his team bring a foundations-first approach to AI/ML, backed by AWS certifications and hands-on experience delivering AI/ML projects and POCs for clients across India, the UK, USA, and government sectors. <b>For the past three years, the team has also conducted AI/ML internships and training programs for polytechnic and engineering students across Nagpur, focusing on practical, industry-oriented learning with 200+ happy and knowledgable students.</b>
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="https://www.linkedin.com/in/devendande"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900">Connect on LinkedIn</p>
                  <p className="text-xs text-ink-400">linkedin.com/in/devendande</p>
                </div>
              </a>

              <a
                href="mailto:deven@cloudsandai.com"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900">Email</p>
                  <p className="text-xs text-ink-400">deven@cloudsandai.com</p>
                </div>
              </a>

              <a
                href="tel:+918830628242"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900">Phone</p>
                  <p className="text-xs text-ink-400">+91 8830628242</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
