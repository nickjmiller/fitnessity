import React, { useState, useEffect } from "react";
import { Routes } from "react-static";
import { Router } from "@reach/router";
import Dynamic from "containers/Dynamic";
import HeaderNav from "components/HeaderNav";
import {
    Box, Text, Flex,
} from "rebass";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import SidebarContent from "./SidebarContent";
import { setUser } from "../features/user/userSlice";

const styles = {
    bmBurgerButton: {
        position: "fixed",
        width: "36px",
        height: "30px",
        left: "36px",
        top: "36px",
    },
    bmBurgerBars: {
        background: "#373a47",
    },
    bmBurgerBarsHover: {
        background: "#a90000",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
    },
    bmCross: {
        background: "#bdc3c7",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100vh",
        top: 0,
        left: 0,
    },
    bmMenu: {
        background: "#373a47",
    },
    bmMorphShape: {
        fill: "#373a47",
    },
    bmItemList: {
        color: "#b8b7ad",
        padding: "0.8em",
    },
    bmItem: {
        display: "inline-block",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.3)",
        top: 0,
    },
};

let mql: MediaQueryList;
if (typeof window !== "undefined") {
    mql = window.matchMedia("(min-width: 800px)");
}

export default () => {
    let sidebarDocked = mql && mql.matches;
    const [sidebarOpen, setSidebarOpen] = useState(sidebarDocked);
    useEffect(() => {
        if (mql) {
            mql.addListener(() => {
                setSidebarOpen(!sidebarOpen);
                sidebarDocked = mql.matches;
            });
        }
    });
    const dispatch = useDispatch();
    Auth.currentAuthenticatedUser().then((user) => {
        dispatch(setUser(user.username));
    });
    return (
        <Flex flexDirection="column" overflow="hidden" id="bdf" height="100vh">
            <HeaderNav />
            <Box
                sx={{
                    width: "100%",
                    flexGrow: 1,
                    paddingBottom: "2em",
                    overflowY: "auto",
                    px: 3,
                }}
            >
                <BurgerMenu styles={styles}>
                    <SidebarContent />
                </BurgerMenu>
                <Box sx={{ maxWidth: 1000, mx: "auto" }}>
                    <React.Suspense fallback={<em>Loading...</em>}>
                        <Router>
                            <Dynamic path="dynamic" />
                            <Routes path="*" />
                        </Router>
                    </React.Suspense>
                </Box>
            </Box>
            <footer>
                <Text fontSize={[10, 11, 12]} color="grey">
                    &copy; Copyright 2020,
                    <> <a href="https://github.com/nickjmiller">nickjmiller</a></>
                    . All rights reserved.
                </Text>
            </footer>
        </Flex>
    );
};
