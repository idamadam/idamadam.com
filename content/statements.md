---
title: Online statements
blurb: A web experience to enable multiple bill payment.
heroImages:
  - image: "/images/invoicelist/wireframe-mobile-date.png"
    alt: "Mobile phone with a list of invoices"
  - image: "/images/invoicelist/v1-mobile.png"
    alt: "Mobile phone with a list of invoices"
  - image: "/images/invoicelist/v2-mobile.png"
    alt: "Mobile phone with a list of invoices"
pageRank: 3
---

# Getting SME's paid faster
### Online statements

SME's in Australia face a chronic problem of late invoice payment. It is estimated that 90% of small businesses are failing due to cash flow problems. In addition to the cash flow problem, my interviews with customers revealed that chasing up debtors can be a major task for our customers which means that less of their resources are going to working on their business.

During my time at MYOB, we felt like this was an issue we were well placed to tackle. We developed a suite of automated invoice reminders to help our customers get paid faster with less effort. Part of this reminder suite included a page to remind customers of our clients about the invoices they had outstanding.

I was responsible as a Product Designer for this project. Together with a development team, I worked in iterative cycles with a focus on delivering working software at the end of each round.

## Slice 1 - List all invoices that a customer owes

The first aim was to ship something that would let a customer view all the bills they had outstanding. I used our data to understand how large the list would be, and used this to construct some wireframes of how the screen would look. This process was aided by the use of the [MYOB Feelix Design System](https://feelix.myob.com/).

<ImageGrid gridTemplateColumns="3.6fr 1fr 1fr">
![Desktop wireframe](/images/invoicelist/wireframe-desktop.png)
![Mobile wireframe](/images/invoicelist/wireframe-mobile.png)
![Mobile wireframe with Dates](/images/invoicelist/wireframe-mobile-date.png)
</ImageGrid>
<Caption>Early exploration wireframes</Caption>

Whilst the screen was fairly simple, the complications came from how people actually got to this screen and the privacy considerations that came with being able to view the history of . Since our focus was getting our customers paid faster, we decided to include a link in all invoices sent to our customers. We also had to keep privacy in mind as this would be confidential information to the business. With all of this in mind, I kept this first version quite simple as the team had to do a fair bit of work on the backend to allow the system to list all the invoices for one customer.

<ImageGrid gridTemplateColumns="2.5fr 1fr">
![Desktop](/images/invoicelist/v1-desktop.png)
![Mobile](/images/invoicelist/v1-mobile.png)
</ImageGrid>
<Caption>The first version that was shipped.</Caption>

## Slice 2 - Pay multiple invoices with 1 transaction

This approach allowed us to deliver value to our customers quickly, and get learnings from it quickly. The next logical step in the list was to allow people to pay them all in one go. For this iteration, I again heavily used the MYOB Design system to ensure that customers of our clients were getting a payment page that was as similar to the invoice payment page that they were used to.

<video width="100%" controls>
    <source src="/images/invoicelist/multipay-prototype.mp4" />
</video>
<Caption>Recording of a prototype demonstrating the behaviour</Caption>

Since the success of this project was very much tied to how many people actually paid through this page, I was really keen to ensure that the users of this page were getting a similar experience to the invoice payment page they already were looking at. To ensure this consistency, I re-used as much of the individual invoice page. This was one of those projects where it may seem very simple in the front-end but there was a lot being done in the backend.

<ImageGrid gridTemplateColumns="2.5fr 1fr">
![Desktop](/images/invoicelist/v2-desktop.png)
![Mobile](/images/invoicelist/v2-mobile.png)
</ImageGrid>
<Caption>The final list, complete with multiple payments.</Caption>