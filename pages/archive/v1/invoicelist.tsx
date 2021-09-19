/* eslint-disable jsx-a11y/alt-text, jsx-a11y/media-has-caption */

import Head from "next/head";

function InvoiceList() {
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
        <title>Idam Adam | Invoice List</title>
      </Head>
      <header className="green">
        <section className="brand">
          <a href="/archive/v1">
            <h1>Idam Adam</h1>
            <p className="subhead">product designer</p>
          </a>
        </section>
        <section className="title">
          <img src="/images/list.png" alt="Preview of the app" />
          <div>
            <p className="caption">Case study</p>
            <h1>Getting SME&apos;s paid faster</h1>
            <p className="subhead">Invoice list</p>
          </div>
        </section>
      </header>
      <main>
        <section>
          <div>
            <p>
              SME&apos;s in Australia face a chronic problem of late invoice
              payment. It is estimated that 90% of small businesses are failing
              due to cash flow problems. In addition to the cash flow problem,
              my interviews with customers revealed that chasing up debtors can
              be a major task for our customers which means that less of their
              resources are going to working on their business.
            </p>
            <p>
              During my time at MYOB, we felt like this was an issue we were
              well placed to tackle. We developed a suite of automated invoice
              reminders to help our customers get paid faster with less effort.
              Part of this reminder suite included a page to remind customers of
              our clients about the invoices they had outstanding.
            </p>
            <p>
              I was responsible as a Product Designer for this project. Together
              with a development team, I worked in iterative cycles with a focus
              on delivering working software at the end of each round.
            </p>
          </div>
        </section>
        <section>
          <h1>The List</h1>
          <p className="subhead">List all the invoices that a customer owes</p>
          <p>
            The first aim was to ship something that would let a customer view
            all the bills they had outstanding. I used our data to understand
            how large the list would be, and used this to construct some
            wireframes of how the screen would look. This process was aided by
            the use of the MYOB Design system → Feelix.
          </p>
          <div className="invoicelist-wireframes">
            <img src="/images/invoicelist/wireframe-desktop.png" />
            <img src="/images/invoicelist/wireframe-mobile.png" />
            <img src="/images/invoicelist/wireframe-mobile-date.png" />
          </div>
          <span className="caption">Early exploration wireframes</span>
          <p>
            Whilst the screen was fairly simple, the complications came from how
            people actually got to this screen and the privacy considerations
            that came with being able to view the history of . Since our focus
            was getting our customers paid faster, we decided to include a link
            in all invoices sent to our customers. We also had to keep privacy
            in mind as this would be confidential information to the business.
            With all of this in mind, I kept this first version quite simple as
            the team had to do a fair bit of work on the backend to allow the
            system to list all the invoices for one customer.
          </p>
          <div className="invoicelist-v1">
            <img src="/images/invoicelist/v1-desktop.png" />
            <img src="/images/invoicelist/v1-mobile.png" />
          </div>
          <span className="caption">The first version that was shipped.</span>
        </section>
        <section>
          <h1>Multiple payment</h1>
          <p className="subhead">Allow them to pay in one go</p>
          <p>
            This approach allowed us to deliver value to our customers quickly,
            and get learnings from it quickly. The next logical step in the list
            was to allow people to pay them all in one go. For this iteration, I
            again heavily used the MYOB Design system to ensure that customers
            of our clients were getting a payment page that was as similar to
            the invoice payment page that they were used to.
          </p>
          <video width="100%" controls>
            <source src="/images/invoicelist/multipay-prototype.mp4" />
          </video>
          <span className="caption">
            Recording of a prototype demonstrating the behaviour
          </span>
          <p>
            Since the success of this project was very much tied to how many
            people actually paid through this page, I was really keen to ensure
            that the users of this page were getting a similar experience to the
            invoice payment page they already were looking at. To ensure this
            consistency, I re-used as much of the individual invoice page. This
            was one of those projects where it may seem very simple in the
            front-end but there was a lot being done in the backend.
          </p>
          <div className="invoicelist-v1">
            <img src="/images/invoicelist/v2-desktop.png" />
            <img src="/images/invoicelist/v2-mobile.png" />
          </div>
          <span className="caption">
            The final list, complete with multiple payments.
          </span>
        </section>
      </main>
      <footer className="green">
        <a href="track">Previous project</a>
      </footer>
    </body>
  );
}

export default InvoiceList;
