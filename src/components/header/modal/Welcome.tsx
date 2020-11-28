import React from "react";
import Modal from "react-modal";
import { Heading } from "rebass";
import { RootState } from "src/app/rootReducer";
import { withAuthenticator } from "aws-amplify-react";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

export default withAuthenticator(() => {
    const { user } = useSelector((state: RootState) => state.user);
    return (<Heading>Welcome {user}</Heading>);
});
