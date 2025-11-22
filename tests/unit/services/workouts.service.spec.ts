jest.mock("../../../src/repositories/firestore.repository", () => ({
  createDoc: jest.fn((c, d) => Promise.resolve({ id: "w1", ...d })),
  listDocs: jest.fn(() => Promise.resolve([{ id: "w1", title: "W" }])),
  getDoc: jest.fn((c, id) =>
    Promise.resolve(id === "w1" ? { id, title: "W" } : null)
  ),
  updateDoc: jest.fn((c, id, d) => Promise.resolve({ id, ...d })),
  deleteDoc: jest.fn((c, id) => Promise.resolve({ id })),
}));

import * as svc from "../../../src/services/workouts.service";

describe("Workouts Service", () => {
  it("createWorkout", async () => {
    const r = await svc.createWorkout({
      title: "W",
      creatorId: "u1",
      exercises: [],
    } as any);
    expect(r).toHaveProperty("id", "w1");
  });
  it("listWorkouts", async () => {
    const list = await svc.listWorkouts();
    expect(Array.isArray(list)).toBe(true);
  });
  it("getWorkout not found", async () => {
    const item = await svc.getWorkout("missing");
    expect(item).toBeNull();
  });
  it("updateWorkout", async () => {
    const up = await svc.updateWorkout("w1", { title: "New" });
    expect(up.title).toBe("New");
  });
  it("deleteWorkout", async () => {
    const d = await svc.deleteWorkout("w1");
    expect(d).toHaveProperty("id", "w1");
  });
});
