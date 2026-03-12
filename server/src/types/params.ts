import type { ParamsDictionary } from "express-serve-static-core";

export interface ShelfParams extends ParamsDictionary {
  shelfId: string;
}
