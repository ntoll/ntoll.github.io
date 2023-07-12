/*
Create a new custom tag by inheriting from the HTMLElement class.
*/

class PyScript extends HTMLElement {
    connectedCallback() {
        /*
        Called when the element is first encountered in the DOM.
        */
        const code = this.textContent;  // grab the source code.
        const re = /"(.*?)"/;  // the "Python interpreter". ;-)
        this.textContent = code.match(re)[0].slice(1, -1);  // STDOUT :-)
    }
}

// Register the class for the given element name.
customElements.define("py-script", PyScript);
