import express, { Request, Response, NextFunction } from "express";
import { addCategory, getCategories } from "../controllers/category.controller";

const router = express.Router();

// Path is {host}/api/category/get_categories
router.get(
  "/get_categories",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Route hit: /get_categories");
    console.log("Request body:", req.body);
    next();
  },
  getCategories,
);

router.post(
  // Path is {host}/api/category/category_add
  "/category_add",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Route hit: /category_add");
    console.log("Request body:", req.body);
    next();
  },
  addCategory,
);

export default router;
