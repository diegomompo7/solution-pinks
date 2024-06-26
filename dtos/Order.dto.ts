import { Item } from "./Item.dto";

export type Order = {
  map(arg0: (order: any) => void): unknown;
  id: string;
  state: "PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED" | "ANULADO";
  items: Array<Item>;

};
