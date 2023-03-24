---
title: Time Tracking for AccountRight
blurb: A mobile app to help SME's track their time.
heroImages:
  - image: "/images/timetracking/hero-form.png"
    alt: "Mobile phone with timer screen"
  - image: "/images/timetracking/hero-timer.png"
    alt: "Mobile phone with timer screen"
  - image: "/images/timetracking/hero-list.png"
    alt: "Mobile phone with timer screen"
pageRank: 1
---

# Track time on the go
### Time tracking for AccountRight

[MYOB](https://myob.com) provides a set of Time Tracking & Billing tools in their [flagship desktop accounting software](https://www.myob.com/au/accounting-software/accountright) which is used by thousands of businesses in AU & NZ.

Creating time tracking entries were entirely tethered to our desktop software. A need was identified to remove this barrier and allow users to create entries on the go.

I was responsible as a Product Designer for this project. Together with a development team, I worked in iterative cycles with a focus on delivering working software at the end of each round.

Our customers helped shape every iteration through interviews, usability tests and beta feedback.

## Understand the problem space & desktop product

As this was to be a companion app to the MYOB desktop product, I mapped out the steps required to submit an activity slip on the desktop & initiated conversations with our Product Manager and other stakeholders.

Based on this information, I first started with an extremely rough prototype using Framer. I used the prototype to spark conversations with our developers to understand what was possible. The prototype included lots of nods to features that I wanted to understand could be possible.

<div>
    <video width="100%" style="maxWidth: 320px; margin: 0 auto; display: block;" controls autoPlay>
        <source src="/images/timetracking/framer-prototype-white-bg.mp4" />
    </video>
</div>
<Caption>The framer prototype</Caption>

The developers took this prototype and built out the flows using it as a guide. This allowed us to move fast and get a rough version of the app built out so that we could play with real software as quickly as possible.

## Validate previous work & sharpen knowledge of problem space

We took this first cut of the software to one of our customers to understand how well the initial prototype fit their needs. The interview and usability test revealed that the time tracking process was core to their business, but there were a lot of inefficiencies to the way they were doing it right now.

> **Research Insight:** Data entry was done at the end of the week. This often introduced errors that needed to be fixed. The time spent on fixing mistakes wasn't billable and increased costs for the business.

The conversations we had with our users also allowed us to understand what the key workflows were within the app and to identify future opportunities. For example, we began to understand that an equivalent of the app was a diary for someone's workday.

I made improvements to the existing flow by collating all the feedback. For example, we found that users preferred to enter information in their own way as opposed to entering it in a sequential flow.

<ImageGrid gridTemplateColumns="1fr 1fr" shadow="false" fullbleed > 
    <img src="/images/timetracking/flow-before.png" alt="Before - Sequential flow" />
    <img src="/images/timetracking/flow-after.png" alt="After - Sequential flow" />
</ImageGrid>

<Caption>Before - Sequential flows. After - Choose your own adventure</Caption>


We were able to get a version of the app that we felt comfortable in releasing to our first wave of beta testers due to this feedback cycle. In addition to the workflows we changed as part of the feedback rounds, we set up the help and feedback portals for the beta process. This helped us later in the process to scale our feedback gathering to improve the product.

## Refine the workflows, the visuals & add requested features

After the initial beta, we kept our customers close by the way of bug reports, feature requests as well as another round of usability tests. The priority of this iteration was to understand what needed tightening with the app so that we could promote it to general availability.

> **Research Insight:** Testers started to change their behavior with usage. We noticed that most testers were reporting that they were now submitting slips more frequently.

Based on the feedback, we added features, fixed many small bugs and workflow issues. We also shipped a timer to the app as it was one of the most requested features from our customers. After this work was completed, we promoted the app to general availability.

To aid development of other apps within the company, I also worked with designers at MYOB to establish a common mobile design system to be used across different MYOB mobile apps.

N.B. Time Tracking has since been renamed to Invoicing for AccountRight.

<div>
    <video width="100%" controls style="maxWidth: 320px; margin: 0 auto; display: block;">
        <source src="/images/timetracking/final_app.mp4" />
    </video>
</div>

<Caption>The final product</Caption>