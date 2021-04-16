<!--
.. title: Perception, Abstraction and Creativity
.. slug: why-computers-5
.. date: 2021-01-29 09:00:00 UTC+01:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text
.. author: Nicholas H.Tollervey
-->

<style>
.tape td {
    border: 1px solid black;
    width: 2em;
    height: 2em;
    color: #fafafa;
    background: #4F5151;
}

.on {
    border: 1px solid black;
    width: 2em;
    height: 2em;
    color: #4F5151 !important;
    background: #fafafa !important;
}

table td, table th {
    text-align: center;
}
</style>

## Why Computers Work (part 5) 

[The Treachery of Images](https://en.wikipedia.org/wiki/The_Treachery_of_Images)
by [René Magritte](https://en.wikipedia.org/wiki/Ren%C3%A9_Magritte) is a
thought provoking visual brain twist. It shows a pipe, under which is written
in French, "this is not a pipe". Magritte is correct, it is _not_ a pipe, but
actually a painting:

![This is not a painting](/images/treachery_of_images.jpg)

In a similar vein, you're not currently looking at a painting ~ rather, you're
looking at a multitude of pixels, each one acting like a small tile in a huge
[mosaic](https://en.wikipedia.org/wiki/Roman_mosaic) containing millions of
tesserae, each tile being one of many millions of possible colours. If you were
to zoom into the image you'd see something like this:

![This is still not a painting](/images/treachery_of_zoom.jpg)

Yet, you're not even looking at an assortment of tessellated pixels! Rather,
your screen actually consists of repeating cells, each in turn split
into red, green and blue (RGB) sections. If you used a magnifying glass
to look at your screen, you'd see something similar to this:

![This is definitely not a painting](/images/treachery_of_pixels.jpg)

The upper half of the image contains blocks of the RGB cells arranged to
display the basic colours: red, green and blue. The lower half contains RGB
cells arranged into two blocks for white and black. By adjusting the amount
of constituent red, green and blue emitted in each individual RGB cell many
millions of colours can be generated. If you step back from your screen,
squint your eyes and look at the blocks of colour you'll see this effect in
action.

For completeness, here's an individual RGB cell:

![An RGB square pixel](/images/rgb_pixel.jpg)

These minute electrical components emit light and there are likely to be
several hundred per square-inch on the screen you're using to read this
article.

Our perception of what we encounter depends on its scale. Furthermore, what we
encounter may not be what we see, as René Magritte forces us to acknowledge
with The Treachery of Images (we see a pipe when we're actually encountering a
painting, or pixels, or a screen, and so on). There is a
[phenomenological](https://plato.stanford.edu/entries/phenomenology/) aspect to
our relationship to things.

This applies to other encounters with the world too.

Our perception of time depends on a sense of scale or, perhaps more
accurately, tempo. Each of the following eight images shows a different
snapshot of a stick man running.

![Individual frames for a running man animation](/images/running_frames.png)

Yet if we repeatedly and speedily place them on top of each other, we no longer
see eight individual images, but a single image **in motion**. In fact, we see
a stick man in motion.

![Running stick man animation](/images/running.gif)

Scale also effects our perception of sound. Consider the following musical
experiment:
[Beethoven's mighty 9th Symphony](https://en.wikipedia.org/wiki/Symphony_No._9_(Beethoven))
stretched to last twenty-four hours. By drasticly slowing down the tempo (all
other aspects of the piece remaining the same ~ notes, instrumentation, and so
on), it becomes something completely different. It sounds like an ambient
musical experiment by the likes of
[Brian Eno](https://en.wikipedia.org/wiki/Brian_Eno) and our recognition of
melody, form or harmonic structure disintigrates - even though melody, form and
harmonic structure are still present. Such a temporal zoom, as well as hiding
aspects of the music, also reveals new details: I find myself concentrating on
the timbre of the instruments and enjoying the indistinct transitions between
pitches (it's like listening through fog).

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/?listType=playlist&list=PLpJJnhgdCvERiUvfCaVjD0TC8y45MErN5" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Why are these examples important..?

In the first post I made a distinction between "how" and "why" questions and
challenged you to acquire new perspectives about seemingly everyday things. I
called these brain twists because they cause "aha" moments. Such subjective
shifts provide a new, and hopefully deeper or useful, understanding of what
we're encountering or how we relate to something. The external world remains as
it was before, but it is we who have changed.

Yet it turns out that brain twists are something we do naturally, even if we're
not always aware we're performing such twists. The prior examples were
carefully chosen because they bring such changes of perspective into focus.

I'm inviting you to shift _your_ perspective about how _we change_ perspective.

Can you "brain twist" brain twists..?

Our capacity to shift perspective due to scale is a fundamental reason _why_
computers appear to work. They work so fast at such a small scale that our
sense of time and space means we don't see a computer re-drawing a static image
on a flat screen made up of millions or RGB cells at a rate of 64 images per
second. Rather, we see this blog post consisting of words, images, sound and
video - things that are meaningful to us. The computer is working at a
completely different scale of time (3 billion instructions a second) and space
(running on microscopic electrical components).

Here's the brain twist: such tricks of perspective due to scale also apply to
thinking.

Consider learning to ride a bike ~ it's a challenge because the learner has to
think about lots of different things at once. For instance, turning the pedals,
steering, keeping balance, posture, the breaks and coordinating all these
things together so the beginner cyclist moves safely in the right direction.
When we become proficient at cycling, this bundle of thinking simply becomes
"riding a bike". All the constituent aspects I describe above are subsumed into
a larger concept.

Such diverse dexterous detailed thinking, through careful practice and
familiarity, becomes a single named activity. In a sense we have zoomed out in
terms of the scale and perspective relating to our thinking: we use and re-use
such a generalisation of the details as a placeholder in further thoughts.

For instance, I could say "I'm just going to cycle to the shops, do you want me
to get anything for you?". The concept of _cycling to the shops_ is a place
holder for the rather complicated activity of riding a bike, but whose details
are really not that important for the content of the sentence... we're thinking
at a different scale here.

This is, in a computing sense, what we mean by "abstraction".

The instructions computers follow can be organised into ever larger units, and
such units can be organised together when their scale matches. Because
computers process instructions billions of times a second, these abstractions
are hidden in the blink of an eye and the end result is something
comprehensible to our human scale and perspective (except when things go wrong
and the computer becomes incomprehensible or appears confused... commonly known
as a bug).

A great visual example of this in action is Conway's
[Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life).

The Game of Life is an automata: rules that define a process for how certain
states of affairs transition to a new state (does this sound familiar?). In the
case of the Game of Life, the states of affairs describe a grid. Each square
cell in the grid can be alive (on) or dead (off). Another way to imagine the
game of life is as a huge board game with white chequers pieces on the squares
(cells) that are alive. Such a grid could be created as many parallel tapes
lined up on a huge Turing machine with some squares black (off) and others
white (on).

The rules to work out the next state of affairs are disarmingly simple:

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead
   cells stay dead.

Consider the following Game of Life state:

<table class="tape">
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td class="on"></td>
        <td class="on"></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td> </td>
        <td class="on"> </td>
        <td class="on"> </td>
    </tr>
    <tr>
        <td></td>
        <td> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td> </td>
    </tr>
</table>

By following the simple rules, the next state of affairs *must* look like
this (pick a cell from the first grid, follow the rules in your head, and work
out if you agree with this second grid):

<table class="tape">
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td class="on"> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td class="on"> </td>
    </tr>
    <tr>
        <td></td>
        <td class="on"> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
    </tr>
    <tr>
        <td></td>
        <td> </td>
        <td class="on"> </td>
        <td> </td>
        <td> </td>
        <td class="on"> </td>
    </tr>
</table>

Of course, this grid can transition a further step to this new state of
affairs (notice anything interesting? It's an upside-down version of the first
grid, but moved one cell to the left and one cell up):

<table class="tape">
    <tr>
        <td></td>
        <td></td>
        <td class="on"></td>
        <td class="on"></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td></td>
    </tr>
    <tr>
        <td class="on"> </td>
        <td class="on"> </td>
        <td> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td></td>
    </tr>
    <tr>
        <td> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td> </td>
        <td> </td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

The next state of affairs is, unsurprisingly, the same as the second state but
upside down. A further outcome of such mirroring is that this final state
*must* transition back to the first state of affairs but moved left by one cell
and up by one.

<table class="tape">
    <tr>
        <td></td>
        <td class="on"></td>
        <td></td>
        <td></td>
        <td class="on"></td>
        <td></td>
    </tr>
    <tr>
        <td class="on"> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td></td>
    </tr>
    <tr>
        <td class="on"> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td class="on"> </td>
        <td></td>
    </tr>
    <tr>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td class="on"> </td>
        <td> </td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>

Such an arrangement of cells, combined with the rules of Conway's Life, create
a looping pattern that always moves in the direction in which it is pointing.

Skillful combination and wide ranging arrangement of cells in the Game of Life
show how scale and perspective illustrate abstraction. In the following video,
as the camera zooms out the tempo of change speeds up to reveal structures
within sturctures, and something rather amazing.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ra14IjqXS1Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Python on C using libraries in the OS that's translated into assembler and run
as instructions on the chip.

![Hello World in Python](/images/hello_world.gif)

Wittgenstein quote about asking why... there isn't really a definitive answer,
but there is a sort of journey to understanding that we've taken together.



> People who are constantly asking 'why' are like tourists, who stand in front
> of a building, reading [Baedeker](https://en.wikipedia.org/wiki/Baedeker), &
> through reading about the history of the building's construction etc etc are
> prevented from _seeing_ it.
>
> ~ Ludwig Wittgenstein, [Culture and Value](https://en.wikipedia.org/wiki/Culture_and_Value) (MS 124:93)

The need to be a complete, well rounded view of computing. Not just the
logical, not just the creative manufacture of things, not just the sense of
working with others through such technology, but a feeling of transcendent
imagination and understanding that both incorporates these logical, creative
and social aspects but transcends it to a place of effortless integration,
liberation and emancipation. A realisation that we, as humans, are the ones who
give meaning and scope to the computing world.
