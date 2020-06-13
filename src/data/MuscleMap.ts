export type WorkoutGroup = "Upper" | "Lower" | "Core";

export type MuscleGroup = "Arms" | "Chest" | "Shoulder" | "Calves" | "Glutes" | "Quadriceps" | "Hamstrings" | "Back" | "Posterior Stabilizers" | "Abs";

export const WORKOUT_MAP: { [key in MuscleGroup]: WorkoutGroup } = {
    Arms: "Upper",
    Chest: "Upper",
    Shoulder: "Upper",
    Calves: "Lower",
    Glutes: "Lower",
    Quadriceps: "Lower",
    Hamstrings: "Lower",
    Back: "Lower",
    "Posterior Stabilizers": "Core",
    Abs: "Core",
};
