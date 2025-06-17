export default function OneOnOnes() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            1-on-1s on Home
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 italic">
            Helping managers have better conversations with less effort by bringing 1-on-1s to the homepage
          </p>
        </div>

        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Outcomes</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Linked an adoption goal to a key human problem</li>
              <li>• Deep collaboration with other teams</li>
              <li>• <strong>255% increase</strong> in the weekly number of managers scheduling a 1-on-1 for the first time</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Discovery and definition</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            The Culture Amp homepage has historically not had too much useful content for managers & individual contributors. The business had a need to improve the Homepage so that our customers would get more value out of our software.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I completed a review of existing research which showed that a homepage focused on people and actions resonated with employees and managers. I believed that the first place where the Homepage can start to provide value to Managers is by surfacing 1-on-1s on the Homepage.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            I conducted interviews with managers using our platform, our internal People Science team as well as the 1-on-1s team to better understand the problem space.
          </p>

          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Interview insights</h3>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Managers using CA</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Managers want to understand what's coming up next for them, so that they can be prepared for the conversations they need to have about their direct reports</li>
                <li>• They rely on input from their direct reports to help them have better conversations</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">People Science team</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• 1-on-1s need to be 'Real conversations that connect and create change' in order to have the best effect</li>
                <li>• In order to do that, 1-on-1s need to be not just status updates, they need to be co-created and co-owned by the Individual Contributors & the manager</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">1-on-1 team</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Adoption of the features in our platform were low compared our installed base, however 1-on-1s is the most used feature in our platform</li>
                <li>• In order to get started with 1-on-1s, a manager must schedule a 1-on-1 with their direct report</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Solution definition</h3>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Show upcoming 1-on-1s and their status to help managers be prepared to have "real conversations"</li>
              <li>Show unscheduled 1-on-1s to managers to increase feature adoption</li>
              <li>Show a prompt for Individual Contributors to see the status of their upcoming 1-on-1 and encourage them to fill in their check-in</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Design exploration and testing</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Early exploration</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              To start, I looked at the structure of a 1-on-1 in the product to distil that content into an easily understandable, actionable element that provided value and encouraged exploration. I explored things like visual indicators on how the content might be represented & how the design might scale in terms of the number of direct reports a manager might have.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">High fidelity designs and customer testing</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Iterating on the wireframes had given me a structure for what the section could look like. I then fleshed out the wireframes using the Culture Amp UI Kit to create higher fidelity designs.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              One of the concepts I identified in the wireframe was a need for a simple text representation of what was in a 1-on-1. I worked with the 1-on-1 team as well as a Content Designer to create a system of smart highlights. This system used the data that 1-on-1s generate to give a manager a preview of the 1-on-1.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I put these designs into a prototype to get customer feedback on the placement of the tiles as well as to understand whether the content was useful or not.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Customer feedback</h4>
              <blockquote className="text-gray-700 dark:text-gray-300 italic border-l-2 border-blue-500 pl-4">
                "It helps with identifying a trend that is actually quite hard to identify by yourself unless you are going through all those one on ones."
              </blockquote>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Highlights</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Overall positive feedback about the Direct Reports section</li>
                <li>• Including a manager's direct reports on the homepage made the page a lot more engaging</li>
                <li>• Prompts to set up 1-on-1s were considered helpful as there are no other reminders to set up the feature that's easily accessible</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Improvements</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• While Direct Reports are important, all users expressed a preference that the tasks be shown at the top than be moved to the middle of the page</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Final iteration and results</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            After release, we saw a substantial increase in adoption of 1-on-1s:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">54.3%</div>
              <p className="text-gray-700 dark:text-gray-300">increase of managers viewing 1-on-1s from the Homepage</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">255%</div>
              <p className="text-gray-700 dark:text-gray-300">increase of managers scheduling a 1-on-1 for the first time</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}