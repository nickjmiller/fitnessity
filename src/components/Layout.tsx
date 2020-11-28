import React from "react";
import { Routes } from "react-static";
import { Router } from "@reach/router";
import {
    Box, Text, Flex,
} from "rebass";
import HeaderNav from "./header/HeaderNav";
import SidebarBurgerMenu from "./sidebar/SidebarBurgerMenu";

export default () => (
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
            <SidebarBurgerMenu />
            <Box sx={{ maxWidth: 1000, mx: "auto" }}>
                <React.Suspense fallback={<em>Loading...</em>}>
                    <Router>
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
