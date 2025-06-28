import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-hero mb-6">
            Hi, I'm Idam Adam
          </h1>
          <p className="text-h3 mb-6 leading-relaxed">
            I'm a Product Designer with 8 years of experience creating intuitive web and mobile products that solve complex business problems through user-centered design.
          </p>
          <p className="text-body mb-6 leading-relaxed">
            I excel at diving into murky, complex problem spaces to create simple and elegant design solutions backed with evidence. My approach combines deep user research, technical collaboration, and systematic design thinking to deliver measurable impact. I thrive in team environments that value frequent shipping, high trust and autonomy.
          </p>
          <p className="text-body mb-8 leading-relaxed">
            I'm fluent in programming languages and technical frameworks - including Python for AI prompt engineering - which allows me to communicate effectively with engineering teams and directly contribute to technical problem-solving.
          </p>
          <p className="text-body mb-12 leading-relaxed">
            Currently, I'm a Lead Product Designer at Culture Amp, where I've led the design of AI-powered features, platform integration systems, and multilingual workflows. My background includes roles at MYOB, Canstar, and Netengine.
          </p>
        </div>

        <section>
          <h2 className="text-h1">
            Selected Projects
          </h2>
          
          <div className="space-y-8">
            <div className="border rounded-lg p-6 transition-colors">
              <Link href="/performance-ai" className="block">
                <h3 className="text-h3 mb-3">
                  Performance AI: Evolving Design Principles for AI-Powered Manager Tools
                </h3>
                <p className="mb-3">
                  Led the design of Culture Amp's first AI features for performance reviews, establishing company-wide AI design principles and visual language. Created systematic approaches to AI feature validation using synthetic data prototyping and Python-based prompt engineering.
                </p>
                <p className="text-caption font-medium">
                  <strong>Impact:</strong> 80% feature effectiveness rate, established AI design standards adopted company-wide
                </p>
              </Link>
            </div>

            <div className="border rounded-lg p-6 transition-colors">
              <Link href="/multilingual" className="block">
                <h3 className="text-h3 mb-3">
                  Multilingual Performance Reviews
                </h3>
                <p className="mb-3">
                  Designed Culture Amp's first comprehensive translation management system to address the #3 reason for customer churn. Created research-driven workflows that supported existing customer mental models while reducing operational complexity.
                </p>
                <p className="text-caption font-medium">
                  <strong>Impact:</strong> Retained $1M+ ARR customer, enabled 4,000+ multilingual reviews with minimal support overhead
                </p>
              </Link>
            </div>

            <div className="border rounded-lg p-6 transition-colors">
              <Link href="/one-on-ones" className="block">
                <h3 className="text-h3 mb-3">
                  1-on-1s on Home
                </h3>
                <p className="mb-3">
                  Increased 1-on-1 adoption by bringing manager workflows to the homepage, linking adoption goals to core human problems through evidence-based design.
                </p>
                <p className="text-caption font-medium">
                  <strong>Impact:</strong> 255% increase in first-time 1-on-1 scheduling, 54% increase in homepage engagement
                </p>
              </Link>
            </div>

            <div className="border rounded-lg p-6 transition-colors">
              <Link href="/home-connect" className="block">
                <h3 className="text-h3 mb-3">
                  Home Connect
                </h3>
                <p className="mb-3">
                  Created a scalable homepage system to improve Culture Amp's platform cohesion and navigation challenges identified through customer research and churn analysis.
                </p>
                <p className="text-caption font-medium">
                  <strong>Impact:</strong> Addressing low adoption rates and navigation difficulties contributing to customer churn
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
