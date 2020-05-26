/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

// Your top level component
import App from "./App";

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (typeof document !== "undefined") {
    const target = document.getElementById("root");
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/service-worker.js").then((registration) => {
                console.log("SW registered: ", registration);
            }).catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
        });
    }
    const renderMethod = target.hasChildNodes()
        ? ReactDOM.hydrate
        : ReactDOM.render;

    const render = (Comp: Function) => {
        renderMethod(
            <AppContainer>
                <Comp />
            </AppContainer>,
            target,
        );
    };

    // Render!
    render(App);

    // Hot Module Replacement
    if (module && module.hot) {
        module.hot.accept("./App", () => {
            render(App);
        });
    }
}
