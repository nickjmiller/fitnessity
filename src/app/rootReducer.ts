import { combineReducers } from "@reduxjs/toolkit";
import { reducer as burgerMenu } from "redux-burger-menu";

import workoutReducer from "../features/workout/workoutSlice";

const rootReducer = combineReducers({
    workout: workoutReducer,
    burgerMenu,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
