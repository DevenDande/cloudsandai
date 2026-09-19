import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { Courses } from '@/components/Courses';
import { Comparison } from '@/components/Comparison';
import { Roadmap } from '@/components/Roadmap';
import { Curriculum } from '@/components/Curriculum';
import { Webinars } from '@/components/Webinars';
import { DeepLearning } from '@/components/DeepLearning';
import { WhyApproach } from '@/components/WhyApproach';
import { About } from '@/components/About';
import { WhoFor } from '@/components/WhoFor';
import { CourseSelection } from '@/components/CourseSelection';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { normalizePath, pageMetadata } from '@/seo';

function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <section className="border-b border-ink-100 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <p className="mono-label">cloudsandai</p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">{description}</p>
      </div>
    </section>
  );
}

function PageMetadata({ path }: { path: string }) {
  const metadata = pageMetadata[path];

  useEffect(() => {
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://cloudsandai.com${metadata.path}`);
  }, [metadata]);

  return null;
}

function PageContent({ path }: { path: string }) {
  if (path === '/courses') {
    return (
      <>
        <PageIntro
          title="Machine Learning & Deep Learning Courses"
          description="Structured, instructor-led programs that bring mathematics, statistics, programming and implementation together."
        />
        <Courses />
        <Comparison />
        <Curriculum />
        <Webinars />
        <DeepLearning />
        <CourseSelection />
        <FinalCTA />
      </>
    );
  }

  if (path === '/about') {
    return (
      <>
        <PageIntro
          title="About cloudsandai"
          description="A foundations-first, instructor-led learning initiative focused on mathematics, statistics, programming, scientific computing, machine learning and deep learning."
        />
        <Philosophy />
        <About />
        <WhoFor />
        <FinalCTA />
      </>
    );
  }

  if (path === '/contact') {
    return (
      <>
        <PageIntro
          title="Contact cloudsandai"
          description="Have questions about the curriculum or which learning path is right for you? Get in touch with Deven."
        />
        <Contact />
      </>
    );
  }

  return (
    <>
      <Hero />
      <Philosophy />
      <Roadmap />
      <WhyApproach />
      <Contact compact />
      <FAQ />
      <FinalCTA />
    </>
  );
}

export default function App({ pathname }: { pathname?: string }) {
  const path = normalizePath(pathname ?? (typeof window === 'undefined' ? '/' : window.location.pathname));

  return (
    <div className="min-h-screen bg-white">
      <PageMetadata path={path} />
      <Navbar />
      <main><PageContent path={path} /></main>
      <Footer />
    </div>
  );
}
