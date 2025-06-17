export default function PerformanceAI() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Performance AI: Evolving Design Principles for AI-Powered Manager Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 italic">
            From foundational AI explorations to sophisticated, user-validated solutions that established Culture Amp's AI design language
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Overview</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            As Culture Amp entered the AI era, we needed to demonstrate our AI capabilities while solving real manager pain points in performance reviews. I led the design of Performance AI - two interconnected features that evolved our understanding of AI UX through innovative research methodology and technical collaboration. Using synthetic data prototyping and Python-based prompt engineering, I developed systematic approaches to AI feature validation that established design principles now used across the company. The gradient border treatment I designed to signal AI features has become Culture Amp's standard AI visual language.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-gray-900 dark:text-white">My Role:</strong> Lead Product Designer
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">Timeline:</strong> [Duration] - [Time period]
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">Team:</strong> 2 supporting designers, Product Manager, Engineering, Data Science, People Science team
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">The Challenge</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Culture Amp needed to prove our "People Science" leadership in the emerging AI landscape. We identified two critical problems in manager performance reviews where AI could make meaningful impact:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">1. Review Quality Problem</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Managers struggle to write high-quality feedback that follows People Science best practices (specific, impactful, actionable, objective)
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">2. Data Collation Problem</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Managers waste significant time gathering information from multiple sources (Google Docs, Slack, goals, 1-on-1 notes, external KPIs) to build a complete picture of their direct reports
              </p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
            The challenge was designing AI solutions that enhanced human judgment rather than replacing it, while navigating competing stakeholder expectations from ambitious leadership and conservative data science practices. This required developing new research methodologies for testing AI features and building technical capabilities to iterate on prompts and AI outputs directly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Getting deeper into the problem</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I leveraged existing user research from our research team about feedback quality, while conducting my own research on the manager review-writing process to understand the data collation challenge.
          </p>
          
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What I learnt from managers about their review process</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Through interviews and process observation, I discovered:</p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cognitive overhead is massive</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Managers described spending hours just remembering and gathering relevant information about each employee before they could even start writing
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Validation behavior, not creation</h4>
              <p className="text-gray-700 dark:text-gray-300">
                "I use all this context to validate my own viewpoints about this person's performance"
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Time sink frustration</h4>
              <p className="text-gray-700 dark:text-gray-300">
                The collation process was consistently described as the most time-consuming part of review writing
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality awareness gap</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Managers knew their feedback could be better but struggled to identify specific improvements
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Results & Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Suggested Improvements (Phase 1)</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong>80% effectiveness rate</strong> - 80% of feature uses correlated with edits made to reviews, demonstrating clear user value</li>
                <li><strong>Foundational learning</strong> - Established that conservative AI approaches could still deliver meaningful user value</li>
                <li><strong>Design system impact</strong> - Gradient border AI treatment adopted as company-wide standard for AI features</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Highlights & Opportunities (Phase 2)</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong>User validation success</strong> - When provided easy verification tools, 100% of users checked AI work, validating our transparency approach</li>
                <li><strong>Prompt evolution</strong> - User testing revealed need for more detailed themes including projects and metrics</li>
                <li><strong>Scalable architecture</strong> - Designed system to accommodate future data sources and AI capabilities</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Broader organizational impact</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>AI design leadership</strong> - My gradient border treatment became Culture Amp's standard AI visual language</li>
              <li><strong>Cross-team alignment</strong> - Successfully bridged tensions between ambitious leadership and conservative engineering</li>
              <li><strong>Design principle establishment</strong> - Created reusable framework for future AI feature development</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Reflection & Evolution</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            This project taught me that successful AI UX requires balancing multiple tensions:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Early AI adoption lessons</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Phase 1 showed that even conservative AI approaches can deliver user value when designed thoughtfully. The 80% edit rate proved that improvement suggestions, while not revolutionary, provided real utility.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">AI UX maturity</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Phase 2 demonstrated how sophisticated research methodology can dramatically improve AI implementations. By combining synthetic data prototyping with technical prompt engineering, I was able to iterate with both user empathy and technical precision.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Design system thinking</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The gradient border becoming company-wide AI language proved that thoughtful micro-interactions in AI features can scale to influence entire product ecosystems.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <p className="text-gray-600 dark:text-gray-400 italic">
            This case study demonstrates the evolution from cautious AI exploration to sophisticated, user-validated AI UX - establishing principles and visual language that continue to guide Culture Amp's AI product development.
          </p>
        </div>
      </main>
    </div>
  );
}