/* eslint-disable react/jsx-one-expression-per-line, jsx-a11y/media-has-caption, jsx-a11y/accessible-emoji, jsx-a11y/alt-text */

import Head from "next/head";

function Track() {
  return (
    <body>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link rel="stylesheet" href="/css/styles.css" />
        <title>Idam Adam | Time Tracking for AccountRight</title>
      </Head>
      <header className="purple">
        <section className="brand">
          <a href="/archive/v1">
            <h1>Idam Adam</h1>
            <p className="subhead">product designer</p>
          </a>
        </section>
        <section className="title">
          <img src="/images/track.png" alt="Preview of the app" />
          <div>
            <p className="caption">Case study</p>
            <h1>Track time on the go</h1>
            <p className="subhead">Time Tracking for AccountRight</p>
          </div>
        </section>
      </header>
      <main>
        <section>
          <div>
            <p>
              <a href="https://www.myob.com/" target="_blank" rel="noreferrer">
                MYOB
              </a>{" "}
              provides a set of Time Tracking &amp; Billing tools in their{" "}
              <a
                href="https://www.myob.com/au/accounting-software/accountright"
                target="_blank"
                rel="noreferrer"
              >
                flagship desktop accounting software
              </a>{" "}
              which is used by thousands of businesses in AU &amp; NZ.
            </p>
            <p>
              Creating time tracking entries were entirely tethered to our
              desktop software. A need was identified to remove this barrier and
              allow users to create entries on the go.
            </p>
            <p>
              I was responsible as a Product Designer for this project. Together
              with a development team, I worked in iterative cycles with a focus
              on delivering working software at the end of each round.
            </p>
            <p>
              Our customers helped shape every iteration through interviews,
              usability tests and beta feedback.
            </p>
          </div>
        </section>
        <section className="understand">
          <div>
            <h1>Understand</h1>
            <p className="subhead">the problem space &amp; desktop product</p>
            <p>
              As this was to be a companion app to the MYOB desktop product, I
              mapped out the steps required to submit an activity slip on the
              desktop &amp; initiated conversations with our Product Manager and
              other stakeholders.
            </p>
            <p>
              Based on this information, I first started with an extremely rough
              prototype using Framer. I used the prototype to spark
              conversations with our developers to understand what was possible.
              The prototype included lots of nods to features that I wanted to
              understand could be possible.
            </p>
            <p>
              The developers took this prototype and built out the flows using
              it as a guide. This allowed us to move fast and get a rough
              version of the app built out so that we could play with real
              software as quickly as possible.
            </p>
          </div>
          <div id="framerPrototype">
            <video width="100%" controls autoPlay>
              <source src="/images/framer-prototype-white-bg.mp4" />
            </video>
            <p className="caption">The framer prototype</p>
          </div>
        </section>
        <section>
          <h1>Validate</h1>
          <p className="subhead">
            previous work &amp; sharpen knowledge of problem space
          </p>
          <p>
            We took this first cut of the software to one of our customers to
            understand how well the initial prototype fit their needs. The
            interview and usability test revealed that the time tracking process
            was core to their business, but there were a lot of inefficiencies
            to the way they were doing it right now.{" "}
          </p>
          <div className="insight">
            <span className="caption">⚗️ Research insight </span>
            <h3>Data entry was done at the end of the week.</h3>
            <p>
              This often introduced errors that needed to be fixed. The time
              spent on fixing mistakes wasn&apos;t billable and increased costs
              for the business.
            </p>
          </div>
          <p>
            The conversations we had with our users also allowed us to
            understand what the key workflows were within the app and to
            identify future opportunities. For example, we began to understand
            that an equivalent of the app was a diary for someone&apos;s
            workday.
          </p>
          <p>
            I made improvements to the existing flow by collating all the
            feedback. For example, we found that users preferred to enter
            information in their own way as opposed to entering it in a
            sequential flow.{" "}
          </p>
        </section>
        <section className="side-by-side">
          <div>
            <img src="/images/flow-before.png" />
            <p className="caption">Before - Sequential flow</p>
          </div>
          <div>
            <img src="/images/flow-after.png" />
            <p className="caption">After - Choose your own adventure</p>
          </div>
        </section>
        <section>
          <p>
            We were able to get a version of the app that we felt comfortable in
            releasing to our first wave of beta testers due to this feedback
            cycle. In addition to the workflows we changed as part of the
            feedback rounds, we set up the help and feedback portals for the
            beta process. This helped us later in the process to scale our
            feedback gathering to improve the product.
          </p>
        </section>
        <section>
          <div>
            <h1>Refine</h1>
            <p className="subhead">
              the workflows, the visuals &amp; add requested features
            </p>
            <p>
              After the initial beta, we kept our customers close by the way of
              bug reports, feature requests as well as another round of
              usability tests. The priority of this iteration was to understand
              what needed tightening with the app so that we could promote it to
              general availability.
            </p>
            <div className="insight">
              <span className="caption">⚗️ Research insight </span>
              <h3>Testers started to change their behavior with usage.</h3>
              <p>
                We noticed that most testers were reporting that they were now
                submitting slips more frequently.
              </p>
            </div>
            <p>
              Based on the feedback, we added features, fixed many small bugs
              and workflow issues. We also shipped a timer to the app as it was
              one of the most requested features from our customers. After this
              work was completed, we promoted the app to general availability.
            </p>
            <p>
              To aid development of other apps within the company, I also worked
              with designers at MYOB to establish a common mobile design system
              to be used across different MYOB mobile apps.
            </p>
            <p>
              N.B. Time Tracking has since been renamed to Invoicing for
              AccountRight.
            </p>
          </div>
        </section>
        <section className="heroVideo">
          <div id="framerPrototype">
            <video width="100%" controls>
              <source src="/images/final_app.mp4" />
            </video>
            <p className="caption">The final product</p>
          </div>
        </section>
      </main>
      <footer>
        <a href="invoicelist">Next project</a>
      </footer>
    </body>
  );
}

export default Track;
