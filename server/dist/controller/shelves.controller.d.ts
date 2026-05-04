import { Request, Response, RequestHandler } from "express";
import type { ShelfParams } from "../types/params";
export declare const getShelves: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getShelfBooks: RequestHandler<ShelfParams>;
export declare const createCustomShelves: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const renameShelf: RequestHandler<ShelfParams>;
export declare const deleteShelf: RequestHandler<ShelfParams>;
//# sourceMappingURL=shelves.controller.d.ts.map