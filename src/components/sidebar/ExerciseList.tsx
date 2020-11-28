import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/rootReducer";
import {
    Box, Text, Flex, Button, Heading,
} from "rebass";

export default ({ header, onClose }: { header?: boolean, onClose?: () => void }) => {
    const { currentIndex, exercises } = useSelector((state: RootState) => state.workout);
    return (
        <Flex flexDirection="column">
            {header ? <Heading>Current Workout</Heading> : null}
            {exercises.map((exercise, index) => (
                <Box key={exercise.title}>
                    <Text
                        color={
                            index === currentIndex ? "green" : ""
                        }
                        sx={{
                            textDecoration: index < currentIndex ? "line-through" : "",
                        }}
                    >{`${index + 1} - ${exercise.title}`}
                    </Text>
                </Box>
            ))}
            {onClose ? (
                <Box margin="auto" paddingTop={2}>
                    <Button onClick={onClose}>Close</Button>
                </Box>
            ) : null}
        </Flex>
    );
};
