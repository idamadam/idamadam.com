import AIHighlightsVignette from '@/components/vignettes/ai-highlights/AIHighlightsVignette';
import AISuggestionsVignette from '@/components/vignettes/ai-suggestions/AISuggestionsVignette';
import PrototypingVignette from '@/components/vignettes/prototyping/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/vibe-coding/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/multilingual/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/home-connect/HomeConnectVignette';
import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SectionHeader from '@/components/SectionHeader';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background text-primary">
      {/* Hero Section */}
      <HeroVignette />

      {/* Vignettes Introduction */}
      <section className="w-full pb-10 lg:pb-12 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto border-t border-gray-200/80 pt-10 lg:pt-12">
          <h2 className="type-h2">
            Selected work from Culture Amp
          </h2>
        </div>
      </section>

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
    </main>
  );
}
