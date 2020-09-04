/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    user: string;
    lastLogin: string;
    logins: number;
}

type UserState = {
    user: string;
    leaderboard: User[];
}
const initialState: UserState = {
    user: "",
    leaderboard: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLeaderboard(state, action: PayloadAction<User[]>) {
            state.leaderboard = action.payload;
        },
        setUser(state, action: PayloadAction<string>) {
            state.user = action.payload;
        },
    },
});

export const {
    setLeaderboard,
    setUser,
} = userSlice.actions;

export default userSlice.reducer;
