import VibeCodingVignette from '@/components/vignettes/vibe-coding/VibeCodingVignette';
import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SelectedWorkSection from '@/components/SelectedWorkSection';
import SectionHeader from '@/components/SectionHeader';
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

          {/* Selected Work Section - fades in after intro */}
          <SelectedWorkSection />

          {/* Side Projects Section Header */}
          <SectionHeader title="Side projects" />

          {/* Side Projects Vignettes */}
          <section className="w-full pb-8 lg:pb-12 px-6 lg:px-12 2xl:px-24">
            <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 lg:gap-8">
              <div className="col-span-12 md:col-span-6">
                <VibeCodingVignette />
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </IntroSequenceProvider>
  );
}
