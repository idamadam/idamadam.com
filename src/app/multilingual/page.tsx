'use client';

import { useState, useEffect } from 'react';

export default function Multilingual() {
  const [activeView, setActiveView] = useState('before');
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const translations = [
    { text: "Multilingual performance reviews", lang: "English" },
    { text: "Évaluations de performance multilingues", lang: "Français" },
    { text: "Evaluaciones de rendimiento multilingües", lang: "Español" },
    { text: "多言語パフォーマンスレビュー", lang: "日本語" },
    { text: "多语言绩效评估", lang: "中文" },
    { text: "Mehrsprachige Leistungsbeurteilungen", lang: "Deutsch" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animate between languages
    const languageInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentLanguage(prev => (prev + 1) % translations.length);
        setIsAnimating(false);
      }, 350); // Half of animation duration
    }, 2500);
    
    // Animate before/after workflow
    const workflowInterval = setInterval(() => {
      setActiveView(prev => prev === 'before' ? 'after' : 'before');
    }, 4000);
    
    return () => {
      clearInterval(languageInterval);
      clearInterval(workflowInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <div className="relative mb-8">
            <h1 className={`text-6xl md:text-8xl font-light text-gray-900 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="relative min-h-[6rem] md:min-h-[8rem] flex items-center justify-center overflow-hidden">
                <span className={`transition-all duration-700 ease-in-out transform inline-block ${
                  isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                  {translations[currentLanguage].text}
                </span>
              </div>
            </h1>
            
            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 transition-all duration-500 ${
              isVisible ? 'opacity-60' : 'opacity-0'
            }`}>
              {translations[currentLanguage].lang}
            </div>
          </div>
          
          <p className={`text-2xl md:text-3xl text-gray-600 font-light leading-relaxed transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Reducing customer churn through research-driven translation workflows
          </p>
          
          {/* Product Preview Section */}
          <div className={`mt-16 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="relative max-w-4xl mx-auto">
              {/* Main Product Image/Video Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
                  {/* Placeholder for actual product screenshot/video */}
                  <div className="text-center space-y-6">
                    <div className="text-8xl">🌐</div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light text-gray-900">Culture Amp Translation System</h3>
                      <p className="text-gray-600">Interactive workflow demonstration</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-500">Click to play demo</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Elements for Context */}
                <div className="absolute top-6 left-6 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Live Translation</span>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">6 Languages</span>
                    <div className="text-sm">🌍</div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl px-6 py-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="text-sm">⚡</div>
                    <span className="text-sm text-gray-700">2-3 hours vs 2-3 weeks</span>
                  </div>
                </div>
              </div>
              
              {/* Supporting Images/Screenshots */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl mb-3 text-center">📝</div>
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Translation Editor</h4>
                    <p className="text-xs text-gray-600">Real-time editing</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl mb-3 text-center">🤖</div>
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Google Translate</h4>
                    <p className="text-xs text-gray-600">One-click integration</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 col-span-2 md:col-span-1">
                  <div className="text-3xl mb-3 text-center">📊</div>
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Excel Export</h4>
                    <p className="text-xs text-gray-600">Bulk management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-8">
        {/* Project Overview Module */}
        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">Overview</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                When multilingual performance reviews became the #3 reason for customer churn, I led the design of Culture Amp's first comprehensive translation management system for Performance Reviews.
              </p>
              <div className="space-y-4 text-lg text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">Role:</span>
                  <span>Lead Product Designer</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">Timeline:</span>
                  <span>2 months - Q4 2024</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">Team:</span>
                  <span>Product Manager, 2 Engineers</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 flex items-center justify-center shadow-xl">
                <div className="text-center space-y-6">
                  <div className="text-6xl">🌐</div>
                  <div className="text-2xl font-medium text-gray-900">$1M+ ARR</div>
                  <div className="text-gray-600">Customer retained</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Comparison Section */}
        <section className="py-24 bg-gray-50 -mx-8 px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">The Challenge</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Turning a time-intensive workflow into a simple one.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-red-100 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-light text-gray-900 mb-8">Before</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></span>
                      <span>Manual export from Culture Amp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></span>
                      <span>Email spreadsheets to local teams</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></span>
                      <span>Wait for translated versions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></span>
                      <span>Manual import back to platform</span>
                    </div>
                  </div>
                  <div className="mt-8 text-2xl font-light text-red-600">2-3 weeks</div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-green-100 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-6">✨</div>
                  <h3 className="text-2xl font-light text-gray-900 mb-8">After</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></span>
                      <span>One-click Google Translate integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></span>
                      <span>Built-in collaborative editing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></span>
                      <span>Excel import/export when needed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></span>
                      <span>Live preview in multiple languages</span>
                    </div>
                  </div>
                  <div className="mt-8 text-2xl font-light text-green-600">2-3 hours</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Breaking down assumptions</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ten customer interviews challenged my assumptions and helped me better understand the multilingual performance review problem space.
            </p>
          </div>          
          
          <div className="space-y-16 max-w-4xl mx-auto">
            {/* Research Insight 1 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start gap-8">
                  <div className="text-6xl flex-shrink-0">🤖</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-light text-gray-900 mb-6">I assumed machine translation was too risky for HR</h4>
                    <div className="bg-blue-50 p-6 rounded-2xl mb-6 border border-blue-100">
                      <p className="text-blue-600 font-medium mb-3">💡 Reality:</p>
                      <blockquote className="text-gray-700 italic border-l-4 border-blue-400 pl-4 text-lg">
                        "We run everything through Google Translate, then had HRBPs validate the translations." — HR Director, global manufacturing company
                      </blockquote>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Going into research, I assumed that HR admins would be wary of machine translations due to quality concerns for performance reviews. What I discovered was that everyone was already using them, but leveraging their local teams as quality control.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Insight 2 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start gap-8">
                  <div className="text-6xl flex-shrink-0">🌐</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-light text-gray-900 mb-6">I thought cross-language reporting would be a big problem to solve</h4>
                    <div className="bg-green-50 p-6 rounded-2xl mb-6 border border-green-100">
                      <p className="text-green-600 font-medium">💡 Reality: It rarely happened, even in global organizations</p>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      I worried this would be a major workflow challenge. Cross-language reviews seemed complex to design for. The interviews revealed this happened less than expected, usually in senior leadership situations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Insight 3 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start gap-8">
                  <div className="text-6xl flex-shrink-0">🔄</div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-light text-gray-900 mb-6">I assumed customers would want questions and translations managed together</h4>
                    <div className="bg-purple-50 p-6 rounded-2xl mb-6 border border-purple-100">
                      <p className="text-purple-600 font-medium">💡 Reality: They naturally separated question approval from translation</p>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      My initial prototypes tried to enable language switching while writing questions to reduce complexity. Customers consistently told me they locked in questions first, got approvals, then handled translations as a separate phase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles Section */}
        <section className="py-24 bg-gray-50 -mx-8 px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Design principles - backed by research</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              These research insights changed everything. I advocated to expand scope from basic manual translations to include Google Translate integration and Excel import/export functionality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {/* Principle 1 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center h-full">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🧠</div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">Match existing mental models</h3>
                <p className="text-gray-600 leading-relaxed">
                  Separate questions setup from translation management
                </p>
              </div>
            </div>
            
            {/* Principle 2 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center h-full">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🔄</div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">Support existing workflows</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enable spreadsheet import/export for collaboration
                </p>
              </div>
            </div>
            
            {/* Principle 3 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center h-full">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">Reduce friction</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrate machine translation while allowing manual refinement
                </p>
              </div>
            </div>
          </div>
          
          {/* Impact Statement */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-2xl">🎯</div>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">The result</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  A feature that didn't just solve the translation problem, but actually improved upon customers' existing workflows while maintaining their established mental models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Design Details Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Key design details</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              I designed additions to our existing flow to make adding translations seamless and super easy.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌐</div>
                    <div className="text-2xl font-light text-gray-900">Language Picker</div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-light text-gray-900 mb-6">1. Language picker</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  At the start of the flow, there's a "Language" collapsible. This collapsible allowed people to see that you could add more than 1 language, but you didn't need to engage with it unless you needed to. When the collapsible opened, customers could select their "default language" and then select from 140+ languages as additional languages.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-6">2. Translations view</h3>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  A new view that functions as an extension of the existing "questions" view in our workflow. This allows you to edit translations in 3 ways:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Manual translations</h4>
                      <p className="text-gray-600">Enhanced input that allows you to see the default language text while writing translations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Google Translate</h4>
                      <p className="text-gray-600">Complete translations using a couple of clicks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Import/export Excel</h4>
                      <p className="text-gray-600">Allow admins to manage and edit translations in bulk via spreadsheet</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-2xl font-light text-gray-900">Translation Editor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Impact Section */}
        <section className="py-24 bg-gray-50 -mx-8 px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Results & Impact</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              The results validated my research-driven approach
            </p>
          </div>
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <div className="group bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Customer Retention</h3>
              <div className="text-5xl font-light text-green-600 mb-4">$1M+</div>
              <p className="text-gray-600 leading-relaxed">
                ARR customer retained who was considering churning due to multilingual limitations
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Usage Success</h3>
              <div className="text-5xl font-light text-blue-600 mb-4">4,000+</div>
              <p className="text-gray-600 leading-relaxed">
                multilingual reviews completed since launch
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">✨</div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Support Efficiency</h3>
              <div className="text-5xl font-light text-purple-600 mb-4">Minimal</div>
              <p className="text-gray-600 leading-relaxed">
                support tickets related to the feature, indicating intuitive workflow design
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">User Adoption</h3>
              <div className="text-5xl font-light text-orange-600 mb-4">Strong</div>
              <p className="text-gray-600 leading-relaxed">
                user adoption with customers successfully managing translations across multiple languages
              </p>
            </div>
          </div>
          
          {/* Key Insight Card */}
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-2xl">💡</div>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">Key Insight</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  The low support ticket volume was particularly validating. By matching customers' existing mental models of questions first, then translations, I created an intuitive experience that didn't require extensive training or support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
