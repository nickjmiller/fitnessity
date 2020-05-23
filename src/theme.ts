import { system } from "@theme-ui/presets";

export default {
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
            color: "primary",
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
