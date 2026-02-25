import express, { Request, Response } from "express";
import { Router } from "express";
import { getBooks } from "../controller/book.controller";
const router = Router();

router.get("/search", getBooks);

export default router;