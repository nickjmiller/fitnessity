import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Link, Router } from "@reach/router";
import { ThemeProvider } from "emotion-theming";
import { Button } from "rebass";
import FancyDiv from "components/FancyDiv";
import Dynamic from "containers/Dynamic";
import "./app.css";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
    return (
        <Root>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/dynamic">Dynamic</Link>
            </nav>
            <div className="content">
                <FancyDiv>
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Router>
                            <Dynamic path="dynamic" />
                            <Routes path="*" />
                        </Router>
                    </React.Suspense>
                </FancyDiv>
                <ThemeProvider
                    theme={{
                        colors: {
                            background: "black",
                            primary: "tomato",
                        },
                        space: [0, 6, 12, 24, 48],
                        fontSizes: [14, 16, 18, 20, 24],
                        radii: {
                            default: 12,
                        },
                    }}
                >
                    <Button>Beep</Button>
                </ThemeProvider>
            </div>
        </Root>
    );
}

export default App;
