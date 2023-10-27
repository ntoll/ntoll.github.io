class PyScript extends HTMLElement {
    connectedCallback() {
        // grab the source code.
        const code = this.textContent;
        // Remove the code from the DOM.
        this.textContent = "";
        // JavaScript oh my..! 🤦
        const self = this;
        // Handle STDOUT events.
        document.addEventListener('micropython-print',
            function(e) {
                // Just append event data to the textual
                // content of this element.
                const content = self.textContent + e.data;
                self.textContent = content;
            },
            false
        );
        // Eval the code.
        mp_js_do_str(code);
    }
}


// Inject MicroPython compiled to WASM into the page, via
// a script tag.
const pyElement = document.createElement("script");
pyElement.src = "micropython.js";
pyElement.onload = function(e) {
    // Start up MicroPython
    let mp_js_startup = Module['onRuntimeInitialized'];
    Module["onRuntimeInitialized"] = async function() {
        mp_js_startup();
        mp_js_init(1024*1024);
        // Register the class for the given element name,
        // only after MicroPython is configured.
        customElements.define("py-script", PyScript);
    }
}
const head = document.getElementsByTagName('head')[0];
head.appendChild(pyElement);
