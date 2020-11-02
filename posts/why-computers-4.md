<!--
.. title: Why Computers Work (part 4) 
.. slug: why-computers-4
.. date: 2020-08-09 16:00:00 UTC+01:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text
.. author: Nicholas H.Tollervey
-->

## Automated Rule Following Machines

Imagine a strange looking contraption sitting on the table infront of you.

Closer examination reveals that an exceptionally long reel-to-reel tape passes
through an electro-mechanical device of some sort. The tape is subdivided so it
appears to be a long line of square "frames". Some of the squares contain
characters, others are empty. When operating, the tape moves through the device
both to the left or to the right, rather like a badly behaved cinema projector.

You notice the "head" (where the tape passes through the device) covers exacty
one square's worth of the tape at any one time. There's a flash of light in the
head when a new square is completely contained therein. Sometimes this is
followed by a clicking sound. When the click is heard you notice that the
character in the square that emerges from the head has changed: either the
character is different or completely rubbed out. Sometimes the tape simply
moves left or right by a certain number of squares to a new position on the
tape before the device continues its strange flashing and clicking operation.

On the front of the machine is a little window. The window is labelled "STATE"
and inside the window you see numbers that change after a flash occurs. The
numbers look like those used to display a date on old wind-up watches: there
appear to be a finite amount of numbered states written on a circular disk
behind the window and, after each flash, the disk rotates to display a new
number, presumably used to identify the new current state. You notice that the
highest number you've seen so far is well into the hundreds. Some numbers keep
coming up again and again or recur in patterns.

After a while the machine comes to a stop. By the head, on the tape, are a
squence of squares containing the rather familiar characters:
`H E L L O _ W O R L D !`. 

Two other objects are on the table. On one side of the contraption is a
photograph of a thoughtful looking man with an old fashioned side parting and
enigmatic smile. On the other side is a sheet of paper full of writing and
whose title you can just make out: "Instructions".

![Alan Turing](/images/alan_turing.jpg)

The instructions are a series of numbered steps that look like the rules of a
game:

1. Start at state 001.
2. Read the character in the current frame on the tape.
3. Given the current state and the character in the current frame, look up what
   to do next. Three things must happen:
* Update or delete the character in the current frame.
* Transition to a new numbered state.
* Move the tape by some number of frames to the left or the right.
4. If the new state is number 000 then stop, otherwise goto step 2.
