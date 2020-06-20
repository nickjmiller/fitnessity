import React, { useState, useEffect } from "react";
import { Routes } from "react-static";
import { Router } from "@reach/router";
import Dynamic from "containers/Dynamic";
import HeaderNav from "components/HeaderNav";
import {
    Box, Text, Flex,
} from "rebass";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";

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
    return (
        <Sidebar
            docked={sidebarDocked}
            sidebar={<SidebarContent />}
            open={sidebarOpen}
            onSetOpen={() => setSidebarOpen(true)}
        >
            <Flex flexDirection="column" overflow="hidden" height="100vh">
                <HeaderNav />
                <Box sx={{
                    width: "100%",
                    flexGrow: 1,
                    paddingBottom: "2em",
                    overflowY: "auto",
                    px: 3,
                }}
                >
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
        </Sidebar>
    );
};
