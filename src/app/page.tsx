import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SideProjectsSection from '@/components/SideProjectsSection';
import WorkGridSection from '@/components/WorkGridSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { IntroSequenceProvider } from '@/lib/intro-sequence-context';

export default function Home() {
  return (
    <IntroSequenceProvider>
      <Header />
      <main className="w-full min-h-screen text-primary bg-transparent relative z-10">
        <div>
          {/* Hero Section */}
          <HeroVignette />

          {/* Side Projects - featured */}
          <SideProjectsSection />

          {/* Professional Work - compact grid */}
          <WorkGridSection />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </IntroSequenceProvider>
  );
}
