jest.mock("../../../src/repositories/firestore.repository", () => ({
  createDoc: jest.fn((c, d) => Promise.resolve({ id: "t1", ...d })),
  listDocs: jest.fn(() => Promise.resolve([{ id: "t1", bio: "b" }])),
  getDoc: jest.fn((c, id) =>
    Promise.resolve(id === "t1" ? { id, bio: "b" } : null)
  ),
  updateDoc: jest.fn((c, id, d) => Promise.resolve({ id, ...d })),
  deleteDoc: jest.fn((c, id) => Promise.resolve({ id })),
}));

import * as svc from "../../../src/services/trainers.service";

describe("Trainers Service", () => {
  it("createProfile", async () => {
    const r = await svc.createProfile({ id: "t1", bio: "b" } as any);
    expect(r).toHaveProperty("id", "t1");
  });
  it("listProfiles", async () => {
    const list = await svc.listProfiles();
    expect(Array.isArray(list)).toBe(true);
  });
  it("getProfile null", async () => {
    const p = await svc.getProfile("missing");
    expect(p).toBeNull();
  });
  it("updateProfile", async () => {
    const u = await svc.updateProfile("t1", { bio: "new" });
    expect(u.bio).toBe("new");
  });
  it("deleteProfile", async () => {
    const d = await svc.deleteProfile("t1");
    expect(d.id).toBe("t1");
  });
});
