import { describe, expect, it } from "vitest";
import { columns, initialTickets } from "./mock-data";
describe("board model", () => {
  it("has the five configured columns", () =>
    expect(columns.map((c) => c.id)).toEqual([
      "backlog",
      "todo",
      "progress",
      "review",
      "done",
    ]));
  it("has stable ticket ids and valid statuses", () => {
    expect(initialTickets.length).toBeGreaterThan(8);
    for (const ticket of initialTickets)
      expect(columns.some((c) => c.id === ticket.status)).toBe(true);
  });
});
