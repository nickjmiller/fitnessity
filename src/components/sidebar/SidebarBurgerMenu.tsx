import React from "react";
import { slide as Menu } from "react-burger-menu";

import { decorator as reduxBurgerMenu } from "redux-burger-menu";
import SidebarContent from "./SidebarContent";

const ReduxBurgerMenu = reduxBurgerMenu(Menu);

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

export default () => (
    <ReduxBurgerMenu styles={styles}>
        <SidebarContent />
    </ReduxBurgerMenu>
);
