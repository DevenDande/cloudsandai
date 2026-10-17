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
import { courseFaqItems, homepageFaqItems } from '@/data/curriculum';
import { Contact } from '@/components/Contact';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ResourcesPage } from '@/components/ResourcesPage';
import { SimpleLinearRegressionLab } from '@/components/SimpleLinearRegressionLab';
import { MultipleLinearRegressionLab } from '@/components/MultipleLinearRegressionLab';
import { LogisticClassificationLab } from '@/components/LogisticClassificationLab';
import { DecisionTreeClassificationLab } from '@/components/DecisionTreeClassificationLab';
import { LabsPage } from '@/components/LabsPage';
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
    const canonical = `https://cloudsandai.com${metadata.path}`;
    const ogImage = metadata.ogImage ? `https://cloudsandai.com${metadata.ogImage}` : null;
    const ogImageType = metadata.ogImage ? 'image/png' : 'image/jpeg';
    const ogImageWidth = 1200;
    const ogImageHeight = metadata.ogImage ? 630 : 1500;
    document.title = metadata.title;
    document.querySelector('meta[name="title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    if (ogImage) {
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', ogImage);
      document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', metadata.ogImageAlt ?? '');
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', ogImage);
      document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', metadata.ogImageAlt ?? '');
    }
    document.querySelector('meta[property="og:image:type"]')?.setAttribute('content', ogImageType);
    document.querySelector('meta[property="og:image:width"]')?.setAttribute('content', String(ogImageWidth));
    document.querySelector('meta[property="og:image:height"]')?.setAttribute('content', String(ogImageHeight));
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
          title="Structured AI & Machine Learning Programs"
          description="The 16-week AI/ML Foundations and AI Engineering programs are paid, instructor-led options for learners seeking a structured path. Explore their curricula, workshops and limited-seat cohorts; tutorials and interactive resources remain free."
        />
        <Courses />
        <Comparison />
        <Curriculum />
        <Webinars />
        <DeepLearning />
        <CourseSelection />
        <FAQ items={courseFaqItems} />
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

  if (path === '/labs') {
    return (
      <>
        <PageIntro
          title="Interactive AI & Cloud Engineering Labs"
          description="Explore free machine learning labs available today and the vision for future advanced simulations, model-training experiments and AI/cloud engineering labs."
        />
        <LabsPage />
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
      <ResourcesPage />
      <Philosophy />
      <Roadmap />
      <PracticalOutcomes />
      <WhyApproach />
      <Contact />
      <FAQ items={homepageFaqItems} />
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
      <WhatsAppButton />
    </div>
  );
}
