---
title: 'IssuePages: using GitHub issues as an editor'
description: 'A small publishing experiment with GitHub as the editing workflow, and why I am keeping the lesson as an article.'
date: 2026-10-09
draft: true
tags: [github, cloudflare, publishing, experiments]
---

IssuePages started with a small idea: open a GitHub issue and leave a page on the internet. GitHub already supplied an editor, identity, comments and a revision history. I wanted to see how much publishing software I could avoid by using those pieces.

The experiment became a Cloudflare Worker with a D1-backed public projection. A GitHub issue supplied the article identity. Its title and body became a readable page; edits, labels and archive state could follow the source issue.

## GitHub writes; the site reads

The useful architectural choice was to separate synchronization from serving.

The publishing path verified the webhook signature and repository identity, processed the issue, rendered its Markdown and sanitized the result before updating the public projection. Normal article, discovery and search requests read D1 and the cache. They did not need a GitHub API request on every visit.

That kept the public reading path independent of GitHub's availability and API allowance. It also made a failed edit easier to handle: a render hold could preserve the last known-good public revision instead of replacing an article with broken output.

There was a separate, explicitly namespaced reader for arbitrary public GitHub repositories. That path could fetch public issues on demand, but it did not turn those requests into published D1 records or borrow the publishing repository's credentials.

## The editor was only part of the job

Reusing GitHub removed the need to build an editor and account system. It still left the work of deciding what could become public, handling updates safely, supporting search, keeping cached pages current and making GitHub-flavored content readable outside GitHub.

The owner-only pilot constrained who could publish. Other submissions remained held rather than becoming public automatically. Sanitization and moderation belonged on the publishing path; a convenient editing workflow did not remove that responsibility.

These are useful engineering lessons. They are also more machinery than the original sentence suggests.

## Keeping the experiment small

I am retiring IssuePages as an independent Fleet product. I want to keep the working example and the lesson from building it, without an ongoing roadmap for a CMS, publishing community or multiple-author platform.

For my own website, an article is enough. The source and existing implementation remain retained; retiring the product identity does not require deleting the evidence.

The part I would reuse is the boundary: treat the upstream system as the editor, build a controlled public projection, and make the reading path independent of synchronization. That pattern can be useful even when the experiment that demonstrated it is finished.
