import { combineReducers } from "@reduxjs/toolkit";
import { reducer as burgerMenu } from "redux-burger-menu";

import userReducer from "features/user/userSlice";
import workoutReducer from "features/workout/workoutSlice";

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    burgerMenu,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
