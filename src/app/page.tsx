import AIHighlightsVignette from '@/components/vignettes/ai-highlights/AIHighlightsVignette';
import AISuggestionsVignette from '@/components/vignettes/ai-suggestions/AISuggestionsVignette';
import PrototypingVignette from '@/components/vignettes/prototyping/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/vibe-coding/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/multilingual/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/home-connect/HomeConnectVignette';
import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SectionHeader from '@/components/SectionHeader';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <main className="w-full min-h-screen text-primary bg-transparent relative z-10">
      <div>
        {/* Hero Section */}
        <HeroVignette />

        {/* Vignettes Introduction */}
        <SectionTitle>Selected work from Culture Amp</SectionTitle>

        {/* Vignettes Section */}
        <section className="w-full pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-12 lg:space-y-14">
            <AIHighlightsVignette />
            <AISuggestionsVignette />
            <PrototypingVignette />
            <MultilingualVignette />
            <HomeConnectVignette />
          </div>
        </section>

        {/* Explorations Section Header */}
        <SectionHeader title="Explorations">
          <p className="type-body">
            Personal products I design and build end-to-end. These projects help me
            understand technology at a deeper level while exploring entrepreneurial ideas.
          </p>
        </SectionHeader>

        {/* Explorations Vignettes */}
        <section className="w-full pb-20 lg:pb-28 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-12 lg:space-y-14">
            <VibeCodingVignette />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
