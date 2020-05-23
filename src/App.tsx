import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Link, Router } from "@reach/router";
import { tailwind } from "@theme-ui/presets";
import Dynamic from "containers/Dynamic";
import { ThemeProvider } from "emotion-theming";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
    return (
        <Root>
            <ThemeProvider theme={tailwind}>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/exercises">Exercises</Link>
                    <Link to="/dynamic">Dynamic</Link>
                </nav>
                <div>
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Router>
                            <Dynamic path="dynamic" />
                            <Routes path="*" />
                        </Router>
                    </React.Suspense>
                </div>
            </ThemeProvider>
        </Root>
    );
}

export default App;
