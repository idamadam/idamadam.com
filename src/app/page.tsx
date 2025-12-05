import PerformanceAIVignette from '@/components/vignettes/PerformanceAIVignette';
import PrototypingVignette from '@/components/vignettes/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/HomeConnectVignette';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full min-h-[85vh] flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#1a1d23] mb-6">
            Idam Adam
          </h1>
          <p className="text-2xl lg:text-3xl text-[#6b7280] mb-3">
            Product designer
          </p>
          <p className="text-2xl lg:text-3xl text-[#6b7280]">
            Maker
          </p>
        </div>
      </section>

      {/* Vignettes Introduction */}
      <section className="w-full py-12 lg:py-16 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1d23] mb-4">
            Selected Work
          </h2>
        </div>
      </section>

      {/* Vignettes Section */}
      <section className="w-full py-12 lg:py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
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
