import { MANUFACTURERS } from "data/salesPortal/products/manufacturers.js";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}