import PerformanceAIVignette from '@/components/vignettes/PerformanceAIVignette';
import PrototypingVignette from '@/components/vignettes/PrototypingVignette';
import VibeCodingVignette from '@/components/vignettes/VibeCodingVignette';
import MultilingualVignette from '@/components/vignettes/MultilingualVignette';
import HomeConnectVignette from '@/components/vignettes/HomeConnectVignette';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* Left Sidebar - Fixed on desktop, static on mobile */}
      <aside className="w-full lg:w-1/3 lg:fixed lg:left-0 lg:top-0 lg:h-screen bg-white flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1a1d23] mb-4">
            Idam Adam
          </h1>
          <p className="text-lg lg:text-xl text-[#6b7280] mb-2">
            Product designer
          </p>
          <p className="text-lg lg:text-xl text-[#6b7280]">
            Good at computers
          </p>
        </div>
      </aside>

      {/* Right Content Area - Scrollable */}
      <div className="w-full lg:w-2/3 lg:ml-[33.333%] bg-white">
        <div className="py-12 lg:py-20 px-6 lg:px-12 space-y-12 lg:space-y-16">
          <PerformanceAIVignette />
          <PrototypingVignette />
          <VibeCodingVignette />
          <MultilingualVignette />
          <HomeConnectVignette />
        </div>
      </div>
    </main>
  );
}
