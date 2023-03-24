---
title: Folio Camp
blurb: An experiment in learning what it takes to build a product by myself.
heroImages:
  - image: /images/foliocamp/foliocamp-hero.png
    alt: "Iterations of the landing page"
pageRank: 2
---

# Folio Camp
### Folio Camp was my first attempt at creating a functioning digital product. I’ve dabbled with designing and building small prototypes for my previous side projects. This time I wanted to build a fully featured product with the goal of getting people to use it.

## Initial idea & hypothesis

To start, I had to find a problem space to start investigating. Product design portfolios seemed like a good fit as I was familiar with the problem, and I knew plenty of other designers who I might speak to get their understanding. 

> My initial hypothesis was that people don't take enough notes to keep track of their projects and help them create their portfolio. I went out and interviewed a couple of Product Designers. I found that there wasn't a problem with notes as they had developed ways to keep record of the work that they did.

Based on the first set of interviews, I decided on a second hypothesis. This hypothesis was around the portfolio creation process. That compiling a portfolio is a painful, time intensive exercise.

This hypothesis gave me the product idea of creating a time-boxed virtual bootcamp to get their portfolios together. People would sign up, pay a nominal fee and commit to finishing their portfolio in a certain amount of time.

## Landing page

I realised that putting a group of strangers together for a couple of weeks to build a portfolio would be a big ask. When thinking about something that people might get value out of, I thought feedback could be a time-boxed activity that everyone could get value from.

To test this idea I created a landing page. I started with a quick mood board and derived a colour palette, typography styles and a logo.  From here, I designed a simple form to get people's emails signed up. 

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FC1ayuNi1iYx25T79Hs30G1%2FInitial-landing-page%3Fnode-id%3D307%253A2&chrome=DOCUMENTATION" allowfullscreen></iframe>

The HTML for the page was simple to set up but I needed a way to collect peoples’ emails. I used Mailchimp to send new signups an automatic email from me confirming that they were in.

![The email I sent](/images/foliocamp/landing-email.png)

Now that the page was built, I needed emails! I asked a couple of friends if they'd be keen and got a couple of emails but it was slow going.

The breakthrough moment for me was when a friend of mine put the link up in a Slack group and I started getting signups from people I didn't know. I took this as a signal that there was at least some demand for a product. It was time to take it to start building.

I diagrammed a rough flow where I'd be manually grouping people together and emailing them to say that they were successfully matched.

<iframe id="WhimsicalFlow" style="border:none;" width="100%" height="450" src="https://whimsical.com/embed/95tWsZNfkhUqUDorhSrj34"></iframe>

I created a web app which spoke to my database and pulled the details of the users.

<iframe id="MVPApp" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FkfO08deGliQAGqNwrTNdQ7%2FMVP-Flow%3Fnode-id%3D180%253A1868&chrome=DOCUMENTATION" allowfullscreen></iframe>

After doing this work I sent out emails to a couple of cohorts but I quickly found out that people don’t open their emails. From the people who opened their emails, I found that no one submitted any feedback. Timing may have been an issue since I sent the emails around Christmas/New Year and people could've been with their families. 

## Full build

For the next iteration I decided to simplify the surface area of the app. I cut the matchmaking part of the product and focused only on giving and receiving feedback. The product would generate a unique link for every user that they could use to send to anyone they wanted portfolio feedback from. 

To test this idea I decided that I would need authentication to secure user data. My focus shifted from quick product experiments to in-depth technical experimentation. For context, the COVID-19 pandemic reached Australia and we were in our first lockdown. Reading documentation and writing code felt like a good way to spend my time and it made the first couple of months of lockdown fly. 

During this time, I built a web app that did the following:

1. Sign up and log in to the service
2. Generate a unique link for the user
3. Records any feedback that was sent to that user

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fuyxx22aHo84nfUvnVApTfU%2FBuilt-Product%3Fnode-id%3D80%253A2&chrome=DOCUMENTATION" allowfullscreen></iframe>

After a couple of months, I realised that I had gone down a technical rabbit hole and needed to get the product in front of people again. I asked friends for their help and they quickly got people who'd be interested in using the product.  

> Two people signed up and sent their link to get feedback on their portfolios. It was interesting to use what I had built to give feedback. Since the content of each portfolio varied (e.g. the content, the style, the writing), each piece of feedback would need to be unique to that person. The form I built didn't assist with this at all; it was a dumb form for someone to enter that data in. 

I wasn't doing anything to validate whether people wanted the product but just tinkering with what I built. I’ve learnt that I need to figure out how to distill the idea into the smallest testable kernel. It's easy to sink a large amount of time and effort into an idea and get caught up in the execution. The trick is to balance strategy and execution. Both are as important as each other and you can't lose sight of either.

## Summary

The reality of building something yourself is quite different to what I was expecting. It takes way more time than anticipated, and there’s a lot of ground to be covered. It’s not just as simple as creating some mockups, or writing some code. To achieve success, you need to have clarity on the problem you’re solving, who you’re solving it for and how badly these people need this problem to be solved. Without this foundation, it’s easy to spend time on building without thinking about the end problem in mind.

Feedback cycles are also critical for building products. It’s easy to get caught up in building and lose sight of the end goal. Reducing the amount of time you spend between feedback cycles is an excellent way to have more confidence in your progress. Feedback doesn’t necessarily need to come from traditional user testing, even a sense check from people you trust might be good in some measures. The important thing is to ensure that your ideas and execution are being regularly tested.