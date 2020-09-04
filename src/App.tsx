import React from "react";
import Amplify, { Auth, API, Hub } from "aws-amplify";

import { withAuthenticator } from "aws-amplify-react";
import { Root, addPrefetchExcludes } from "react-static";
import { ThemeProvider } from "theme-ui";
import { Provider } from "react-redux";
import Layout from "components/Layout";
import awsmobile from "./aws-exports";
import theme from "./theme";

import "./amplify.css";

import store from "./app/store";

Amplify.configure(awsmobile);

const API_NAME = "fitnessityApi";

const currentDate = new Date().toISOString().split("T")[0];

const getAndRecordUser = async () => {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const response = await API.get(API_NAME, `/users/${user.username}`, { headers: {} });
    const userData = response[0] || { user: user.username };
    if (userData.lastLogin !== currentDate) {
        userData.lastLogin = currentDate;
        userData.logins = (userData.logins || 0) + 1;
        API.post(API_NAME, "/users", { headers: {}, body: userData });
    }
};

const recordUseLogin = async () => {
    if (typeof document !== "undefined" && localStorage && (localStorage.lastLogin !== currentDate)) {
        localStorage.lastLogin = currentDate;
        try {
            await getAndRecordUser();
        } catch {
            Hub.listen("auth", () => {
                getAndRecordUser();
            });
        }
    }
};

recordUseLogin();

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

const App = () => (
    <Root>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        </Provider>
    </Root>
);

export default withAuthenticator(App);
