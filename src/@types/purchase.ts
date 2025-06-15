import { Ebook } from "./ebook";

export type Purchase = {
  id: number;
  application_fee?: string;
  created_at?: string;
  updated_at?: string;
  ebook?: Ebook;
};
