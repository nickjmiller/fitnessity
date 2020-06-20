import { system } from "@theme-ui/presets";
import { lighten } from "@theme-ui/color";

const theme = {
    useColorSchemeMediaQuery: true,
    ...system,
    buttons: {
        primary: {
            backgroundColor: "primary",
            "&:hover": {
                backgroundColor: "gray",
            },
            cursor: "pointer",
            "&:disabled": {
                cursor: "not-allowed",
                opacity: "0.4",
            },
        },
        secondary: {
            backgroundColor: "secondary",
            "&:hover": {
                backgroundColor: "gray",
            },
            cursor: "pointer",
            "&:disabled": {
                cursor: "not-allowed",
                opacity: "0.4",
            },
        },
        outline: {
            backgroundColor: "background",
            border: "2px solid",
            color: "tertiary",
            "&:hover": {
                backgroundColor: "gray",
            },
            cursor: "pointer",
            "&:disabled": {
                cursor: "not-allowed",
                opacity: "0.4",
            },
        },
    },
};

theme.colors.tertiary = theme.colors.secondary;

theme.colors.modes = {
    dark: {
        text: "#fff",
        background: "#23272a",
        primary: theme.colors.primary,
        secondary: lighten("primary", 0.2)(theme),
        tertiary: "#fff",
    },
};

export default theme;
