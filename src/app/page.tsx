import AIHighlightsVignette from '@/components/vignettes/ai-highlights/AIHighlightsVignette';
import AISuggestionsVignette from '@/components/vignettes/ai-suggestions/AISuggestionsVignette';
import PrototypingVignette from '@/components/vignettes/prototyping/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/vibe-coding/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/multilingual/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/home-connect/HomeConnectVignette';
import ShaderBackground from '@/components/ShaderBackground';
import SectionHeader from '@/components/SectionHeader';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white text-[#0f172a]">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12">
        <div className="relative max-w-5xl w-full mx-auto">
          <ShaderBackground />
          <div className="space-y-5 lg:space-y-7">
            <h1 className="text-[clamp(44px,8vw,72px)] leading-[0.95] tracking-[-0.04em] font-bold text-[#0f172a]">
              Idam Adam
            </h1>
            <p className="text-[clamp(18px,3vw,22px)] leading-[1.6] text-[#4b5563] max-w-2xl">
              Product designer · Maker
            </p>
          </div>
        </div>
      </section>

      {/* Vignettes Introduction */}
      <SectionHeader title="Selected Work">
        <p className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl">
          Product design at Culture Amp
        </p>
        <p className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl">
          I&apos;m a big believer in showing rather than telling, so I prototype until ideas feel
          real. Click through and play with each feature—these vignettes are built to be tried, not
          just read about.
        </p>
      </SectionHeader>

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
        <p className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl">
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
