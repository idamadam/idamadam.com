import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SelectedWorkSection from '@/components/SelectedWorkSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { IntroSequenceProvider } from '@/lib/intro-sequence-context';

export default function Home() {
  return (
    <IntroSequenceProvider>
      <Header />
      <main className="w-full min-h-screen text-primary bg-transparent relative z-10">
        <div>
          {/* Hero Section with Staged Intro */}
          <HeroVignette />

          {/* Selected Work - interactive vignettes */}
          <SelectedWorkSection />

          {/* Footer - contact & closing */}
          <Footer />
        </div>
      </main>
    </IntroSequenceProvider>
  );
}
