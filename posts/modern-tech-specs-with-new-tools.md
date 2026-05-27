---
title: Specs have changed: between Miro, docs and live code
date: January 21, 2026
excerpt: Technical specification is no longer a frozen PDF, it’s a flow between wireframes, tests, APIs and continuous feedback.
---

A year ago, writing a spec often meant producing a Word document, waiting for approval, and losing track of the product’s reality.

Today, the spec has become a flow. It starts in a Slack thread or a Miro board, moves through a Postman collection, and then materializes in OpenAPI or automated tests.

What changed:

* we document behaviors more than static pages;
* we expect specs to execute or validate;
* we accept that tools change the form, not just the content.

New tools let us say “here is what the API must do” and “here is how we check it.” That is where the real difference appears: you can no longer separate specification from implementation.

If you still write your spec as an isolated promise, you risk shipping something only half understood. The modern spec must live with the code, not in front of it.
