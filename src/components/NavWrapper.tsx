import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "src/app/rootReducer";
import HeaderNav from "./HeaderNav";

export default () => {
    const workout = useSelector((state: RootState) => state.workout.exercises);
    return <HeaderNav workout={workout} />;
};
