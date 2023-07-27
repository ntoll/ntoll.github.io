<!--
.. title: On Debugging
.. slug: debugging
.. date: 2023-07-26 12:15:00 UTC+01:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text
.. author: Nicholas H.Tollervey
-->

One of the stand-out collaborations of my career has been with my buddy
[Damien George](https://dpgeorge.net/). He's the creator of
[MicroPython](https://micropython.org/) ~ a lean and efficient implementation
of the Python programming language optimised to run in constrained
environments. When Damien created MicroPython I think he imagined "constrained
environments" to mean microcontrollers - the small single chip computers
beloved of embedded systems engineers, Internet of Things enthusiasts and the
Maker community.

Little did he realise that MicroPython was an amazing fit for another computing
context: the browser.

![MicroPython](/images/MicroPython_Logo.jpg)

The browser is an interesting space in which to work because of its unique
combinations of constraints.

Firstly, everything needed to view a web page needs to be delivered over the
network. So, the smaller the asset to be delivered can be, the better.
MicroPython, when compressed for delivery to the browser is only around 170k in
size - smaller than most images you find on most websites.

Secondly, the browser is perhaps the world's most battle tested sand boxed
computing environment. By this I mean that web browsers encounter all sorts of
interesting, nefarious, ill-performing, badly written and otherwise shonky
code. Such code should be constrained into a virtual sandbox, so it can't do
any damage to the user's wider system. Because of the recent development of
[web assembly](https://bytecodealliance.org/) (shortened to WASM ~ a sort of
virtual microprocessor working in the browser), code written in C can be
compiled to run in the browser. MicroPython is written in C and Damien and his
collaborators have worked together to create
[a port for web assembly](https://github.com/micropython/micropython/tree/master/ports/webassembly).

Third and finally, the browser makes available to the developer of websites a
JavaScript object called `globalThis`, through which all the other objects,
functions and data structures needed to
[access the capabilities of the browser](https://developer.mozilla.org/en-US/docs/Web/API)
are made available. By constraining developers to a single means of interacting
with the browser, there is only one way to go about making things happen.
MicroPython compiled to WASM has access to the full capabilities of the
sandboxed browser thanks to some of Damien's recent work on a foreign function
interface (FFI) that interacts with the JavaScript based APIs and capabilities
defined by `globalThis`.

Given this context, what does MicroPython allow you to do?

From within MicroPython running in the browser, one simply imports the `js`
module (short for JavaScript). It's an object in MicroPython that acts as a
proxy for `globalThis` in the browser. It makes interacting with the browser
from MicroPython an absolute joy. It's worth pointing out that Damien's work is
based upon the `js` work done as part of the
[Pyodide project](https://pyodide.org/en/stable/) (a version of the CPython
interpreter for the browser), so no matter the version of Python you use in the
browser, you access the browser's capabilities in exactly the same way.

But recently, there was a problem.

I was due to give a talk about [PyScript](https://pyscript.com/) (a platform
for taking MicroPython and Pyodide and making them easy to use in the browser)
at [EuroPython](https://europython.eu/) and I was putting together code
examples of ever increasing complexity to present as part of my talk. But I
kept hitting strange errors when using MicroPython. My colleague and
web-guru [Andrea](https://webreflection.medium.com/) managed to isolate the
problem but had been unable to work out why it was happening. Put simply,
somewhere in MicroPython's FFI, at that point where JavaScript and MicroPython
were interacting, unwanted JavaScript objects were unexpectedly leaking into
the MicroPython world thus causing things to crash. Think of it as a JavaScript
shaped spanner in the MicroPython works.

This wasn't a good situation to find oneself in, a few days before presenting
at one of the Python world's largest and most prestigious conferences.

Damien and I decided to debug the problem, and we recorded ourselves doing so
because Andrea wasn't available at the time of our call. We figured that if he
could watch our debugging session, he might spot something we hadn't and
suggest a fix.

In any case, what followed was a lot of fun, and the video of the debugging
session is embedded below.

There are some things you need to know before you watch the video:

* Both Damien and I know JavaScript to a sufficient level to be
  "dangerous". We can get stuff done, but we're not guru level like Andrea.
* Damien is an expert in C (the language used to implement MicroPython) and
  clearly knows his way around the MicroPython codebase including the FFI that
  kept crashing. I am familiar enough with C to be able to read it, but not
  very experienced at writing it, and I certainly don't know anything about the
  MicroPython internals, including the FFI.
* We were using a collaboration technique called pair programming: where one
  developer (Damien) is the "pilot" with the other developer (me) acting as
  "co-pilot". As you'll see in the video, Damien was sharing his screen so I
  could see what he was looking at and he'd often describe things, processes or
  problems to me, only for me to confirm them, explain them back or ask
  questions as a way to help maintain focus. As the one most ignorant of the
  language and code-base, I was in a good position to play the beginner to
  Damien's expert, and ask for clarifications.
* Our debugging involved taking very careful steps to investigate and change
  the code so the problem was (happily) eventually revealed, tested and fixed.
  As the Chinese proverb explains: when crossing a river, it's best to do so
  slowly and by feeling with one's toes.
* Both of us were having a lot of fun in different ways. Damien was clearly
  fascinated by delving into the problem. I was enjoying Damien's virtuosic
  debugging performance, and found out some fun stuff as we went along.

So grab your popcorn, and enjoy the show:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/uqBgSMB9dRY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
