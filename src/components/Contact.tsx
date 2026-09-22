import { useState } from 'react';
import { Instagram, Mail, Phone, Linkedin, Send, ArrowUpRight, Youtube } from 'lucide-react';

export function Contact({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Course Enquiry — ${form.course || 'General'} — ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone || 'Not provided'}\n` +
        `Course Interested In: ${form.course || 'Not specified'}\n\n` +
        `Message:\n${form.message}`
    );
    window.location.href = `mailto:deven@cloudsandai.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="border-b border-ink-100 bg-ink-50/40 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Info */}
          <div className="lg:col-span-5">
            <p className="mono-label">Contact</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              Discuss the Courses
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Have questions about the curriculum or which learning path is right for you?
              Get in touch with Deven.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:deven@cloudsandai.com"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400">Email</p>
                  <p className="text-sm font-medium text-ink-900">deven@cloudsandai.com</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-ink-700" />
              </a>

              <a
                href="tel:+918830628242"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400">Phone</p>
                  <p className="text-sm font-medium text-ink-900">+91 8830628242</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-ink-700" />
              </a>

              <a
                href="https://www.linkedin.com/in/devendande"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400">LinkedIn</p>
                  <p className="text-sm font-medium text-ink-900">linkedin.com/in/devendande</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-ink-700" />
              </a>

              <a
                href="https://www.linkedin.com/company/cloudsandai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400">cloudsandai LinkedIn</p>
                  <p className="text-sm font-medium text-ink-900">linkedin.com/company/cloudsandai</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-ink-700" />
              </a>

              <a
                href="https://www.instagram.com/cloudsandaidotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400">Instagram</p>
                  <p className="text-sm font-medium text-ink-900">@cloudsandaidotcom</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-ink-700" />
              </a>

              <a
                href="https://www.youtube.com/@cloudsandai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-4 transition-all hover:border-ink-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <Youtube className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400">YouTube</p>
                  <p className="text-sm font-medium text-ink-900">@cloudsandai</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-ink-700" />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          {!compact && <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-ink-100 bg-white p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-ink-700"
                  >
                    Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-colors placeholder:text-ink-300 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-ink-700"
                  >
                    Email <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-colors placeholder:text-ink-300 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium text-ink-700"
                  >
                    Phone <span className="text-ink-400">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-colors placeholder:text-ink-300 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
                    placeholder="+91 ..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="course"
                    className="mb-1.5 block text-xs font-medium text-ink-700"
                  >
                    Course Interested In
                  </label>
                  <select
                    id="course"
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-colors focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
                  >
                    <option value="">Select a course</option>
                    <option value="Introduction to Machine Learning — ₹15,000">
                      Introduction to Machine Learning — ₹15,000
                    </option>
                    <option value="Machine Learning + Deep Neural Networks — ₹20,000">
                      Machine Learning + Deep Neural Networks — ₹20,000
                    </option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium text-ink-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-colors placeholder:text-ink-300 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
                  placeholder="Your questions or message..."
                />
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800 hover:shadow-lg hover:shadow-ink-900/10"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                Send Enquiry
              </button>

              {sent && (
                <p className="mt-4 text-sm text-success-600">
                  Your email client should now be open with your enquiry pre-filled.
                  If it didn't open, please email deven@cloudsandai.com directly.
                </p>
              )}

              <p className="mt-4 text-xs text-ink-400">
                This form opens your email client addressed to Deven. No data is stored
                or sent through a server.
              </p>
            </form>
          </div>}
          {compact && (
            <div className="lg:col-span-7 lg:flex lg:items-end">
              <a href="/contact" className="inline-flex items-center rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-ink-800">
                Contact cloudsandai
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
