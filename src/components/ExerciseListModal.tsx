import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "src/app/rootReducer";
import {
    Flex, Box, Text, Button,
} from "rebass";

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};


export default () => {
    const { currentIndex, exercises } = useSelector((state: RootState) => state.workout);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <Box>
            <Button onClick={openModal}>
                Show Workout
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
                                    index === currentIndex ? "green" : "black"
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
