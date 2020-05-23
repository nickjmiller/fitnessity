import React from "react";
import {
    Box, Flex, Heading, Button, Text,
} from "rebass";
import { Slider, Label } from "@rebass/forms";

const WorkoutContainer: React.FC = () => (
    <Box>
        <Flex
            alignItems="Center"
        >
            <Heading
                fontSize={[50, 50, 50]}
                color="primary"
                mx={250}
            >
                Workout
            </Heading>
        </Flex>
        <Text
            fontSize={[30, 30, 30]}
            color="primary"
            mx={250}
        >
            Workout Description
        </Text>
        <Box
            sx={{
                mx: 250,
                px: 3,
            }}
        >
            <Flex px={-5} py={20} width="100%">
                <Box width={1000} px={2}>
                    <Label>Time of Set</Label>
                    <Slider
                        name="Set Length"
                        defaultValue={60}
                    />
                    <Label>Time of Rest</Label>
                    <Slider
                        name="Rest Length"
                        defaultValue={60}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: 0,
                        paddingBottom: "40%",
                        position: "relative",
                        "& > iframe":
                        {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            border: 0,
                        },
                    }}
                >
                    <iframe
                        title="Workouts"
                        width="250"
                        height="200"
                        src="https://www.youtube.com/embed/79fzeNUqQbQ"
                        frameBorder="0"
                    />
                </Box>
                <Box width={1000} px={2}>
                    <Button variant="Start" mx={2} my={1}>Go!</Button>
                    <Button variant="Start" mx={2} my={1}>Next Set!</Button>
                    <Button variant="Start" mx={2} my={1}>Skip</Button>
                    <Button variant="Start" mx={2} my={1}>Pause</Button>
                </Box>
            </Flex>
        </Box>
    </Box>
);

export default WorkoutContainer;
