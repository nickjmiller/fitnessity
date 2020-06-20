import React from "react";
import { useColorMode } from "theme-ui";
import { Box } from "rebass";
import { Switch, Label } from "@rebass/forms";

export default () => {
    const [colorMode, setColorMode] = useColorMode();
    return (
        <Box>
            <Label>
                <Switch
                    id="dark"
                    name="dark"
                    checked={colorMode === "dark"}
                    onClick={() => {
                        setColorMode(colorMode === "default" ? "dark" : "default");
                    }}
                /> Toggle Dark Mode
            </Label>
        </Box>
    );
};
