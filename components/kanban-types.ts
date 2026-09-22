import type { Ticket } from "../lib/mock-data";

export type LocalTicket = Ticket & { archived?: boolean };
export type Theme = "dark" | "light";
