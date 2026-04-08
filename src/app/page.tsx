import HeroVignette from '@/components/vignettes/hero/HeroVignette';
import SideProjectsSection from '@/components/SideProjectsSection';
import WorkGridSection from '@/components/WorkGridSection';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { IntroSequenceProvider } from '@/lib/intro-sequence-context';

export default function Home() {
  return (
    <IntroSequenceProvider>
      <Header />
      <main className="w-full min-h-screen text-primary bg-transparent relative z-10">
        <div>
          {/* Hero Section */}
          <HeroVignette />

          {/* Work */}
          <section id="work" className="w-full pb-12 lg:pb-20 px-6 lg:px-10 2xl:px-16 scroll-mt-20">
            <div className="max-w-[1408px] mx-auto border-t border-border/60 pt-10 lg:pt-14">
              <SectionTitle disableScrollTrigger>Work</SectionTitle>
            </div>
            <div className="max-w-[1408px] mx-auto mt-8 lg:mt-10 flex flex-col gap-6">
              <SideProjectsSection />
              <WorkGridSection />
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </IntroSequenceProvider>
  );
}
