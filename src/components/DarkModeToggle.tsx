import React from "react";
import { useColorMode } from "theme-ui";
import { Box, Button } from "rebass";

export default () => {
    const [colorMode, setColorMode] = useColorMode();
    return (
        <Box>
            <Button
                mr={2}
                onClick={() => {
                    setColorMode(colorMode === "default" ? "dark" : "default");
                }}
            >
                {colorMode === "default" ? "Dark" : "Light"}
            </Button>
        </Box>
    );
};
