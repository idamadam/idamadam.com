export default function Multilingual() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-hero mb-4 text-primary">
            Multilingual performance reviews
          </h1>
          <p className="text-h3 text-tertiary italic">
            Reducing customer churn through research-driven translation workflows
          </p>
        </div>

        {/* Hero Image - Before/After Workflow Comparison */}
        <div className="mb-12">
          <div className="bg-surface rounded-lg p-8">
            <div className="text-center text-secondary text-body font-medium mb-6">
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

        <section className="mb-12">
          <h2 className="text-h2 mb-6 text-primary">Overview</h2>
          <p className="text-body text-secondary mb-6">
            When multilingual performance reviews became the #3 reason for customer churn, I led the design of Culture Amp's first comprehensive translation management system. Through user research and iterative design, I created an intuitive workflow that retained a $1M+ ARR customer and enabled 4,000+ multilingual reviews with minimal support overhead.
          </p>
          <p>
            <strong className="text-primary">My Role:</strong> Lead Product Designer<br />
            <strong className="text-primary">Timeline:</strong> 2 months - Q4 2024<br />
            <strong className="text-primary">Team:</strong> Product Manager, 2 Engineers
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-h2 mb-6 text-primary">The Challenge</h2>
          <p className="text-body text-secondary mb-6">
            Multilingual performance reviews ranked as the #3 reason for customer churn and limited EMEA market growth. As Lead Product Designer, I needed to create a solution that went beyond basic translation management.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-h2 mb-6 text-primary">Getting deeper into the problem</h2>
          <p className="text-body text-secondary mb-6">
            To get started, I wanted to learn more about how our customers were running Performance Cycles in multiple languages. I conducted 10 interviews with customers to learn more about how they run their process. In addition to learning more about the process, I took a first cut prototype of what I assumed the process could look like to get customer feedback.
          </p>

          <h3 className="text-h3 mb-6 text-primary">What I learnt</h3>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-body font-semibold mb-3 text-primary">1. Machine translations are deeply embedded into the process</h4>
              <blockquote className="text-tertiary italic mb-4 border-l-2 border-subtle pl-4">
                "We run everything through Google Translate, then had HRBPs validate the translations." — HR Director, global manufacturing company
              </blockquote>
              <p className="text-secondary">
                I initially thought machine translations might be too risky for performance reviews due to potential mistranslations. What I found was that admins actually used machine translations to get started, then validated them through local staff.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-body font-semibold mb-3 text-primary">2. Admins used spreadsheets to manage translations for their cycles</h4>
              <p className="text-secondary mb-4">
                Building on the first insight, I learnt that admins were using spreadsheets as a way to manage, collaborate and distribute translations between the various different offices that they needed to manage.
              </p>
              <p className="text-secondary mb-2">Their current workflow looked something like:</p>
              <ul className="list-disc list-inside text-secondary space-y-1 ml-4">
                <li>Finalise their questions in their language (mostly English)</li>
                <li>Translate their questions to each language using machine translation</li>
                <li>Distribute automatically translated languages via a spreadsheet to verify with local offices</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-body font-semibold mb-3 text-primary">3. Cross-lingual reviews important but rare</h4>
              <p className="text-secondary">
                I was also concerned about reporting relationships that might involve multiple languages. The interviews revealed that whilst this situation happened, it was a rare situation even in large organisation. This helped us decide to deal with this situation in a later release, helping to sharpen the focus of our initial release.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-body font-semibold mb-3 text-primary">4. Customers locked in questions first, and then handled translations</h4>
              <p className="text-secondary">
                I initially thought customers would want to manage questions and translations together to reduce complexity. The interviews showed me they actually think of these as separate steps—questions get approved first, then translated. This helped me decide on the structure of the multilingual workflow (e.g. questions first, then followed by translations.)
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-h2 mb-6 text-primary">Design Process & Iteration</h2>
          <p className="text-body text-secondary mb-6">
            Based on my research insights, I focused on three core design principles:
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

          <div className="bg-surface p-6 rounded-lg">
            <h3 className="text-body font-semibold mb-3 text-primary">Advocating for expanded scope</h3>
            <p className="text-secondary">
              The initial feature brief focused only on manual translations. However, my research revealed customers were already using Google Translate and spreadsheets as workarounds. I advocated to expand the scope to include both Google Translate integration and Excel import/export functionality. This research-driven advocacy transformed the feature from a basic translation input to a comprehensive workflow that matched how customers actually worked.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-h2 mb-6 text-primary">Key design details</h2>
          <p className="text-body text-secondary mb-6">
            I designed additions to our existing flow to make adding translations seamless and super easy. The intention of my design was to reduce what was a laborious and convoluted process to something that could be completed in a few clicks and fit into their existing workflow.
          </p>

          <div className="space-y-8">
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
              <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                <li><strong>Manual translations</strong> - I designed an enhanced input that allows you to see the text of the default language the questions were written in while writing translations</li>
                <li><strong>Google Translate</strong> - Complete translations using a couple of clicks</li>
                <li><strong>Import/export Excel</strong> - Allow admins to manage and edit translations in bulk via their preferred method, spreadsheet</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-h2 mb-6 text-primary">Results & Impact</h2>
          <p className="text-body text-secondary mb-6">
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
              The low support ticket volume was particularly validating. By matching customers' existing mental models (questions first, then translations), I created an intuitive experience that didn't require extensive training or support.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
