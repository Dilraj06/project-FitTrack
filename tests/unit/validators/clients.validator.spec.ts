import { clientSchema } from "../../../src/validators/clients.validator";

describe("Client Validator", () => {
  it("accepts valid client", () => {
    const { error } = clientSchema.validate({ userId: "u1", name: "Aman" });
    expect(error).toBeUndefined();
  });
  it("rejects missing userId", () => {
    const { error } = clientSchema.validate({ name: "Aman" });
    expect(error).toBeDefined();
  });
});
