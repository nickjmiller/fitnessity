import React from "react";
import { Box, Flex, Heading } from "rebass";
import { Label, Slider } from "@rebass/forms";
import { ThemeProvider } from "emotion-theming";

const WorkoutContainer: React.FC = () => (
    <ThemeProvider
        theme={{
            colors: {
                background: "black",
                primary: "tomato",
            },
            space: [0, 6, 12, 24, 48],
            fontSizes: [14, 16, 18, 20, 24],
            radii: {
                default: 12,
            },
        }}
    >
        <Box
            sx={{
                maxWidth: 512,
                mx: "auto",
                px: 3,
            }}
        >
            <Flex>
                <Box>
                    <Label htmlFor="percent">Percent</Label>
                    <Slider
                        id="percent"
                        name="percent"
                        defaultValue={25}
                    />
                </Box>
                <Heading>Test</Heading>
            </Flex>
        </Box>
    </ThemeProvider>
);

export default WorkoutContainer;
