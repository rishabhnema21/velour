import { Request, RequestHandler, Response } from "express";
import type { UserBookParams } from "../types/params";
export declare const addToLibrary: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getLibraryBooks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBookShelf: RequestHandler<UserBookParams>;
export declare const removeFromLibrary: RequestHandler<UserBookParams>;
export declare const handleLibraryOverview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=library.controller.d.ts.map