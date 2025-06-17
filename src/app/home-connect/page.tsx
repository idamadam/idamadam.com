export default function HomeConnect() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Home Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 italic">
            A homepage system to bring Culture Amp together into a cohesive platform
          </p>
        </div>

        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Outcomes</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Using the success of 1-on-1s on Home to lead future design direction</li>
              <li>• Created a system to represent different modules in Culture Amp on the homepage</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Discovery and definition</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            A consistent theme in my customer feedback from interviews as well as G2 reviews was that users found navigating and using Culture Amp to be a challenge. This difficulty was mirrored in our products' low adoption rates, contributing to an increased churn rate.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            The '1-on-1s on Home' project demonstrated the Homepage's effectiveness in engaging and activating customers to different modules in Culture Amp. Given its success, expanding the Home page with more relevant content presented as a promising opportunity. My design challenge was to create a scalable system that could present a diverse range of Culture Amp content in a relevant, accessible and user-friendly way.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Concept development and testing</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I began by examining the existing structure of the homepage, considering how it could accommodate additional content. I added more content to the homepage in a way that was cohesive with its existing design. I took the revised concept directly to our customers to understand their perception of the new layout and how the added information impacted the experience.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Interview insights</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                • Users were critical of using prime home page space for less essential content like spotlight messages
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                • Managers emphasized the need for chronological information to help them for the week ahead on the homepage
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Design refinements</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Based on the feedback, I felt like the existing layout which created a section for each area of the product would not be scalable in terms of showing the most relevant information at that time. I explored different ways to display this information by doing a lot of iterations. I also focused on presenting information clearly without overwhelming users.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I decided to implement a 'feed' concept for the Culture Amp homepage, a strategic choice aimed at minimizing user interaction while maximizing access to the most important insights. To validate this approach, I created a prototype based on the feed concept and tested it with customers to gather their feedback.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            This prototype wasn't just a functional change; it also introduced newer interface elements. In collaboration with my manager, I explored these elements as part of a broader vision, contemplating a future look and feel for Culture Amp.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Customer feedback</h4>
            <blockquote className="text-gray-700 dark:text-gray-300 italic border-l-2 border-blue-500 pl-4">
              "I quite like that as feedback comes in, that you can quickly see what was said and if it is feedback that needs to be discussed, that you can add it to the one-on-one. I think that's a logical thing, right? You get some feedback and say cool, we need to talk about that. I like that a lot."
            </blockquote>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key insights from testing</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Direct homepage access</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Users expressed strong approval for being able to access relevant stories directly on the homepage, eliminating the need to navigate through different sections of the product.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Contextual actions</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The feature allowing users to add a topic to a 1-on-1 discussion directly from the Homepage, such as a blocked goal, was especially well-received.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Homepage as a guide</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Customers began to view the Homepage as a guide for their next actions. Three customers specifically suggested replacing the "Recently viewed" section with a "What's coming up" feature for better task prioritization.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Goal management prompts</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Updates regarding blocked and inactive goals were deemed crucial. Managers highlighted that these prompts on the Homepage would aid in regular goal updates, addressing the challenge of consistently maintaining goal progress.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Going from concept to execution</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Since the changes in the concept were so far from what the current Culture Amp experience is, I adjusted the designs to better match Culture Amp's current design language, while also laying the foundation for larger future changes by creating slices that could get us there in the future.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Three key implementation slices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Slice 1</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Foundation</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Slice 2</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enhancement</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Slice 3</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full concept</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Customer testing & technical conversations</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Recognizing that these designs were becoming strong candidates for our roadmap, I initiated discussions with the technical team to determine how it could be delivered. This collaboration was crucial to ensure that our vision for the product's evolution was both technically feasible and aligned with our long-term objectives. I worked closely with our technical team to identify risks, advocate for features that were important for the user experience as well as adapting the design to fit technical constraints.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            I also took the adapted designs to customers to get more feedback. This resulted in a further iteration to the design that which eventually made it to implementation. As this is still yet to be released, I anticipate that these changes will improve the user experience by encouraging user adoption and retention by making our platform more efficient and valuable.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Final customer validation</h4>
            <blockquote className="text-gray-700 dark:text-gray-300 italic border-l-2 border-green-500 pl-4">
              "I think as a leader, you want things here that are gonna prompt you to ask questions. And this does that. Seeing people that have received feedback and seeing that Javier has an inactive goal gives me the prompt to ask a question. This is great."
            </blockquote>
          </div>
        </section>
      </main>
    </div>
  );
}