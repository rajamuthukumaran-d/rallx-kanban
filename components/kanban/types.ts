import type { Ticket } from "../../test/mock-data";

export type LocalTicket = Ticket & { archived?: boolean };
export type Theme = "dark" | "light";
