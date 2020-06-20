/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutGroup, WORKOUT_MAP, MUSCLE_MAP } from "../../data/MuscleMap";
// eslint-disable-next-line import/named
import EXERCISES, { Exercise } from "../../data/exercises";

const shuffleExercises = (workoutPlan: WorkoutGroup[]) => {
    const array = [...EXERCISES];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    const workout: Exercise[] = [];

    while (workoutPlan.length) {
        const exerciseIndex = array.findIndex(
            (e) => e.muscles.map((m) => WORKOUT_MAP[MUSCLE_MAP[m]]).includes(workoutPlan[0]),
        );
        workout.push(array[exerciseIndex]);
        array.splice(exerciseIndex, 1);
        workoutPlan.shift();
    }

    return workout;
};

const DEFAULT_WORKOUT_PLAN: WorkoutGroup[] = ["Lower", "Upper", "Lower", "Upper", "Core"];

const INITIAL_WORKOUT = shuffleExercises([...DEFAULT_WORKOUT_PLAN]);

type WorkoutState = {
    currentIndex: number;
    defaultSets: number;
    defaultSetTime: number;
    defaultRestTime: number;
    exercises: Exercise[];
    defaultWorkoutPlan: string;
}

const initialState: WorkoutState = {
    currentIndex: 0,
    defaultSets: 3,
    defaultSetTime: 40,
    defaultRestTime: 60,
    exercises: INITIAL_WORKOUT,
    defaultWorkoutPlan: "Balanced",
};

export const WORKOUT_PLANS: { [key: string]: WorkoutGroup[] } = {
    Balanced: ["Lower", "Upper", "Lower", "Upper", "Core"],
    Upper: ["Upper", "Upper", "Upper", "Upper", "Core"],
    Lower: ["Lower", "Lower", "Lower", "Lower", "Core"],
};


const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        setWorkout(state, action: PayloadAction<WorkoutGroup[]>) {
            state.exercises = shuffleExercises(action.payload);
            state.currentIndex = 0;
        },
        setSingleExercise(state, action: PayloadAction<Exercise>) {
            state.exercises = [action.payload];
            state.currentIndex = 0;
        },
        incrementIndex(state) {
            state.currentIndex += 1;
        },
        resetIndex(state) {
            state.currentIndex = 0;
        },
        setDefaultSets(state, action: PayloadAction<number>) {
            state.defaultSets = action.payload;
        },
        setDefaultSetTime(state, action: PayloadAction<number>) {
            state.defaultSetTime = action.payload;
        },
        setDefaultRestTime(state, action: PayloadAction<number>) {
            state.defaultRestTime = action.payload;
        },
        setDefaultWorkout(state, action: PayloadAction<string>) {
            state.defaultWorkoutPlan = action.payload;
        },
        startDefaultWorkout(state) {
            state.exercises = shuffleExercises(WORKOUT_PLANS[state.defaultWorkoutPlan]);
            state.currentIndex = 0;
        },
    },
});

export const {
    incrementIndex,
    resetIndex,
    setDefaultRestTime,
    setDefaultSets,
    setDefaultSetTime,
    setSingleExercise,
    setWorkout,
    setDefaultWorkout,
    startDefaultWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
