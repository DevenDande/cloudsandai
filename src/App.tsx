import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { Courses } from '@/components/Courses';
import { Comparison } from '@/components/Comparison';
import { Roadmap } from '@/components/Roadmap';
import { PracticalOutcomes } from '@/components/PracticalOutcomes';
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
import { ResourcesPage } from '@/components/ResourcesPage';
import { SimpleLinearRegressionLab } from '@/components/SimpleLinearRegressionLab';
import { MultipleLinearRegressionLab } from '@/components/MultipleLinearRegressionLab';
import { LogisticClassificationLab } from '@/components/LogisticClassificationLab';
import { DecisionTreeClassificationLab } from '@/components/DecisionTreeClassificationLab';
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

function ComingSoon() {
  return (
    <section className="border-b border-ink-100 py-20 lg:py-28">
      <div className="mx-auto max-w-8xl px-6 text-center lg:px-10">
        <p className="mono-label">Coming soon</p>
      </div>
    </section>
  );
}

function PageMetadata({ path }: { path: string }) {
  const metadata = pageMetadata[path];

  useEffect(() => {
    const canonical = `https://cloudsandai.com${metadata.path}`;
    const ogImage = metadata.ogImage ? `https://cloudsandai.com${metadata.ogImage}` : null;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    if (ogImage) {
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', ogImage);
      document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', metadata.ogImageAlt ?? '');
      document.querySelector('meta[property="og:image:type"]')?.setAttribute('content', 'image/png');
      document.querySelector('meta[property="og:image:width"]')?.setAttribute('content', '1200');
      document.querySelector('meta[property="og:image:height"]')?.setAttribute('content', '630');
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', ogImage);
      document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', metadata.ogImageAlt ?? '');
    }
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:url"]')?.setAttribute('content', canonical);
  }, [metadata]);

  return null;
}

function PageContent({ path }: { path: string }) {
  if (path === '/courses') {
    return (
      <>
        <PageIntro
          title="AI/ML Foundations & AI Engineering"
          description="Two 16-week learning paths: one for beginners starting from zero, and one for Python-ready learners building practical AI applications."
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

  if (path === '/articles') {
    return (
      <>
        <PageIntro
          title="Articles"
          description="Ideas and explanations for understanding machine learning and AI."
        />
        <ComingSoon />
      </>
    );
  }

  if (path === '/resources/simple-linear-regression') {
    return (
      <>
        <PageIntro
          title="Simple Linear Regression: An Interactive Learning Lab"
          description="Understand how a machine learning model learns a line from data, calculates errors, and improves its predictions using gradient descent."
        />
        <SimpleLinearRegressionLab />
      </>
    );
  }

  if (path === '/resources/multiple-linear-regression') {
    return (
      <>
        <PageIntro
          title="Multiple Linear Regression: An Interactive Learning Lab"
          description="Explore how multiple features combine in a linear model, see how feature scaling affects training, and fit predictions with gradient descent."
        />
        <MultipleLinearRegressionLab />
      </>
    );
  }

  if (path === '/resources/logistic-classification') {
    return (
      <>
        <PageIntro
          title="Binary Classification: Logistic Regression"
          description="Explore how logistic regression estimates class probabilities, draws a decision boundary, and turns probabilities into predictions using a threshold."
        />
        <LogisticClassificationLab />
      </>
    );
  }

  if (path === '/resources/decision-tree-classification') {
    return (
      <>
        <PageIntro
          title="Decision Tree Classification: An Interactive Lab"
          description="Explore how decision trees split data into interpretable rules, compare Gini impurity with entropy, and see how tree complexity shapes nonlinear decision regions."
        />
        <DecisionTreeClassificationLab />
      </>
    );
  }

  if (path === '/resources') {
    return (
      <>
        <PageIntro
          title="Resources"
          description="Practical materials to support your machine learning and AI learning."
        />
        <ResourcesPage />
      </>
    );
  }

  return (
    <>
      <Hero />
      <Philosophy />
      <Roadmap />
      <PracticalOutcomes />
      <WhyApproach />
      <Contact />
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
