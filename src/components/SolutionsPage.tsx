import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Blocks,
  Braces,
  BrainCircuit,
  Cloud,
  Database,
  FileSearch,
  Gauge,
  MessageSquareText,
  Network,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
  Workflow,
} from 'lucide-react';
import { Contact } from '@/components/Contact';

const solutions = [
  {
    icon: ScanText,
    number: '01',
    title: 'Document Intelligence & OCR',
    description: 'Turn documents and images into searchable text and structured information.',
    capabilities: [
      'OCR and text extraction',
      'PDF, image, form, and table processing',
      'Structured data extraction and document classification',
    ],
    examples: 'Invoices, contracts, forms, academic documents, and compliance records',
  },
  {
    icon: AudioLines,
    number: '02',
    title: 'Speech & Audio Intelligence',
    description: 'Make spoken information easier to search, understand, and act on.',
    capabilities: [
      'Speech-to-text transcription and speaker diarization',
      'Audio summarization and speech analytics',
      'Multilingual transcription and audio classification',
    ],
    examples: 'Meetings, lectures, interviews, and recorded calls',
  },
  {
    icon: Video,
    number: '03',
    title: 'Video Intelligence & Analysis',
    description: 'Explore ways to find relevant scenes, content, and events in video.',
    capabilities: [
      'Video summarization and scene detection',
      'Visual content analysis and video-to-text analysis',
      'Object, activity, and event detection where supported by selected models',
      'Media search',
    ],
    examples: 'Recorded sessions, media libraries, and operational footage',
  },
  {
    icon: BrainCircuit,
    number: '04',
    title: 'Generative AI & Knowledge Assistants',
    description: 'Connect language models to trusted knowledge and useful workflows.',
    capabilities: [
      'Retrieval-Augmented Generation (RAG)',
      'Document-grounded question answering',
      'Enterprise knowledge assistants',
      'LLM integration, summarization, and content generation',
    ],
    examples: 'Internal knowledge search, policy assistants, and document Q&A',
  },
  {
    icon: Workflow,
    number: '05',
    title: 'Agentic AI & Workflow Automation',
    description: 'Coordinate AI tools and business systems across multi-step processes.',
    capabilities: [
      'Tool-using AI agents and multi-step workflow orchestration',
      'API and business-system integration',
      'Human approval and escalation workflows',
    ],
    examples: 'Enquiry processing, report preparation, and repetitive business operations',
  },
  {
    icon: Blocks,
    number: '06',
    title: 'Custom AI Applications & Integration',
    description: 'Bring AI capabilities into applications, products, and existing systems.',
    capabilities: [
      'AI-powered application and API development',
      'Integration of models into existing products',
      'Cloud-based AI deployment',
      'Evaluation, monitoring, and optimization',
    ],
    examples: 'Customer-facing AI tools, internal applications, and AI-enabled SaaS features',
  },
];

const capabilities = [
  { icon: Network, label: 'Multimodal AI' },
  { icon: Database, label: 'Data extraction & enrichment' },
  { icon: Gauge, label: 'Model evaluation' },
  { icon: Braces, label: 'AI application development' },
  { icon: Cloud, label: 'Cloud-native AI deployment' },
  { icon: Search, label: 'API & database integration' },
  { icon: ShieldCheck, label: 'Security & access controls' },
  { icon: MessageSquareText, label: 'Monitoring & optimization' },
];

const approach = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business problem, existing workflow, data, and success criteria.',
  },
  {
    number: '02',
    title: 'Prototype',
    description: 'Develop a focused proof of concept to test feasibility.',
  },
  {
    number: '03',
    title: 'Evaluate',
    description: 'Assess output quality, reliability, latency, cost, and risks.',
  },
  {
    number: '04',
    title: 'Deploy & Improve',
    description: 'Integrate and deploy where appropriate, with monitoring and ongoing improvement.',
  },
];

const applications = [
  'Extract structured information from complex documents.',
  'Transcribe meetings and identify individual speakers.',
  'Search and summarize large document collections.',
  'Analyze recorded video and identify relevant events.',
  'Automate multi-step workflows with AI agents.',
];

const engagements = [
  {
    icon: FileSearch,
    title: 'AI Discovery & Solution Architecture',
    description: 'Clarify the use case, constraints, data needs, and a practical solution direction.',
  },
  {
    icon: Sparkles,
    title: 'Proof of Concept & Feasibility Assessment',
    description: 'Test key assumptions with a focused prototype and measurable evaluation criteria.',
  },
  {
    icon: Blocks,
    title: 'Custom AI Implementation',
    description: 'Build an application or workflow shaped around your requirements and existing systems.',
  },
  {
    icon: Cloud,
    title: 'Integration, Deployment & Optimization',
    description: 'Connect, deploy, monitor, and refine AI capabilities in the appropriate environment.',
  },
];

export function SolutionsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ink-100 pt-32 sm:pt-36 lg:pt-40">
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 via-white/70 to-white" />
        <div className="mx-auto grid max-w-8xl items-center gap-12 px-6 pb-20 lg:grid-cols-12 lg:px-10 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="mono-label">AI SOLUTIONS · ENGINEERING · IMPLEMENTATION</p>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Practical AI Solutions for Real-World Workflows
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-500">
              Build intelligent applications that extract information, understand media, connect
              knowledge, and automate complex workflows. cloudsandai helps organizations explore,
              prototype, and implement AI solutions aligned with their business needs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
              >
                Discuss Your AI Use Case
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white/80 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
              >
                Explore Solutions
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-sm text-ink-400">
              Solution areas are explored and scoped to fit your use case.
            </p>
          </div>

          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="relative mx-auto max-w-md rounded-3xl border border-ink-200/80 bg-white/90 p-6 shadow-xl shadow-ink-900/5">
              <div className="flex items-center justify-between border-b border-ink-100 pb-4">
                <span className="mono-label">WORKFLOW MAP</span>
                <span className="h-2 w-2 rounded-full bg-accent-500" />
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <FileSearch className="h-5 w-5 text-ink-700" />
                  <p className="mt-3 text-xs font-medium text-ink-700">Business data</p>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-300" />
                <div className="rounded-xl border border-accent-200 bg-accent-50 p-4">
                  <BrainCircuit className="h-5 w-5 text-accent-700" />
                  <p className="mt-3 text-xs font-medium text-ink-700">AI capabilities</p>
                </div>
              </div>
              <div className="my-4 ml-[16%] h-7 border-l border-dashed border-ink-300" />
              <div className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4">
                <Workflow className="h-5 w-5 text-ink-700" />
                <div>
                  <p className="text-xs font-medium text-ink-800">Useful workflow outcome</p>
                  <p className="mt-1 text-xs text-ink-400">Designed around your process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="scroll-mt-24 border-b border-ink-100 py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="mono-label">SOLUTION AREAS</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              AI that fits the work you need to do
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Explore focused capabilities that can be combined, tested, and scoped for a specific
              workflow—not assumed to be off-the-shelf products.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <article
                  key={solution.number}
                  className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-colors hover:border-ink-200 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 text-ink-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.16em] text-ink-300">
                      {solution.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-ink-900">
                    {solution.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {solution.description}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {solution.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-ink-100 pt-5 text-xs leading-relaxed text-ink-500">
                    <span className="font-semibold text-ink-700">Example use cases: </span>
                    {solution.examples}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-100 bg-ink-50/50 py-16 lg:py-20">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="mb-8 max-w-2xl">
            <p className="mono-label">SUPPORTING CAPABILITIES</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Building blocks for practical AI
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {capabilities.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex min-h-16 items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm font-medium text-ink-700"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-ink-100 py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="mono-label">OUR IMPLEMENTATION APPROACH</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              A measured path from idea to implementation
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Start with the problem, test the important assumptions, then decide what is worth
              putting into practice.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {approach.map((step) => (
              <li key={step.number} className="relative rounded-2xl border border-ink-100 bg-white p-6">
                <span className="font-mono text-xs tracking-[0.18em] text-accent-600">{step.number}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-ink-100 bg-ink-50/50 py-20 lg:py-24">
        <div className="mx-auto grid max-w-8xl gap-10 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <p className="mono-label">EXAMPLE APPLICATIONS</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              What could AI help with?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Illustrative possibilities to help frame a conversation—not claims of completed
              customer deployments.
            </p>
          </div>
          <ol className="divide-y divide-ink-200/80 lg:col-span-8">
            {applications.map((application, index) => (
              <li key={application} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                <span className="pt-0.5 font-mono text-xs tracking-[0.15em] text-ink-400">
                  0{index + 1}
                </span>
                <p className="text-base leading-relaxed text-ink-700">{application}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-ink-100 py-20 lg:py-28">
        <div className="mx-auto max-w-8xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="mono-label">ENGAGEMENT MODELS</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              Start with the support you need
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              The right starting point depends on your goals, existing systems, and what you need to
              learn.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {engagements.map(({ icon: Icon, title, description }) => (
              <article key={title} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-snug text-ink-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact
        initialCategory="AI Solutions"
        heading="Have an AI Use Case in Mind?"
        description="Tell us about your workflow, the information you work with, and the outcome you want to achieve. Let's explore a practical approach."
        ctaHref="https://calendly.com/deven-cloudsandai/30min"
        ctaLabel="Discuss Your Use Case"
      />
    </>
  );
}
