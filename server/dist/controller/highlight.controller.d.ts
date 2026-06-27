import { Request, RequestHandler, Response } from "express";
type createHighlightParams = {
    userBookId: string;
};
type HighlightParams = {
    highlightId: string;
};
export declare const createHighlight: RequestHandler<createHighlightParams>;
export declare const getAllHighlights: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateHighlights: RequestHandler<HighlightParams>;
export declare const deleteHighlights: RequestHandler<HighlightParams>;
export {};
//# sourceMappingURL=highlight.controller.d.ts.map