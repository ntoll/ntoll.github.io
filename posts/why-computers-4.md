<!--
.. title: Automated Rule Following Machines
.. slug: why-computers-4
.. date: 2021-01-28 09:00:00 UTC+01:00
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

## Why Computers Work (part 4) 

What follows isn't so much a brain twist, as an extended make-pretend that
points the way to what a computer is.

Imagine a strange looking contraption sitting before you on a table.

It consists of an exceptionally long reel-to-reel tape that passes through an
electro-mechanical device of some sort. The tape is subdivided into square
"frames". Some of the squares contain characters, others are empty. As it
operates, the tape moves through the device both to the left or to the right,
like a badly behaved cinema projector.

![A Turing Machine](/images/turing_machine.jpg)

The "head" (where the tape passes through the device) covers exacty one
square's worth of the tape. There's a flash of light from the head when a new
square is completely contained therein. Sometimes this is followed by a
clicking sound. When the click is heard the character in the square is changed:
it's either different or completely rubbed out. Then the tape moves to the left
or right to a new square before continuing its strange flashing and clicking
operation.

On the front of the machine is a little window. The window is labelled
"`STATE`" and contains numbers that change when each square is "processed" by
the head.

The numbers look like those used to display a date on analog wrist watches:
there appear to be a finite amount of numbered states written on a circular
disk behind the window and the disk rotates to display a new number, presumably
used to identify the _next_ state required by machine for processing the next
square on the tape.

![A date on a wristwatch](/images/wristwatch.png)

After a while the machine comes to a stop. The state window contains the number
0 (zero). By the head, on the tape, are a sequence of squares containing the
familiar characters:

<table class="tape">
    <tr>
        <td class="on">
            <code>H</code>
        </td>
        <td class="on">
            <code>E</code>
        </td>
        <td class="on">
            <code>L</code>
        </td>
        <td class="on">
            <code>L</code>
        </td>
        <td class="on">
            <code>O</code>
        </td>
        <td class="on">
            <code>&nbsp;</code>
        </td>
        <td class="on">
            <code>W</code>
        </td>
        <td class="on">
            <code>O</code>
        </td>
        <td class="on">
            <code>R</code>
        </td>
        <td class="on">
            <code>L</code>
        </td>
        <td class="on">
            <code>D</code>
        </td>
    </tr>
</table>

Two other objects are on the table. On one side of the contraption is a
photograph of a thoughtful looking man with an old fashioned side parting and
_enigmatic_ smile. On the other is a thick ring-bound pile of paper whose title
you can just make out: "Instructions".

The instructions listed on the front page consist of just four rules:

<ol>
  <li>Set the machine to state "1".</li>
  <li>Read the character in the current frame on the tape.</li>
  <li>Given the current state of the machine and the character read from the
  current frame, look up what to do next. "What to do next" is defined by three
  transitions:

    <ul>
      <li>Change to a new numbered state.</li>
      <li>Replace or delete the character in the current frame.</li>
      <li>Move the tape by some number of frames to the left or the right.</li>
    </ul>

  </li>
  <li>If the new state is "0" then stop, otherwise resume from rule 2.</li>
</ol>

On the many pages that follow is a single huge table entitled "What to do
next". It contains thousands of entries under the same five columns, and all
look something like these extracts:

<table>
    <tr>
        <th>CURRENT STATE</th>
        <th>HEAD READ</th>
        <th>&#10132;</th>
        <th>NEXT STATE</th>
        <th>HEAD WRITE</th>
        <th>MOVE TAPE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>"A"</td>
        <td></td>
        <td>785</td>
        <td>"5"</td>
        <td>1L</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
        <td>...</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>516</td>
        <td>" "</td>
        <td></td>
        <td>657</td>
        <td>"!"</td>
        <td>86R</td>
    </tr>
    <tr>
        <td>516</td>
        <td>"#"</td>
        <td></td>
        <td>657</td>
        <td>"!"</td>
        <td>86R</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td></td>
        <td>...</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>1023</td>
        <td>"#"</td>
        <td></td>
        <td>1020</td>
        <td>" "</td>
        <td>23R</td>
    </tr>
</table>

A note, just above the table, explains:

> Each combination of the "CURRENT STATE" and "HEAD READ" values is unique.
> There is one row for each possible combination. Identify the row that
> corresponds to the current state of affairs. The new state of affairs is
> defined by the "NEXT STATE", "HEAD WRITE" and "MOVE TAPE" values on the same
> row.

Therefore, the first line of the extract means that if the machine is in state
_1_ and the head reads the character _"A"_ then the next state is _785_, the
character _"5"_ should be written to the current square, and the tape should
move _1 square to the left_. The final line of the extract means that if the
machine is in state _1023_ and the head reads the character _"#"_ then the next
state is _1020_, the _character should be deleted from the current square_ and
the tape should move _23 squares to the right_.

This is propositional logic..!

It's a table of conditionals whose two premises (the "CURRENT STATE" and
"HEAD READ" values) are conjuncted (logical `AND`) to identify what the
resulting behaviour should be (the "NEXT STATE", "HEAD WRITE", and "MOVE TAPE"
values). `IF` the state is _this_ `AND` the value read by the head is _that_
`THEN` go to the specified _next state_, write _such-and-such_ to the tape and
move the tape by _however many squares in a certain direction_.

If you look carefully, hidden within the extract are also disjuntions (logical
`OR`). The middle two lines (for state _516_) have the same state and outcome,
but different characters read from the head. This is the same as checking `IF`
(the state is _516_ `AND` the head reading is _empty_) `OR` (the state is _516_
AND the head reading is _"#"_) `THEN` the next state is _657_, write _"!"_ to
the tape and the tape should move _86 squares to the right_.

But what is the purpose of this machine? What does it do?

It follows the four rules that start the instruction manual to repeatedly
perform the logical steps defined in the "What to do next" table. The steps in
the table react to and change the state of the characters on the tape in order
to arrive at a desired end result. What that end result is depends upon what's
on the tape when the machine is switched on and how the steps in the table
interact with that starting state and subsequent states of affairs.

In other words, given a certain "what to do next" table, a starting state and
some input on the tape, it computes a result.

It is **a computer!**

If you had the instructions, a copy of the table, a physical tape, a pencil and
an eraser you might follow the rules from the start state (state _1_) until the
end state (state _0_) was achieved. But the machine would do it much faster and
wouldn't get tired or bored.

![A cardboard computer](/images/cardboard_computer.jpg)

This process might feel familiar: deliberately precise rules describe how,
given certain states of affairs, such and such things must happen. States of
affairs unambiguously describe how things are in the world. For example, "the
machine is in state 284 and the current square on the tape contains an `H`".
When I say that such and such must happen, I mean clear and unambiguous
instructions describe how the machine proceeds given a certain state of
affairs.

This is how I described the game of SNAP in the first article!

It turns out that computing a result is not that different to playing a
children's game. Computing a result is the same as following a set of
instructions for changing states of affairs. Such unambiguous instructions
are called algorithms.

_How_ might this imaginary machine actually work?

Just like the logical circuits described in part three, everything about this
machine relies upon physics and the arrangement of its parts in relation to
each other.

Let us pretend it contains the following arrangement of components:

* Two small electric motors, attached to the spools holding the tape, control
  the tape's direction and distance of travel.
* A head reads characters from and writes characters to the frames on the tape.
  The flash of light happens when the character is read from the tape, and the
  clicking sound happens when the current character is deleted and potentially
  replaced with a new character. The head is connected to the rest of the
  device by two bundles of wires, one labelled "read" the other "write". Each
  bundle contains as many wires as there are possible characters to read or
  write on the tape. So, if the head reads the character "A" this is signalled
  by electrical current in the wire labelled "A" in the read bundle.
  Conversely, if the wire for "Z" in the write bundle is on, it acts as a
  signal that the head should write the character "Z" to the current frame on
  the tape.
* Many numbered electrical circuits, all of which are connected to wires
  labelled "input" and "output", control how the machine transitions to the
  next state of affairs. The logical rules in the "What to do next" table are
  encoded by arrangement of transistors on these circuits. The circuit numbered
  as 1, represents the logic for state 1. There is one circuit for each
  possible state.
* A single
  [rotary switching system](https://en.wikipedia.org/wiki/Rotary_system),
  similar to those found in pre-digital telephone exchanges, connects the wires
  from the head and the motors attached to the spools to one circuit at a time
  via a rotating arm. As the arm rotates a different circuit is engaged. As a
  result, the rotary switch defines the current state. In fact, the disk with
  the numbers displayed through the "STATE" window is directly attached to
  the arm. If the number 1 on the disk lines up with the "STATE" window, then
  the arm is in the position to connect the head and motors to the circuit
  numbered as 1, corresponding to the rules defined for state 1 in the "What to
  do next" table. It's important to note that one of the output wires from each
  circuit connects, via the switch, to the arm of the switch. In this way, the
  engaged circuit can control where the arm turns next.

When the machine is switched on, the arm is in position 1 (we know this because
the number 1 is displayed through the "STATE" window). After a flash, a wire
in the head's read bundle becomes live. It indicates the character read from
the current frame on the tape. These wires are routed via the switch to
become the "input" wires going into the circuit relating to state 1. If the
wire for the letter "A" is on then, thanks to the unique arrangement of
transistors, the circuit will produce a consistent output relating to what to
do when in state 1 with letter "A" under the head. If the letter "A" is the
input, the circuit will always produce the same output.

By output I mean the circuit's "output" wires (representing characters) are
routed via the switch to the head's "write" bundle. Let's pretend the wire
relating to the character "5" is live. As a result, the head updates the
current frame on the tape to "5". Additional outputs from the circuit include
the wire connected via the switch to the motor that drives the spools for
moving the tape to the left. It is used to indicate to the motor to move one
frame to the left. A final output wire from the circuit is connected via the
switch to the arm. This is used to indicate the arm should move 784 steps to
the position that corresponds to state 785.

At this point, the machine starts all over again but with the tape in a new
position (one frame to the left of where it started), with a new value to read
from the head (whatever is in this new frame) and with a new circuit engaged
via the switch (relating to state 785, which is the number displayed by the
disk behind the "STATE" window).

If the switch ever engages state 0, the associated circuit does one thing: it
switches the machine off.

For this machine to do anything meaningful, someone will have had to have
carefully crafted the "what to do next" rules so the state of the tape when the
machine is switched on in state 1, is transformed into a completely new yet
useful state when the machine achieves state 0. The transitions to take the
machine from state 1 to state 0 collectively define the algorithm encoded by
the machine's numbered circuits.

![Alan Turing](/images/alan_turing.jpg)

What I've described is a Turing machine. Such an imaginary device was invented
by the British mathematician Alan Turing (the chap in the photograph). It turns
out that anything that can be computed by a set of instructions that manipulate
symbols (the algorithm), can be computed by a Turing machine. Anything that
works in a way that is equivalent to a Turing machine is described as Turing
complete because it, too, is able to compute outcomes from an algorithm. To be
Turing complete is to be a programmable computer.

There are many variations on a Turing machine. The one I've described could be
simplified in a couple of ways:

1. The machine could use multiple tapes with multiple heads rather than a
   single tape and a single head. The information used to make a computation
   is available in concurrent squares on several tapes, rather than as a
   sequence or individual values on one single tape.
2. The alphabet of characters that could be read to or from the tape need only
   consist of two characters: one representing "on", and the other representing
   "off". Put simply, information is represented in a binary fashion as shown
   in the following illustration (white or "1" is on, black or "0" is off).

<table class="tape">
    <tr>
        <td class="on">
            <code>1</code>
        </td>
        <td>
            <code>0</code>
        </td>
        <td class="on">
            <code>1</code>
        </td>
        <td class="on">
            <code>1</code>
        </td>
        <td>
            <code>0</code>
        </td>
        <td>
            <code>0</code>
        </td>
    </tr>
</table>

Each of these changes wouldn't make the machine any more powerful than the one
I've described, but they may make the machine easier to build and program.

The computer you're using to read this article obviously works in a completely
different way to the seemingly ramshackle contraption I describe. While there
is no tape, head or switch inside your computing device, there are transistors
etched into silicon chips that react to and change the state of values stored
in memory, billions of times a second. The chips connect to other parts of your
device via input/output pins. The other parts of your device will be connected
via spacialist hardware and might include things like a screen, keyboard,
mouse, speaker or microphone.

Just as a Turing machine iterates over the same cycle of reading from the head,
writing to the tape and transitioning to a new state, a microprocessor chip,
synchronised by a clock, carries out a similar iterative cycle or working. In
fact, the clock speed of your machine's CPU tells you how many instructions the
chip will carry out each second (for instance, a 3Ghz chip will carry out 3
billion instructions a second).

If you're interested in how an actual chip behaves,
[this link takes you to a simulation of an ARM1 chip](http://www.visual6502.org/sim/varm/armgl.html)
-- a forerunner to those that run your mobile phone. Click on the "play" button
(<img src="/images/play.png" target="_blank" style="display: inline;vertical-align: middle;"/>)
to watch the chip "operate". It's possible to zoom in and out, move around,
speed up or slow down the clock and see how individual transistors are
connected to and interact with each other.

If a computer is simply something that is Turing complete, why is it that we're
able to use such devices to read and write words, hear music, draw pictures,
watch videos and all the other valuable stuff for which we find computers so
useful?

The answer relates to our human talent for abstraction and recognising
patterns.
