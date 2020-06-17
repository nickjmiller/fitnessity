import { combineReducers } from "@reduxjs/toolkit";

import workoutReducer from "../features/workout/workoutSlice";

const rootReducer = combineReducers({
    workout: workoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
