import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Router } from "@reach/router";
import Dynamic from "containers/Dynamic";
import { ThemeProvider } from "theme-ui";
import HeaderNav from "components/HeaderNav";
import { Box, Text } from "rebass";
import theme from "./theme";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
    return (
        <Root>
            <ThemeProvider theme={theme}>
                <HeaderNav />
                <Box sx={{
                    maxWidth: "1000px",
                    mx: "auto",
                    px: 3,
                    minHeight: "calc(100vh - 120px)",
                    paddingBottom: "2rem",
                }}
                >
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Router>
                            <Dynamic path="dynamic" />
                            <Routes path="*" />
                        </Router>
                    </React.Suspense>
                </Box>
                <footer style={{
                    marginTop: "auto",
                }}
                >
                    <Text fontSize={[10, 11, 12]} color="grey">
                        &copy; Copyright 2020,
                        <> <a href="https://github.com/nickjmiller">nickjmiller</a></>
                        . All rights reserved.
                    </Text>
                </footer>
            </ThemeProvider>
        </Root>
    );
}

export default App;
