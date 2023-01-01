<!--
.. title: 8-Bit Archaeology: Part 1
.. slug: 8-bit-archaeology-1
.. date: 2023-01-01 21:00:00 UTC+01:00
.. tags: 
.. category: 
.. link: 
.. description: 
.. type: text
.. author: Nicholas H.Tollervey
-->

This is the first in a semi-regular series of posts about digital archaeology
relating to 1980s era 8-bit microcomputers. In a strange turn of events, not
only am I the archaeologist, but it is my own code that is to be uncovered and
interpreted.

<hr class="section_break"/>

> The aim was to democratise computing. We didn’t want people to be controlled
> by it, but to control it.
>
> ~ [David Allen, Project Editor, BBC Computer Literacy Project](https://www.nesta.org.uk/report/the-legacy-of-bbc-micro/).

As a child, the first programming language I learned was
[Sophie Wilson's](https://en.wikipedia.org/wiki/Sophie_Wilson)
[BBC Basic](https://en.wikipedia.org/wiki/BBC_BASIC), written for Acorn's
[BBC Micro](https://en.wikipedia.org/wiki/BBC_Micro). Without this formative
experience, I wouldn't have become a professional software engineer.

Most of my childhood was spent in the 1980s, and in 1982-ish the UK Government
ensured every school in the UK had a BBC micro.

<figure>
<img src="/images/bbc_micro.jpg" alt="A BBC micro from the 1980s" title="A BBC micro from the 1980s"/>
<figcaption>A BBC Micro from the 1980s. Source: <a href="https://commons.wikimedia.org/wiki/File:BBC_Micro_Front_Restored.jpg">StuartBrady, Public domain, via Wikimedia Commons</a>.</figcaption>
</figure>

My father was headteacher of a school, and so brought his newly arrived
computer back home one holiday to figure out how to use it. It didn't take very
long to prize the device away from him, and so I started to explore the
"Welcome" software, loaded from a tape via a sequence of squeaks and growls
(representing the bytes to load into the computer's memory). Since I would have
only been eight at the time the
[user guide](/static/files/BBC_User_Guide.pdf) was beyond my understanding,
so a trip to the local library furnished me with a new book aimed at kids who
wanted to play games on their computers. The book in question was
[Computer Spacegames](https://drive.google.com/file/d/0Bxv0SsvibDMTNlMwTi1PTlVxc2M/view?resourcekey=0-kaU6eyAmIVhT3_H8RkHfHA) published by
[Usborne](https://usborne.com/), a title in their famously brilliant series of
[colourful and engaging books about coding](https://usborne.com/gb/books/computer-and-coding-books).

The first proper program I ever typed into the BBC can be found on page 5. It's
a sort of text based rocket pilot game... you have to take off before the
aliens get you:

```basic
10 CLS
20 PRINT "STARSHIP TAKE-OFF"
30 LET G=INT(RND(1)*20)
40 LET W=INT(RND(1)*40)
50 LET R=G*W
60 PRINT "GRAVITY= "; G
70 PRINT "TYPE IN FORCE"
80 FOR C=1 TO 10
90 INPUT F
100 IF F>R THEN PRINT "TOO HIGH";
110 IF F<R THEN PRINT "TOO LOW";
120 IF F=R THEN GOTO 190
130 IF C<>10 THEN PRINT ", TRY AGAIN"
140 NEXT C
150 PRINT
160 PRINT "YOU FAILED -"
170 PRINT "THE ALIENS GOT YOU"
180 STOP
190 PRINT "GOOD TAKE OFF"
```

I have a vivid memory of my aunt, uncle and cousins visiting at the
time. My cousin Michael (five years older than me) shared a fascination with
computers. As a teenager he was clearly at a more advanced level of
understanding, and it was from him that I got lots of tips, tricks and
encouragement to goof around.

So I did.

I changed line 160 to read:

```basic
160 PRINT "YOU ARE AN IDIOT"
```

Then I persuaded my unsuspecting Uncle Colin to play.

Since he's an engineer I think he got the
impression there was some sort of simulated Newtonian mechanics going on and
took it quite seriously. Of course, if you read the code, it's just a glorified
guessing game. When he inevitably failed to take off, I remember he exclaimed
"how rude", muttered something about the computer being broken then wandered
off to escape any further computer-related space piloting catastrophes. But my
eight-year-old self was delighted. I spent the next ten minutes laughing
like a maniac at having hoodwinked an adult with my modified code.

Emboldened by this turn of events (and Michael's mischievous teenager-y
encouragement) I soon graduated to a new form of entertainment when dragged
shopping by my parents. I'd wander off on my own to find the computer
stands in retailers. Being a kid, I was mostly ignored as I typed code into
the demonstration machines.

Code like this:

```basic
10 CLS
20 PRINT "YOU ARE AN IDIOT"
30 GOTO 20
```

I'd walk away (after typing `RUN`) and surreptitiously observe the next person
to encounter the demonstration machines... all telling them they were an idiot
ad infinitum. I soon realised the shop assistants could clear my
school-boy silliness by pressing the `ESCAPE` or `BREAK` keys. Yet I also
realised it was possible for the function of such keys to be modified: some of
the code ran on my school's BBC micro clearly made sure any accidental or
deliberate use of `ESCAPE` or `BREAK` didn't interfere with whatever
software the teacher had set up for us to use.

I had to wait for the next visit of my cousin Michael to learn how to "improve"
my code so it defeated shop assistants. To cut a long story short it's possible
to rebind the `ESCAPE` and `BREAK` keys to the extent that the only way to stop
the machine from doing what it's doing is to switch it off and on again. My
cousin pointed out that the answers to such problems could be found in the
(afore linked) user guide. In fact rebinding `BREAK` was explained on page 143
and disabling `ESCAPE` involved this magic incantation at the start of your
source code:

```basic
10 *FX 200,3
```

I was off!

Most importantly, I realised the user guide wasn't a boring manual for adults
but, if approached in the right way, it was the source of all sorts of useful
knowledge and information and I merely had to figure out how to find it. I was
also helped by yet-more-computer-books from Usborne and my local library, a
subscription to
[Acorn User Magazine](https://archive.org/search.php?query=acorn+user&sin=&and[]=mediatype%3A%22texts%22)
and various aspects of the BBC's magnificent
[Computer Literacy Project](https://clp.bbcrewind.co.uk/),
including TV programmes like this one:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/jtMWEiCdsfc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

You can [watch all the original 146 programmes online](https://clp.bbcrewind.co.uk/programmes).

But in the end I learned an important ethical lesson.

After leaving my unstoppable and mildly
insulting code running on a BBC micro at the Mansfield branch of
[WHSmith](https://en.wikipedia.org/wiki/WHSmith), I was horrified to see one of
the retail assistants reprimanded by their supervisor. My joke wasn't funny and
I realised my code had consequences for others. A lesson that stays with me
to this day.

I also learned that revealing technical skill and knowledge can be tricky and,
at times, intimidating to others.

I remember getting a severe telling-off after I tried to help one of my
parent's teaching colleagues, the subject matter specialist for computing. I
was still at Primary school (probably around ten years old) and the ensuing
conversation, in front of my class mates, revealed the teacher's ignorance of
some aspect of how the BBC micro created sounds.

The conversation went something like this:

> TEACHER: "You can only make sounds like _this_."<br/>
> ME: "But Mrs.S, it's easier to make sounds like **that**."<br/>
> TEACHER: "You're wrong Nicholas. That simply won't work."<br/>
> ME: "Oh yes it will."<br/>
> (I demonstrate the damn thing working.)

In my enthusiasm to share a cool hack, I undermined the teacher and paid the
price with a bollocking.

To be clear, I wasn't rude. But I was certainly a confident enough ten-year-old
to know I had an easier way to make things work, while being naive to think
this would be welcomed. To be fair, I don't think they did themselves any
favours by telling me it simply wouldn't work. A more open minded teacher would
have said something like, "OK Nicholas, show me your way and let's compare
notes", and used the situation as an opportunity for learning. Yet, as a former
teacher myself, I know that it's often impossible to go off piste in a tightly
structured or time constrained lesson.

Such reminiscences are a prelude to the real digital archaeology.

Last year I found my old BBC micro, and a box full of floppy disks, in my
parent's loft. With their permission I took my finds to the UK's
[National Museum of Computing](https://www.tnmoc.org/) (based at Bletchley Park
~ a mere 15 minute drive from where I live). I'll describe the details in a
follow-up post, but with the generous help of others, I was able to extract the
content of the disks.

By way of preview, <a href="https://bbc.godbolt.org/?&disc1=https://ntoll.org/static/bbcdiscs/music.ssd&autoboot" target="_blank">this link takes you to an online BBC emulator running a
sort of "greatest hits" compilation of programmed musical performances</a>.

I put together the disk
from various sources floating around my friendship group, and included some of
my own code too. The disk's menu system is of my own creation but based upon
two other fragments of code I found in a magazine: one for driving a disk menu,
the other for using arrow keys for selecting items. I'm also responsible for
the rather awful renditions of "The Swan" and "The Road Goes Ever On" (a
musical setting of some of J.R.R.Tolkien's poetry from the Lord of the Rings,
by [Donald Swann](https://en.wikipedia.org/wiki/Donald_Swann)). If I remember
correctly, I was thirteen years old (in year 9, 1987) when I put this disk
together. As we'll see in future posts, it was a significant year for me in
terms of coding and music.

Use the up and down arrows on your keyboard to navigate the menu. Keys like
`RETURN` (to make a selection) and `ESCAPE` (to stop a piece and return to the
menu) will behave as usual. However, I'm sorry to report I used the `*FX 200,3`
trick with "The Swan" ~ you're just going to have to sit through that
monstrosity in its entirety without the use of the `ESCAPE` key.

"You're welcome", says my thirteen year old self. ;-)

This is but a small example of some of the fascinating things I've found.

In future posts I'll reveal more about my programming, dive a little
into the technology I was using and try to place it all into the context of
my life at the time. As some of you already know, I'm actually a classically
trained musician, and this has some bearing on what I've managed to find... or
more accurately, what I've managed to find has some bearing on why I'm a
classically trained musician, who works as a software engineer with a passion
for computing education.

Finally, it turns out that the BBC micro didn't
[create a legacy of fond memories and technical skill just for me](https://www.nesta.org.uk/report/the-legacy-of-bbc-micro/).
There are many folks of my age who have similar stories to tell.

Happy new year! More soon...
