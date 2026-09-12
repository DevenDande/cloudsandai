import { Linkedin, Mail, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Webinars', href: '#webinars' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-16">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center text-ink-900"
            >
              <img
                src="/logo_cropped.png"
                alt="cloudsandai logo — machine learning and deep learning courses"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="mt-4 text-sm text-ink-500">
              Mathematics · Statistics · Machine Learning · Deep Learning · Python
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/devendande"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:deven@cloudsandai.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+918830628242"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white"
                aria-label="Phone"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <p className="mono-label">Navigation</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="mono-label">Contact</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:deven@cloudsandai.com"
                  className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                >
                  deven@cloudsandai.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918830628242"
                  className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                >
                  +91 8830628242
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/devendande"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-ink-100 pt-8">
          <p className="text-xs leading-relaxed text-ink-400">
            cloudsandai is an independent educational initiative. Curriculum references to
            any institution are for syllabus alignment/reference only and do not
            imply institutional affiliation, endorsement or certification.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-400">
            © 2026 cloudsandai. All rights reserved.
          </p>
          <p className="text-xs text-ink-300">
            Curriculum aligned with topics covered in IIT and BITS.
          </p>
        </div>
      </div>
    </footer>
  );
}
