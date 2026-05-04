import { Request, RequestHandler, Response } from "express";
import type { UserBookParams } from "../types/params";
export declare const addToLibrary: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getLibraryBooks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBookShelf: RequestHandler<UserBookParams>;
export declare const removeFromLibrary: RequestHandler<UserBookParams>;
//# sourceMappingURL=library.controller.d.ts.map