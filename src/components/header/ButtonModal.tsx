import React from "react";
import Modal from "react-modal";
import {
    Box, Button,
} from "rebass";
import { useThemeUI } from "theme-ui";
import { alpha, shade, darken } from "@theme-ui/color";

Modal.setAppElement("#root");

export default ({ text, View }: { text: string, View: typeof React.Component}) => {
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
            <Button onClick={openModal} px={1} fontSize={[12, 14, 16]}>
                {text}
            </Button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                onRequestClose={closeModal}
            >
                <View />
            </Modal>
        </Box>
    );
};
