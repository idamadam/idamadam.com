/* eslint-disable react/jsx-one-expression-per-line */

import Head from "next/head";

function PageHeader() {
  return (
    <header>
      <section className="brand">
        <h1>Idam Adam</h1>
        <p className="subhead">product designer</p>
      </section>
      <section className="blurb">
        <p>
          Designing tools to help businesses succeed at{" "}
          <a href="https://myob.com/" target="_blank" rel="noreferrer">
            MYOB
          </a>
          .
          <br />
          Prior experience includes{" "}
          <a href="https://canstar.com.au/" target="_blank" rel="noreferrer">
            Canstar
          </a>
          ,{" "}
          <a href="https://netengine.com.au/" target="_blank" rel="noreferrer">
            NetEngine
          </a>{" "}
          &amp;{" "}
          <a href="https://qut.edu.au/" target="_blank" rel="noreferrer">
            QUT
          </a>
          .
        </p>
        <p>Take a look at some of my work.</p>
      </section>
    </header>
  );
}

function MainContent() {
  return (
    <main>
      <section className="caseStudyWrapper">
        <img src="/images/list.png" alt="Preview of the app" />
        <div>
          <a href="v1/invoicelist">
            <h3>Getting SME&apos;s paid faster</h3>
            <p className="subhead">Invoice list</p>
          </a>
        </div>
        <img src="/images/track.png" alt="Preview of the app" />
        <div>
          <a href="v1/track">
            <h3>Track time on the go</h3>
            <p className="subhead">Time Tracking for AccountRight</p>
          </a>
        </div>
      </section>
    </main>
  );
}

function HomePage() {
  return (
    <body className="homepage">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link rel="stylesheet" href="/css/styles.css" />
        <title>Idam Adam</title>
      </Head>
      <PageHeader />
      <MainContent />
    </body>
  );
}

export default HomePage;
