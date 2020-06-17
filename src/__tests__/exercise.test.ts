import EXERCISES from "../data/exercises";
import { MUSCLE_MAP } from "../data/MuscleMap";


it("should have a correct mapping for each muscle", () => {
    const muscles = Object.keys(MUSCLE_MAP);
    expect(EXERCISES.filter((exercise) => exercise.muscles
        .some((muscle) => !muscles.includes(muscle)))).toEqual([]);
});
