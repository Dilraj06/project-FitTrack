jest.mock("../../../src/repositories/firestore.repository", () => ({
  createDoc: jest.fn((c, d) => Promise.resolve({ id: "ex1", ...d })),
  listDocs: jest.fn(() => Promise.resolve([{ id: "ex1", name: "Push Up" }])),
  getDoc: jest.fn((c, id) =>
    Promise.resolve(id === "ex1" ? { id, name: "Push Up" } : null)
  ),
  updateDoc: jest.fn((c, id, d) => Promise.resolve({ id, ...d })),
  deleteDoc: jest.fn((c, id) => Promise.resolve({ id })),
}));

import * as svc from "../../../src/services/exercises.service";

describe("Exercises Service", () => {
  it("createExercise should return created doc", async () => {
    const res = await svc.createExercise({ name: "Push Up" } as any);
    expect(res).toHaveProperty("id", "ex1");
    expect(res.name).toBe("Push Up");
  });

  it("listExercises should return array", async () => {
    const list = await svc.listExercises();
    expect(Array.isArray(list)).toBe(true);
    expect(list[0].id).toBe("ex1");
  });

  it("getExercise returns item for valid id", async () => {
    const item = await svc.getExercise("ex1");
    expect(item).not.toBeNull();
    expect(item).toHaveProperty("id", "ex1");
  });

  it("getExercise returns null for missing id", async () => {
    const item = await svc.getExercise("missing");
    expect(item).toBeNull();
  });

  it("updateExercise returns merged object", async () => {
    const updated = await svc.updateExercise("ex1", { description: "desc" });
    expect(updated).toHaveProperty("id", "ex1");
    expect(updated.description).toBe("desc");
  });

  it("deleteExercise returns id", async () => {
    const d = await svc.deleteExercise("ex1");
    expect(d).toHaveProperty("id", "ex1");
  });
});
