import type { ParamsDictionary } from "express-serve-static-core";

export interface ShelfParams extends ParamsDictionary {
  shelfId: string;
}

export interface UserBookParams extends ParamsDictionary {
  userBookId: string;
}
