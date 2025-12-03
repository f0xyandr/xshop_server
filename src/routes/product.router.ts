import { NextFunction } from "express";
import express, { Request, Response } from "express";
import {
  addProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  fetchRandomProducts,
} from "../controllers/product.controller";

const router = express.Router();

router.post(
  // Path is {host}/api/product/product_add
  "/product_add",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Route hit: /product_add");
    console.log("Request body:", req.body);
    next();
  },
  addProduct,
);

router.patch(
  // Path is {host}/api/product/product_add
  "/product_upd/:id",
  (req, res, next) => {
    console.log("Route hit: /product_upd");
    console.log("Request body:", req.body);
    next();
  },
  updateProduct,
);

router.delete(
  // Path is {host}/api/product/product_del
  "/product_del/:id",
  (req, res, next) => {
    console.log("Route hit: /product_del");
    console.log("Request body:", req.body);
    next();
  },
  deleteProduct,
);

router.get(
  // Path is {host}/api/product/get_one_product
  "/get_one_product/:id",
  (req, res, next) => {
    console.log("Route hit: /get_one_product");
    console.log("Request body:", req.body);
    next();
  },
  getOneProduct,
);

router.get(
  // Path is {host}/api/product/get_all_products
  "/get_all_products/",
  (req, res, next) => {
    console.log("Route hit: /get_all_products");
    console.log("Request body: none", req.body);
    next();
  },
  getAllProducts,
);

router.get(
  //Path is {host}/api/product/fetch_random_products
  "/fetch_random_products",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Route hit: /fetch_random_products");
    console.log(`Request body is: ${req.body}`);
    next();
  },
  fetchRandomProducts,
);

export default router;
