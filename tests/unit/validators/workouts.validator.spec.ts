import { workoutSchema } from "../../../src/validators/workouts.validator";

describe("Workout Validator", () => {
  it("valid workout", () => {
    const payload = {
      title: "W",
      creatorId: "u1",
      exercises: [{ exerciseId: "ex1", order: 1 }],
    };
    const { error } = workoutSchema.validate(payload);
    expect(error).toBeUndefined();
  });
  it("invalid missing exercises", () => {
    const { error } = workoutSchema.validate({ title: "W", creatorId: "u1" });
    expect(error).toBeDefined();
  });
});
