export default function Multilingual() {
  return (
    <div className="case-study-container">
      <main className="case-study-content">
        <div className="case-study-subsection">
          <h1 className="text-hero text-primary">
            Multilingual performance reviews
          </h1>
          <p className="text-h3 text-tertiary italic">
            Reducing customer churn through research-driven translation workflows
          </p>
        </div>

        {/* Hero Image - Before/After Workflow Comparison */}
        <div className="case-study-section">
          <div className="bg-surface rounded-lg p-8">
            <div className="text-center text-secondary text-body font-medium case-study-item">
              Turning a time-intensive workflow to a simple one.
            </div>
            <div className="flex justify-center">
              <img 
                src="/illustration.svg" 
                alt="Before and after comparison showing transformation from fragmented spreadsheet workflow to integrated Culture Amp platform"
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </div>
        </div>

        <section className="case-study-section">
          <h2 className="text-h2 text-primary">Overview</h2>
          <p className="text-body text-secondary case-study-item">
            When multilingual performance reviews became the #3 reason for customer churn, I led the design of Culture Amp's first comprehensive translation management system for Performance Reviews. Through user research and iterative design, I created an intuitive workflow that retained a $1M+ ARR customer and enabled 4,000+ multilingual reviews with minimal support overhead.
          </p>
          <div>
            <p><strong className="text-primary">My Role:</strong> Lead Product Designer</p>
            <p><strong className="text-primary">Timeline:</strong> 2 months - Q4 2024</p>
            <p><strong className="text-primary">Team:</strong> Product Manager, 2 Engineers</p>
          </div>
        </section>

        <section className="case-study-section">
          <h2 className="text-h2 text-primary">Breaking down assumptions</h2>
          <p className="text-body text-secondary case-study-item">
            Ten customer interviews challenged my assumptions and helped me better understand the multilingual performance review problem space.
          </p>          
          <div className="section-spacing">
            <div>
              <h4 className="text-body font-semibold mb-3 text-primary">I assumed machine translation was too risky for HR</h4>
              <div className="bg-surface p-4 rounded-lg mb-4">
                <p className="text-primary font-medium mb-2">Reality:</p>
                <blockquote className="text-secondary italic border-l-2 border-secondary pl-4">
                  "We run everything through Google Translate, then had HRBPs validate the translations." — HR Director, global manufacturing company
                </blockquote>
              </div>
              <p className="text-secondary">
                Going into research, I assumed that HR admins would be wary of machine translations due to quality concerns for performance reviews. What I discovered was that everyone was already using them, but leveraging their local teams as quality control. They weren't avoiding machine translation; they were building efficient workflows around it with human validation, often using spreadsheets to collaborate with local offices and distribute translations for review.
              </p>
            </div>

            <div>
              <h4 className="text-body font-semibold mb-3 text-primary">I thought cross-language reporting would be a big problem to solve</h4>
              <div className="bg-surface p-4 rounded-lg mb-4">
                <p className="text-primary font-medium">Reality: It rarely happened, even in global organizations</p>
              </div>
              <p className="text-secondary">
                I worried this would be a major workflow challenge. Cross-language reviews seemed complex to design for. The interviews revealed this happened less than expected, usually in senior leadership situations. This let us focus on the common use case instead of over-engineering for rare scenarios.
              </p>
            </div>

            <div>
              <h4 className="text-body font-semibold mb-3 text-primary">I assumed customers would want questions and translations managed together</h4>
              <div className="bg-surface p-4 rounded-lg mb-4">
                <p className="text-primary font-medium">Reality: They naturally separated question approval from translation</p>
              </div>
              <p className="text-secondary">
                My initial prototypes tried to enable language switching while writing questions to reduce complexity. Customers consistently told me they locked in questions first, got approvals, then handled translations as a separate phase. Fighting this mental model would have created friction where none existed.
              </p>
            </div>
          </div>
        </section>

        <section className="case-study-section">
          <h2 className="text-h2 text-primary">Design principles - backed by research</h2>
          <p className="text-body text-secondary case-study-item">
            These research insights changed everything. I advocated to expand scope from basic manual translations to include Google Translate integration and Excel import/export functionality. The feature transformed from a simple translation input to a comprehensive workflow that matched how customers actually worked. This led me to focus on three core design principles:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">Match existing mental models</h3>
              <p className="text-secondary">Separate questions setup from translation management</p>
            </div>
            <div className="bg-surface p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">Support existing workflows</h3>
              <p className="text-secondary">Enable spreadsheet import/export for collaboration</p>
            </div>
            <div className="bg-surface p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">Reduce friction</h3>
              <p className="text-secondary">Integrate machine translation while allowing manual refinement</p>
            </div>
          </div>
        </section>

        <section className="case-study-section">
          <h2 className="text-h2 text-primary">Key design details</h2>
          <p className="text-body text-secondary case-study-item">
            I designed additions to our existing flow to make adding translations seamless and super easy. The intention of my design was to reduce what was a laborious and convoluted process to something that could be completed in a few clicks and fit into their existing workflow.
          </p>

          <div className="section-spacing">
            <div className="border border-subtle rounded-lg p-6">
              <h3 className="text-h3 mb-4 text-primary">1. Language picker</h3>
              <p className="text-secondary">
                At the start of the flow, there's a "Language" collapsible. This collapsible allowed people to see that you could add more than 1 language, but you didn't need to engage with it unless you needed to. When the collapsible opened, customers could select their "default language" and then select from 140+ languages as additional languages.
              </p>
            </div>

            <div className="border border-subtle rounded-lg p-6">
              <h3 className="text-h3 mb-4 text-primary">2. Translations view</h3>
              <p className="text-secondary mb-4">
                A new view that functions as an extension of the existing "questions" view in our workflow. This allows you to edit translations in 3 ways:
              </p>
              <ul className="list-disc list-inside text-secondary tight-spacing ml-4">
                <li><strong>Manual translations</strong> - I designed an enhanced input that allows you to see the text of the default language the questions were written in while writing translations</li>
                <li><strong>Google Translate</strong> - Complete translations using a couple of clicks</li>
                <li><strong>Import/export Excel</strong> - Allow admins to manage and edit translations in bulk via their preferred method, spreadsheet</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="case-study-section">
          <h2 className="text-h2 text-primary">Results & Impact</h2>
          <p className="text-body text-secondary case-study-item">
            The results validated my research-driven approach:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-success/20 p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">Customer Retention</h3>
              <p className="text-secondary">
                Retained a major $1M+ ARR customer who was considering churning due to multilingual limitations
              </p>
            </div>
            
            <div className="bg-success/20 p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">Usage Success</h3>
              <p className="text-secondary">
                4,000+ multilingual reviews completed since launch
              </p>
            </div>
            
            <div className="bg-success/20 p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">Support Efficiency</h3>
              <p className="text-secondary">
                Minimal support tickets related to the feature, indicating intuitive workflow design
              </p>
            </div>
            
            <div className="bg-success/20 p-6 rounded-lg">
              <h3 className="text-body font-semibold mb-3 text-primary">User Adoption</h3>
              <p className="text-secondary">
                Strong user adoption with customers successfully managing translations across multiple languages
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-surface p-6 rounded-lg">
            <p className="text-secondary">
              The low support ticket volume was particularly validating. By matching customers' existing mental models of questions first, then translations, I created an intuitive experience that didn't require extensive training or support.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
