import React, { useEffect } from "react";
import Amplify, { Auth, API, Hub } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";

import { Root, addPrefetchExcludes } from "react-static";
import { ThemeProvider } from "theme-ui";
import { useDispatch, Provider } from "react-redux";
import Layout from "components/Layout";
import awsmobile from "./aws-exports";
import theme from "./theme";

import "./amplify.css";

import { setUser } from "./features/user/userSlice";
import store from "./app/store";

const isLocalHost = (hostname: string) => hostname.includes("localhost") || hostname.includes("127.0.0");

const [webhost, localhost] = awsmobile.oauth.redirectSignIn.split(",");

if (typeof document !== "undefined" && isLocalHost(window.location.hostname)) {
    awsmobile.oauth.redirectSignIn = localhost;
    awsmobile.oauth.redirectSignOut = localhost;
} else {
    awsmobile.oauth.redirectSignIn = webhost;
    awsmobile.oauth.redirectSignOut = webhost;
}

Amplify.configure(awsmobile);

const API_NAME = "fitnessityApi";

const currentDate = new Date().toISOString().split("T")[0];

const getAndRecordUser = async (data?: string) => {
    const user = data || await Auth.currentAuthenticatedUser();
    if (typeof document !== "undefined" && localStorage && (localStorage.lastLogin !== currentDate)) {
        localStorage.lastLogin = currentDate;
        const response = await API.get(API_NAME, `/users/${user.username}`, { headers: {} });
        const userData = response[0] || { user: user.username };
        if (userData.lastLogin !== currentDate) {
            userData.lastLogin = currentDate;
            userData.logins = (userData.logins || 0) + 1;
            API.post(API_NAME, "/users", { headers: {}, body: userData });
        }
    }
    return user.username;
};

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"]);

const App = () => {
    const dispatch = useDispatch();
    getAndRecordUser().then((user) => dispatch(setUser(user)));
    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                case "cognitoHostedUI":
                    getAndRecordUser(data);
                    dispatch(setUser(data.username));
                    break;
                case "signOut":
                    dispatch(setUser(""));
                    break;
                default:
            }
        });
    });
    return (
        <Root>
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        </Root>
    );
};

export default withAuthenticator(() => (
    <Provider store={store}>
        <App />
    </Provider>
));
