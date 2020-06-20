import React from "react";
import { Box } from "rebass";
import { Slider, Label } from "@rebass/forms";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/app/rootReducer";
import { setDefaultSets, setDefaultSetTime, setDefaultRestTime } from "../features/workout/workoutSlice";

export default () => {
    const {
        defaultSets,
        defaultSetTime,
        defaultRestTime,
    } = useSelector((state: RootState) => state.workout);
    const dispatch = useDispatch();

    const setDefaultSetCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDefaultSets(parseInt(event.target.value, 10)));
    };

    const setDefaultTimer = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDefaultSetTime(parseInt(event.target.value, 10)));
    };

    const setDefaultRest = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDefaultRestTime(parseInt(event.target.value, 10)));
    };
    return (
        <Box>
            <Label>
                Sets:
                {` ${defaultSets}`}
            </Label>
            <Slider
                name="Set Length"
                defaultValue={defaultSets}
                onChange={setDefaultSetCount}
                min="1"
                max="12"
            />
            <Label>
                Set Time:
                {` ${defaultSetTime}s`}
            </Label>
            <Slider
                name="Set Length"
                defaultValue={defaultSetTime}
                onChange={setDefaultTimer}
                min="5"
                max="120"
            />
            <Label>
                Rest Time:
                {` ${defaultRestTime}s`}
            </Label>
            <Slider
                name="Rest Length"
                defaultValue={defaultRestTime}
                onChange={setDefaultRest}
                min="5"
                max="120"
            />
        </Box>
    );
};
