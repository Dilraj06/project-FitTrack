jest.mock("../../../src/repositories/firestore.repository", () => ({
  createDoc: jest.fn((c, d) => Promise.resolve({ id: "c1", ...d })),
  listDocs: jest.fn(() => Promise.resolve([{ id: "c1", userId: "u1" }])),
  getDoc: jest.fn((c, id) =>
    Promise.resolve(id === "c1" ? { id, userId: "u1" } : null)
  ),
  updateDoc: jest.fn((c, id, d) => Promise.resolve({ id, ...d })),
  deleteDoc: jest.fn((c, id) => Promise.resolve({ id })),
}));

import * as svc from "../../../src/services/clients.service";

describe("Clients Service", () => {
  it("createClient", async () => {
    const r = await svc.createClient({ userId: "u1", name: "A" } as any);
    expect(r.id).toBe("c1");
  });
  it("listClients", async () => {
    const list = await svc.listClients();
    expect(list.length).toBe(1);
  });
  it("getClient null", async () => {
    const g = await svc.getClient("missing");
    expect(g).toBeNull();
  });
  it("updateClient", async () => {
    const up = await svc.updateClient("c1", { weightKg: 70 });
    expect(up.weightKg).toBe(70);
  });
  it("deleteClient", async () => {
    const d = await svc.deleteClient("c1");
    expect(d.id).toBe("c1");
  });
});
