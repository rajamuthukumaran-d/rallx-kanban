import type { Ticket } from "../../test/mock-data";

export type GroupBy = "status" | "assignee" | "priority";
export type OrderBy = "priority" | "points" | "title";
export type LocalTicket = Ticket & { archived?: boolean };
export type Theme = "dark" | "light";
