<!--
.. title: Great Code Reviews
.. slug: code-reviews
.. date: 2022-08-17 16:00:00 UTC+01:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text
.. author: Nicholas H.Tollervey
-->

<style>
.section_break {
    border: none;
    border-bottom: 1px solid black;
    width: 50%;
    color: #333;
    overflow: visible;
    text-align: center;
    height: 5px;
}

.section_break:after {
    background: #fff;
    content: '§';
    padding: 0 4px;
    position: relative;
    top: -13px;
}
</style>

As I've [mentioned elsewhere](/article/pastures-new/), I've just started a new
role at [Anaconda](https://anaconda.com/).

A week after joining I was asked to contribute an article to an internal
newsletter called "Consider This!". The format is simple: write something
thoughtful on a subject of interest to folks within the company, and, at the
end, curate a list of questions to prompt further thought and reflection.

I was invited to explore what I considered important aspects of great code
reviews. Thanks to Anaconda, the article is reproduced below. Additional thanks
to my colleagues Elise and Dan who provided invaluable and stimulating feedback
to significantly improve my first draft.

<hr class="section_break" />

Ask a room of engineers what makes a great code review, and you’ll have as many
different opinions as there are engineers. Yet, in my experience, common themes
and archetypes emerge from the gloriously colourful and diverse descriptions of
a great code review. This article aims to explore what they might be.

At its core, a code review is exactly what it says: asking another to review
code.

Why might one do this? Often the simple answer is, “because I have to”.

Code hosting sites, like GitHub, make it easy for code reviews to be part of
the development process through concepts like pull requests (PRs for short).
Simply make a change to the code, bundle your changes into a PR, submit it and
wait for feedback from maintainers or colleagues. Sometimes you have to submit
code for review because of corporate governance, your employer or the open
source project to which you’re contributing may have an existing review process
for all contributions. Or it may simply be habit or herd instinct to follow
so-called “best practices”... folks do code reviews because everyone else does
code reviews and so they’re living up to expectations.

A code review could be an assessment to overcome, where someone in authority
accepts or rejects your changes. It might involve checking your changes to
ensure you’ve followed stylistic and technical conventions for a project, like
a teacher correcting work with a red pen. Furthermore, opinions about the
approach taken, methodology used or even the intention behind the change might
be offered, like a critic describing a restaurant, film or concert.

But there’s another, more engaging reason to participate in code reviews: if
done well, your world as a coder is enlarged by the process, be that as a
reviewer or contributor. In so doing, engagement with the project is a process
of growth, and the quality of the codebase is improved to reflect the shared
goals, ideas and aesthetic of those bringing the project into the world.

If a code review is used as a means of exercising authority then it’s no better
than pandering to another’s ego. Many projects have stylistic and technical
conventions, and checking such things can be easily automated so contributors
are confident their changes meet such minimum requirements before ever
submitting their code for review. Finally, if a critique of the approach,
methodology or intent is offered as part of a code review, then it’s happening
too late; such things should be discussed before code is submitted for
inclusion in the project, perhaps in early drafts (so called “code spikes”) or
exploratory proofs-of-concept.

From the contributor’s point of view, a code review is an opportunity to share
their work so others understand and see what they are offering. In other words,
a code review is an exercise in education as others encounter and explore new
aspects of the code base. From a reviewer’s point of view, a code review is an
opportunity to explore, internalise and offer constructive feedback of
another’s contribution. Once again, it’s an exercise in education as the
contributor is invited to explore their own work through the fresh eyes and
constructive commentary of the reviewer.

Earlier, I deliberately used the word “enlarge” when I said a code review
enlarges the world of those who participate. Enlargement is not synonymous with
“fun”, “positive” or “easy”. The process of enlarging one’s view of the code
might feel uncomfortable (perhaps you’re trying to get your head around a
difficult or unfamiliar concept), negative (you feel frustrated with yet
another bug in a hard-to-fathom part of the project) or difficult (the task at
hand is complex and requires much effort simply to engage effectively).

Yet, enlargement implies growth, understanding and progress, and I’m reminded
of the types of fun mountaineers use to categorise climbs.

A climb that is _type one fun_ is fun because it’s fun to do, _type two fun_
is not fun at the time but fun to recollect afterwards because of the
achievement gained or lesson learned, and _type three fun_ is not fun at the
time, nor fun to recollect because you realise you never want to be in that
situation ever again. Given a receptive spirit of learning, a mountaineer’s
view of the world is enlarged through a mixture of both _positive and
affirmative_, as well as _negative and difficult_, experiences.

So, how do we foster a spirit of enlargement in code reviews?

I believe mutual respect is key. Respect involves showing empathy, gratitude
and acknowledgement that, when difficulties arise, folks involved are acting
with the best of intentions. Another key factor is trust, an attribute of a
team that only comes through working together over time, making mistakes
together, and seeing evidence that folks support each other. I’d add that
compassion (an awareness of and sympathy for another’s feelings and situation,
mixed with a proactive desire to engage) is a great way to show support. When
things inevitably become difficult, then compassion for each other is a way to
embody mutual respect and build trust.

In the context of code reviews, such attributes help our judgement to become
deeper, more refined and aware of the wider context of the project and its
participants. A code review is no longer just an arbitrary measurement of
“quality” (have you followed our code conventions?), but becomes an exercise
in mutual learning and improvement that encompasses both enjoyable and
challenging aspects of participating in a coding project. At the heart of this
process is a strangely humorous paradox, as demonstrated by this old joke:

> STUDENT: O Guru, what is the secret of success?<br/>
> GURU: Good judgement.<br/>
> STUDENT: How do you get good judgement?<br/>
> GURU: Experience.<br/>
> STUDENT: How do you get experience?<br/>
> GURU: Bad judgement!


Only when folks feel safe to exercise potentially bad judgement (through the
code they offer or the feedback they give), will they be able to gain
experience and learn good judgement. The code review is a place to pay
attention to each other’s contributions to facilitate mutual learning and
growth. This will, ultimately, improve the project as a whole, and help its
participants better engage with the tasks at hand.

“But”, I hear you ask, “what things should one do in a code review?”

If you’re expecting a “top ten interventions to make in a code review” type
post, you’re in the wrong place. In fact, such naive shopping lists
demonstrate a rather transactional and limited view of the process of a code
review, while completely missing the point I’m trying to make. I hope you
focus on embodying and passing on the sort of attributes that make a project
an enlarging place in which to contribute: mutual respect, trust and
compassion.

Perhaps we could learn by examining what other disciplines do when something
is offered and feedback is given. For example, such a process is at the heart
of musicians rehearsing (no matter the genre of music).

This short fragment shows Leonard Bernstein rehearsing an orchestra. Clearly
the triangle players are not playing to the high standard he expects.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ebf6_7nHciw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I want to draw your attention to the relationship between the musicians
involved. How do Bernstein and the percussionists appear to you?

Folks might think Bernstein is condescending, sarcastic and not particularly
supportive. Others might see him as setting clear (and very high) expectations
through humour. Others might focus on Bernstein’s clear ignorance of triangle
playing and the resulting laughter from the percussionists. That we see the
same thing in different ways is itself an interesting and important outcome of
our diverse and multifaceted backgrounds (and it’s important to acknowledge and
recognise such differences).

The important relationship, upon which I want us to focus, is that between
Bernstein and the musicians. Only when there's mutual respect, a feeling of
safety and trust can such potentially difficult conversations, involving the
giving and receiving of constructive criticism to fulfil some important end,
take place. How such discussions unfold will reflect the unique relationship
cultivated between the participants. So long as both parties share a bond of
trust and respect, and we recognise and respect such a bond _reflects their
unique relationship with each other_, then we can engage with and learn from
the feedback and what the outcome tells us about the endeavour. In other words,
our world is enlarged by observing their interactions.

Questions to Explore:

* How has your world been enlarged through a recent code review?
* Remember a time when you received valuable feedback or an important lesson
  that enlarged your world; how was it revealed to you?
* What is your team’s approach to code reviews?
* How do you and your collaborators cultivate a place of mutual respect, trust,
  and compassion?
* Put yourself in Bernstein’s shoes, what would you say to the percussionists?
* Imagine you’re the percussionists, how would you respond to Bernstein’s
  feedback?
* Think of a recent PR submitted for you to review. How did you help enlarge
  the world of the author? How was your world enlarged?
