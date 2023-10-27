# Build yourself a PyScript

Slides for PyCon 2023.

## Agenda:

* Intro.
  - Who are we
  - What is PyScript?
* Get Python
  - The simplest PyScript / HTMLElement example
  - Let's add MicroPython for the MVP
* Python's context
  - Multiple interpreters underneath the PyScript platform:
    + CPython 3.11 WASM target
    + Pyodide
    + MicroPython
    + Weird shit that you should know is out there
  - Emscripten (filesystem and other libc shims)
  - Packaging (micropip) &lt;py-conf&gt;
  - ...
* Interacting with the browser (quick fire round to get the opponent to submit)
  - Performance "budget": load/startup time, memory, battery (Paul)
  - Accessing the DOM (Nicholas)
  - Storage (filesystem, db) (Paul)
  - Don't block the main thread (Nicholas)
  - Handling events (Paul)
  - Web workers (Nicholas)
  - Synchronous Python in async browsers (Paul)
  - ...
* Final thoughts / sign-posts
  - Building frameworks (see PyperCard)
  - Open source... come play!
  - Other talks at this year's PyCon
* Questions
