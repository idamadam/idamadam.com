import PerformanceAIVignette from '@/components/vignettes/PerformanceAIVignette';
import PrototypingVignette from '@/components/vignettes/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/HomeConnectVignette';
import ShaderBackground from '@/components/ShaderBackground';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full min-h-[85vh] flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl w-full">
          <ShaderBackground />
          <div className="mt-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-[#1a1d23] mb-6">
              Idam Adam
            </h1>
            <p className="text-2xl lg:text-3xl text-[#6b7280] mb-3">
              Product designer <br />
              Maker
            </p>
          </div>
        </div>
      </section>

      {/* Vignettes Introduction */}
      <section className="w-full py-12 lg:py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto border-t border-gray-200 pt-12 lg:pt-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1d23] mb-4">
            Selected Work
          </h2>
        </div>
      </section>

      {/* Vignettes Section */}
      <section className="w-full py-12 lg:py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12 lg:space-y-16">
          <PerformanceAIVignette />
          <PrototypingVignette />
          <VibeCodingVignette />
          <MultilingualVignette />
          <HomeConnectVignette />
        </div>
      </section>
    </main>
  );
}
