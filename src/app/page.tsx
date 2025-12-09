import PerformanceAIVignette from '@/components/vignettes/PerformanceAIVignette';
import PrototypingVignette from '@/components/vignettes/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/HomeConnectVignette';
import ShaderBackground from '@/components/ShaderBackground';

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
      <section className="w-full pb-10 lg:pb-12 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto border-t border-gray-200/80 pt-10 lg:pt-12 space-y-2">
          <h2 className="text-[24px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#0f172a]">
            Selected Work
          </h2>
          <p className="text-[17px] leading-[1.6] text-[#4b5563]">
            Product design at Culture Amp
          </p>
        </div>
      </section>

      {/* Vignettes Section */}
      <section className="w-full pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-12 lg:space-y-14">
          <PerformanceAIVignette />
          <PrototypingVignette />
          <MultilingualVignette />
          <HomeConnectVignette />
        </div>
      </section>

      {/* Explorations Section Header */}
      <section className="w-full pb-10 lg:pb-12 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto border-t border-gray-200/80 pt-10 lg:pt-12 space-y-3">
          <h2 className="text-[24px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#0f172a]">
            Explorations
          </h2>
          <p className="text-[17px] leading-[1.6] text-[#4b5563] max-w-3xl">
            Personal products I design and build end-to-end. These projects help me
            understand technology at a deeper level while exploring entrepreneurial ideas.
          </p>
        </div>
      </section>

      {/* Explorations Vignettes */}
      <section className="w-full pb-20 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-12 lg:space-y-14">
          <VibeCodingVignette />
        </div>
      </section>
    </main>
  );
}
