import React from "react";
import { Root, addPrefetchExcludes } from "react-static";
import { ThemeProvider } from "theme-ui";
import { Provider } from "react-redux";
import Layout from "components/Layout";
import theme from "./theme";

import store from "./app/store";

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

function App() {
    return (
        <Root>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Layout />
                </Provider>
            </ThemeProvider>
        </Root>
    );
}

export default App;
