import VibeCodingVignette from '@/components/vignettes/vibe-coding/VibeCodingVignette';
import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SelectedWorkSection from '@/components/SelectedWorkSection';
import SectionHeader from '@/components/SectionHeader';
import Footer from '@/components/Footer';
import { IntroSequenceProvider } from '@/lib/intro-sequence-context';

export default function Home() {
  return (
    <IntroSequenceProvider>
      <main className="w-full min-h-screen text-primary bg-transparent relative z-10">
        <div>
          {/* Hero Section with Staged Intro */}
          <HeroVignette />

          {/* Selected Work Section - fades in after intro */}
          <SelectedWorkSection />

          {/* Explorations Section Header */}
          <SectionHeader title="Explorations">
            <p className="type-body">
              Personal products I design and build end-to-end. These projects help me
              understand technology at a deeper level while exploring entrepreneurial ideas.
            </p>
          </SectionHeader>

          {/* Explorations Vignettes */}
          <section className="w-full pb-8 lg:pb-12 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <VibeCodingVignette />
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </IntroSequenceProvider>
  );
}
