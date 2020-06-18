import React from "react";
import { Root, Routes, addPrefetchExcludes } from "react-static";
import { Router } from "@reach/router";
import Dynamic from "containers/Dynamic";
import { ThemeProvider } from "theme-ui";
import NavWrapper from "components/NavWrapper";
import { Box, Text, Flex } from "rebass";
import { Provider } from "react-redux";
import theme from "./theme";

import store from "./app/store";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
    return (
        <Root>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Flex flexDirection="column" justifyContent="" height="100vh">
                        <NavWrapper />
                        <Box sx={{
                            maxWidth: 1024,
                            width: "100%",
                            mx: "auto",
                            flexGrow: 1,
                            paddingBottom: "2em",
                            px: 3,
                        }}
                        >
                            <React.Suspense fallback={<em>Loading...</em>}>
                                <Router>
                                    <Dynamic path="dynamic" />
                                    <Routes path="*" />
                                </Router>
                            </React.Suspense>
                        </Box>
                        <footer>
                            <Text fontSize={[10, 11, 12]} color="grey">
                                &copy; Copyright 2020,
                                <> <a href="https://github.com/nickjmiller">nickjmiller</a></>
                                . All rights reserved.
                            </Text>
                        </footer>
                    </Flex>
                </Provider>
            </ThemeProvider>
        </Root>
    );
}

export default App;
