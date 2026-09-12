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

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Courses />
        <Comparison />
        <Roadmap />
        <Curriculum />
        <Webinars />
        <DeepLearning />
        <WhyApproach />
        <About />
        <WhoFor />
        <CourseSelection />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
