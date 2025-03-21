"use strict";
/******************************************************************************
PolyScript. <🦜📜/>

A small, simple, single file kernel of getting scripting languages into the
browser, made for testing purposes and technical exploration.

See the README for more details, design decisions, and an explanation of how
things work.

Authors:
- Nicholas H.Tollervey (ntollervey@anaconda.org)

Copyright (c) 2022 Anaconda Inc. 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
******************************************************************************/

const main = function() {
    /**************************************************************************
    The core PolyScript app definition.

    Its main concern is to:

    * Keep the bare minimum of state.
    * Load and process any configuration from the page.
    * Provide a mechanism for plugins to be registered, configured and then
      started.
    * Load and start the scripting language runtime.
    * Dispatch the following events to signal various changes in state or the
      completion of tasks (such as starting the runtime).
        - "poly-configured", when configuration is processed.
        - "poly-plugin-registered", when a plugin is registered.
        - "poly-plugin-started", when a plugin is started.
        - "poly-runtime-loaded", when the runtime has been downloaded.
        - "poly-runtime-ready", when the runtime is ready to process Python.
        - "poly-file-fetched", when a file, to be added to the runtime's
          filesystem, has been fetched from the network.
        - "poly-files-loaded", when all the files have been copied onto the
          runtime's filesystem.
    * Define, configure and start built-in PolyScript plugins (e.g. the 
      <py-script> tag).
    **************************************************************************/

    const logger = function() {
        /*
        Really simple logging. Emoji 🦜📜 highlights PolyScript app logs. ;-)
        */
        return Function.prototype.bind.call(console.log, console, "🦜📜 ", ...arguments);
    }();
    logger("Starting PolyScript. 👋🦜📜");

    class Runtime {
        /*
        Defines and encapsulates a runtime used by PolyScript to evaluate
        code or run an interactive REPL with a scripting language compiled to
        WASM.
        */

        static get url() {
            /*
            The URL pointing to where to download the runtime.
            */
            return "";
        }

        static ready() {
            /*
            Dispatch the poly-runtime-ready event (for when the runtime has
            eventually started and is ready to evaluate code).
            */
            const polyRuntimeReady = new CustomEvent("poly-runtime-ready", this);
            document.dispatchEvent(polyRuntimeReady);
        }

        static print(output) {
            /*
            Dispatch the polly-print event (for when output is printed).
            */
            const polyPrint = new CustomEvent("poly-print", {detail: output})
            document.dispatchEvent(polyPrint);
        }

        start(config) {
            /*
            Instantiate, setup, configure and do whatever else is needed to
            start the runtime. This is called once the runtime is loaded into
            the browser.
            */
        }

        eval(script) {
            /*
            Use the runtime to evaluate the script.code.
            */
        }

        addFile(path, content) {
            /*
            Copy a file with the referenced path, and content, onto the local
            filesystem available to the runtime.
            */
        }

        startREPL() {
            /*
            Start an interactive REPL session with the runtime.
            */
        }

        stdin(input) {
            /*
            Pass the input into the runtime's stdin.
            */
        }
    }

    // The innerHTML of the default splash screen to show while PolyScript is
    // starting up. Currently the page is greyed out and the words
    // "Loading PolyScript...".
    const defaultSplash= '<div style="position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:9999;"><div style="position:absolute;top:50%;left:50%;color:white;">Loading PolyScript... 🦜</div></div>';

    /**************************************************************************
    Built-in plugins and runtimes.
    **************************************************************************/

    const pyScriptTag = function(){

        // Contains Python scripts found on the page.
        const scripts = [];

        // Contains Python scripts whose source code is available, and pending 
        // evaluation by the runtime.
        const pendingScripts = [];

        // Eventually references the available runtime, once ready.
        let availableRuntime = null;

        // Eventually references the first <py-script> tag into which all
        // stdout will be piped.
        let stdoutTag = null;

        function registerScript(e) {
            /*
            Add a Python script to the scripts array. If required load the code
            by fetching it from the URL found in the script's src attribute.
            */
            const script = e.detail;
            // Ignore code that is just whitespace.
            script.code = script.code.trim() ? script.code : "";
            logger("Registered script. 📄", script);
            scripts.push(script);
            if (script.code) {
                // The script's code was inline.
                const pyLoadedScript = new CustomEvent("py-script-loaded", {detail: script});
                document.dispatchEvent(pyLoadedScript);
            } else if (script.src) {
                // Handle asynchronous loading of the script's code from the
                // URL in src.
                fetch(script.src).then(function(response) {
                    logger(`Fetched script from "${script.src}". 📡`, response);
                    if (response.ok) {
                        response.text().then((data) => {
                            script.code = data;
                            logger("Updated script code. 📄", script);
                            const pyLoadedScript = new CustomEvent("py-script-loaded", {detail: script});
                            document.dispatchEvent(pyLoadedScript);
                        })
                    } else {
                        // Abort.             
                        throw `💥 Cannot load script from "${script.src}"`;
                    }
                });
            } else {
                // Warn that a script has no source code either inline or via
                // the src attribute.
                logger("Script has no source code. ⁉️😕", script);
            }
        }

        function scriptLoaded(e) {
            /*
            The given script is ready to be evaluated.

            Either queue it for later evaluation if the runtime isn't ready
            yet, or dispatch the py-eval-script event to signal to the runtime
            it should evaluate the script.
            */
            if (availableRuntime) {
                // Runtime is ready, so evaluate the code.
                const pyEvalScript = new CustomEvent("py-eval-script", {detail: e.detail});
                document.dispatchEvent(pyEvalScript);
            } else {
                // No runtime, so add to pendingScripts queue, to be evaluated
                // once the runtime is ready.
                pendingScripts.push(e.detail);
            }
        }

        function evaluateScript(e) {
            /*
            Given the runtime is ready AND the script is loaded,
            evaluate the script with the runtime.
            */
            logger("Evaluating code. 🤖\n" + e.detail.code);
            availableRuntime.eval(e.detail);
        }

        function onPrint(e) {
            /*
            Handle print to stdout events.
            */
            if (stdoutTag === null) {
                const firstPyScriptTag = document.querySelector("py-script");
                const preTag = document.createElement("pre");
                firstPyScriptTag.appendChild(preTag);
                stdoutTag = document.createElement("code");
                preTag.appendChild(stdoutTag);
            }
            stdoutTag.innerText = stdoutTag.innerText + e.detail;
        }

        document.addEventListener("py-script-registered", registerScript);
        document.addEventListener("py-script-loaded", scriptLoaded);
        document.addEventListener("py-eval-script", evaluateScript);

        // The object to contain the various functions needed to handle the
        // life cycle of this plugin, returned to the PolyScript environment.
        const plugin = {
            name: "py-script",
            start: function(config) {
                // Define the PyScript element.
                class PyScript extends HTMLElement {
                    connectedCallback() {
                        /*
                        All code is dispatched as a py-script-registered event
                        for later processing.

                        Additional metadata if available:
                            - the src value for remote source file
                            - this element as target
                        */
                        const code = this.textContent;
                        this.textContent = "";
                        const script = {
                            code: code.trim() ? code : "",
                            src: this.attributes.src ? this.attributes.src.value : "",
                            target: this
                        };
                        const pyScriptRegistered = new CustomEvent("py-script-registered", {"detail": script});
                        document.dispatchEvent(pyScriptRegistered);
                        document.addEventListener("poly-print", onPrint);
                    }
                }
                // Register it (thus extracting the code from the page).
                customElements.define('py-script', PyScript);
            },
            onRuntimeReady: function(config, runtime) {
                availableRuntime = runtime;
                // Evaluate any pending scripts.
                pendingScripts.forEach(function(script) {
                    const pyEvalScript = new CustomEvent("py-eval-script", {detail: script});
                    document.dispatchEvent(pyEvalScript);
                })
                // Empty pendingScripts.
                pendingScripts.splice(0, pendingScripts.length);
            }
        }
        return plugin;
    }();

    class MicroPythonRuntime extends Runtime {
        /*
        MicroPython (https://micropython.org) is a lean and efficient
        implementation of the Python 3 programming language that includes a
        small subset of the Python standard library and is optimised to run on
        microcontrollers and in constrained environments. 
        */

        static get url() {
            return "mpbuild/micropython.js";
        }

        start(config) {
            let mp_memory = 1024 * 1024;  // 1Mb
            if(config.mp_memory) {
                mp_memory = config.mp_memory;
            }
            document.addEventListener('micropython-print', function(e) {
                Runtime.print(e.data);
            }, false);
            let mp_js_startup = Module['onRuntimeInitialized'];
            Module["onRuntimeInitialized"] = async function() {
                mp_js_startup();
                mp_js_init(mp_memory);
                Runtime.ready();
            }
        }

        eval(script) {
            mp_js_do_str(script.code);
        }

        addFile(path, content) {
            Module.FS.writeFile(path, content);
        }

        startREPL() {
            mp_js_init_repl();
        }

        stdin(input) {
            const bytes = Uint8Array.from(input.split("").map(x => x.charCodeAt()));
            bytes.forEach(function(b) {
                mp_js_process_char(b);
            });
        }
    }

    // Default configuration settings for PolyScript. These may be overridden
    // by the app.loadConfig function.
    // The "files" object should look like this:
    // "files": {
    //   "myfile.py": "https://domain.com/myfile.py",
    //   "myotherfile.txt": "otherfile.txt"
    // }
    // Key: filename on WASM filesystem.
    // Value: url to download content of file.
    const config = {
        "runtime": "micropython",  // Numpty default.
        "splash": defaultSplash,  // loading message in grey overlay.
        "files": {}  // No files by default.
    }

    // Contains plugins to the PolyScript context.
    const plugins = [];

    // Details of runtimes.
    // Key: lowercase runtime name.
    // Value: the class wrapping that version of the runtime.
    const runtimes = {
        "micropython": MicroPythonRuntime,
    }

    // Files to be loaded to the filesystem once the runtime is loaded (but
    // perhaps not yet ready).
    const filesToLoad = [];

    // Eventually references an instance of the Runtime class, representing the
    // started runtime.
    let runtime = null;

    // Flag to indicate that all the files to be copied into the filesystem
    // (defined in config) have been downloaded and copied over.
    let filesLoaded = false;

    // Flag to indicate the runtime is ready to evaluate scripts.
    let runtimeReady = false;

    // To hold a reference to the div containing the start-up splash screen
    // displayed while PolyScript starts up.
    let splashElement = null;

    function loadConfig() {
        /*
        Loads configuration for running PolyScript from JSON contained in the
        poly-config element. Updates the default config object. Dispatches a
        poly-configured event when done.
        */
        let userConf = {};
        const element = document.querySelector('poly-config');
        if (element) {
            userConf = JSON.parse(element.textContent);
            element.textContent = "";
        } 
        Object.keys(userConf).forEach((key) => {
            config[key] = userConf[key];
        });
        logger("Loaded configuration. ✅", config);
        const polyConfigured = new CustomEvent("poly-configured", {detail: config});
        document.dispatchEvent(polyConfigured);
    }

    function splashOn() {
        /*
        Display the splash screen for when PolyScript is starting.
        */
        splashElement = document.createElement("div");
        splashElement.innerHTML = config.splash;
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(splashElement);
    }

    function splashOff() {
        /*
        Remove the splash screen, once PolyScript is finished starting.
        */
        splashElement.parentNode.removeChild(splashElement);
    }

    function registerPlugin(plugin) {
        /*
        Add a plugin to the PolyScript context, after calling its configure
        method.
        */
        logger(`Registering plugin "${plugin.name}". 🔌`);
        plugin.configure?.(config);
        plugins.push(plugin);
        if (runtimeReady) {
            startPlugin(plugin)
            plugin.onRuntimeReady?.(config, runtime);
        }
        const polyPluginRegistered = new CustomEvent("poly-plugin-registered", {detail: { config: config, plugin: plugin}});
        document.dispatchEvent(polyPluginRegistered);
    }

    function startPlugins() {
        /*
        Start all registered plugins.
        */
        plugins.forEach(function(plugin) {
            startPlugin(plugin);
        })
    }

    function startPlugin(plugin) {
        /*
        Start an individual plugin.
        */
        logger(`Starting plugin "${plugin.name}". ⚡`);
        plugin.start?.(config);
        const polyPluginStarted = new CustomEvent("poly-plugin-started", {detail: { config: config, plugin: plugin}});
        document.dispatchEvent(polyPluginStarted);
    }

    function loadFiles() {
        /*
        Download and add the config.files into the local filesystem accessible
        by the runtime.
        */
        // Holds the promises used to fetch the content of the files.
        const pendingDownloads = [];
        if (config.files) {
            // Iterate the path and associated url (pointing at the content).
            for (let path in config.files) {
                let url = config.files[path];
                logger(`Fetching file "${path}" from: ${url} 📡`);
                // Create a new promise representing the fetch call.
                const filePromise = fetch(url);
                // Ensure the response is handled in the right way.
                filePromise.then(response => {
                    if (response.ok) {
                        response.text().then(content => {
                            if (runtime) {
                                // The runtime exists, so just add the file to
                                // its filesystem.
                                const polyFileFetched = new CustomEvent("poly-file-fetched", {detail: { path: path, content: content}});
                                document.dispatchEvent(polyFileFetched);
                            } else {
                                // No runtime (yet), so push onto the
                                // filesToLoad queue so they're copied over
                                // once the runtime becomes available.
                                filesToLoad.push({
                                    path: path,
                                    content: content
                                });
                            }
                        })
                    } else {
                        // Abort.             
                        throw `💥 Cannot load file from "${url}"`;
                    }
                });
                // Add the promise to the pendingDownloads.
                pendingDownloads.push(filePromise);
            }
        }
        // A meta-promise that resolves when all the fetch promises have
        // successfully resolved, then sets the filesLoaded flag, dispatches
        // the "poly-files-loaded" event and checks if PolyScript has finished
        // setup.
        Promise.all(pendingDownloads).then((values) => {
            filesLoaded = true;
            if (values) {
                logger(`All files downloaded, copying to filesystem. 📥`);
            }
            const polyFilesLoaded = new CustomEvent("poly-files-loaded");
            document.dispatchEvent(polyFilesLoaded);
            finished();
        })
    }

    function onFileFetched(e) {
        /*
        Save the file's content to the path on the runtime's local filesystem.
        */
        logger(`Saving file "${e.detail.path}" to file system. 💾`);
        runtime.addFile(e.detail.path, e.detail.content);
    }

    function loadRuntime() {
        /*
        Given a configuration state, load the runtime specified therein and
        dispatch a poly-runtime-loaded event when done.

        TL;DR - a new script tag with the correct src is added to the head.
        */
        if(!runtimes.hasOwnProperty(config.runtime)) {
            throw `💥 Unknown runtime: "${config.runtime}" (known runtimes: ${Object.keys(runtimes)})`;
        }
        const runtimeElement = document.createElement("script");
        runtimeElement.src = runtimes[config.runtime.toLowerCase()].url;
        runtimeElement.onload = function(e) {
            logger(`Runtime "${config.runtime}" loaded. 👍`);
            const polyRuntimeLoaded = new CustomEvent("poly-runtime-loaded", {detail: config.runtime});
            document.dispatchEvent(polyRuntimeLoaded);
        };
        var head = document.getElementsByTagName('head')[0];
        logger(`Loading runtime "${config.runtime}". 🚀`)
        head.appendChild(runtimeElement);
    }

    function startRuntime() {
        /*
        Configure and start the Python runtime. Now that there is a runtime,
        use it to add any filesToLoad to the filesystem.
        */
        runtime = new runtimes[config.runtime.toLowerCase()]();
        runtime.start(config);
        filesToLoad.forEach(function(file) {
            const polyFileFetched = new CustomEvent("poly-file-fetched", {detail: { path: file.path, content: file.content}});
            document.dispatchEvent(polyFileFetched);
        });
    }

    function runtimeStarted() {
        /*
        The runtime is ready to go, so flip the runtimeReady flag, step
        through each registered plugin's onRuntimeReady method. Then check if
        setup is finished.
        */
        logger(`Runtime started. 🎬`);
        runtimeReady = true;
        plugins.forEach(function(plugin) {
            plugin.onRuntimeReady?.(config, runtime);
        });
        finished();
    }

    function finished() {
        /*
        If both the runtime and filesystem are in a ready state for evaluating
        a user's code.
            - Dispatch the "poly-finished-setup" event to signal everything is
              done.
        */
        if (runtimeReady && filesLoaded) {
            logger(`PolyScript finished setup. 🏁`);
            const polyFinishedSetup = new CustomEvent("poly-finished-setup", {detail: { runtime: runtime}});
            document.dispatchEvent(polyFinishedSetup);
        }
    }

    // The following functions coordinate the unfolding of PolyScript as
    // various events are dispatched and state evolves to trigger the next
    // steps.
    //
    // These functions are defined in the order they're roughly expected to
    // be called through the life-cycle of the page, although this cannot be
    // guaranteed for some of the functions.

    function onPyConfigured(e) {
        /*
        Once PolyScript has loaded its configuration:
            - Register the default plugins (currently only pyScriptTag), so
              they can modify the config if required.
            - Load the Python runtime into the browser.
            - Display the splash screen.
        */
        registerPlugin(pyScriptTag);
        loadFiles();
        loadRuntime();
        splashOn();
    }

    function onRuntimeLoaded(e) {
        /*
        The runtime has loaded over the network.
            - Start the runtime in this PolyScript context.
            - Start the plugins to kick off plugin related aspects of the page.
        */
        startRuntime();
        startPlugins();
    }

    function onRuntimeReady(e) {
        /*
        The runtime is ready to evaluate scripts.
            - Kick off all the pending things needed now it's all started up.
        */
        runtimeStarted();
    }

    function onFinished(e) {
        /*
        Remove the splash screen.
        */
        splashOff();
    }

    // Finally, return a function to start PolyScript.
    return function() {
        // Check to bypass loadConfig, for testing purposes.
        document.addEventListener("poly-configured", onPyConfigured);
        document.addEventListener("poly-runtime-loaded", onRuntimeLoaded);
        document.addEventListener("poly-file-fetched", onFileFetched);
        document.addEventListener("poly-runtime-ready", onRuntimeReady);
        document.addEventListener("poly-finished-setup", onFinished);
        // An object to represent the PolyScript platform in the browser. What
        // is eventually returned from the main() function.
        const polyScript = {
            get config() {
                return config;
            },
            get plugins() {
                return plugins;
            },
            get availableRuntimes() {
                return runtimes;
            },
            get runtime() {
                return runtime;
            },
            get isRuntimeReady() {
                return runtimeReady;
            },
            registerPlugin: function(plugin) {
                registerPlugin(plugin);
            },
            runPython: function(code) {
                if (runtimeReady) {
                    runtime.eval(code);
                }
            },
            start: function() {
                loadConfig();
            }
        };
        return polyScript;
    }
}();


/******************************************************************************
Start PolyScript.
******************************************************************************/
window.polyScript = main();
if (!window.polyscriptTest) {
    window.polyScript.start();
}
