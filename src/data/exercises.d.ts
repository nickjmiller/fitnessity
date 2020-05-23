type Muscle = "abs" | "hamstrings" | "glutes" | "quads" | "balance" | "shoulder" | "stretch" | "back" | "chest" | "triceps" | "biceps";
type Equipment = "bar" | "chair" | "block" | "ab roller" | "weight";

export type Exercise = {
    title: string;
    description: string;
    mucles: Muscle[];
    equipment: Equipment[];
    alternate: boolean;
};

declare const exercises: Exercise[];

export default exercises;
