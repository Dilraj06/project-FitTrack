import { trainerSchema } from "../../../src/validators/trainers.validator";

describe("Trainer Validator", () => {
  it("valid trainer", () => {
    const { error } = trainerSchema.validate({ id: "trainer_1", bio: "b" });
    expect(error).toBeUndefined();
  });
  it("rejects missing id", () => {
    const { error } = trainerSchema.validate({ bio: "b" });
    expect(error).toBeDefined();
  });
});
