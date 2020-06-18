import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "src/app/rootReducer";
import {
    Flex, Box, Text, Button,
} from "rebass";
import { useThemeUI } from "theme-ui";
import { alpha, shade, darken } from "@theme-ui/color";

Modal.setAppElement("#root");


export default () => {
    const { currentIndex, exercises } = useSelector((state: RootState) => state.workout);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const { theme } = useThemeUI();
    const backgroundColor = darken("background", 0)(theme);
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor,
        },
        overlay: {
            backgroundColor: alpha(shade("background", 0.7)(theme), 0.8)(theme),
        },
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <Box>
            <Button ml={2} onClick={openModal}>
                Workout
            </Button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                onRequestClose={closeModal}
            >
                <Flex flexDirection="column">
                    {exercises.map((exercise, index) => (
                        <Box>
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
                    <Box margin="auto" paddingTop={2}>
                        <Button onClick={closeModal}>Close</Button>
                    </Box>
                </Flex>
            </Modal>
        </Box>
    );
};
