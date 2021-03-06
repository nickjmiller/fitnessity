type Equipment = "bar" | "chair" | "block" | "ab roller" | "weight";

export type Exercise = {
    title: string;
    description: string;
    muscles: string[];
    equipment: Equipment[];
    alternate: boolean;
    videoSrc: string;
};

declare const exercises: Exercise[];

export default exercises;
