import express, { Request, Response, NextFunction } from "express";
import {
  addCartItem,
  getCartItems,
  deleteCartItem,
  deleteCartItems,
} from "../controllers/cart.controller";

const router = express.Router();

// Типы для удобства
interface AddCartItemBody {
  userId: string;
  productId: number;
}

interface DeleteCartItemBody {
  userId: string;
  productId: number;
}

interface GetCartParams {
  id: string;
}

// POST {host}/cart/add_cart_item
router.post(
  "/add_cart_item",
  (
    req: Request<{}, {}, AddCartItemBody>,
    res: Response,
    next: NextFunction,
  ) => {
    console.log("Hit route /cart/add_cart_item");
    console.log("Request body:", req.body);
    next();
  },
  addCartItem,
);

// GET {host}/cart/get_items/:id
router.get(
  "/get_items/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Hit route /cart/get_items/:id");
    console.log("Request params:", req.params);
    next();
  },
  getCartItems,
);

// DELETE {host}/cart/delete_cart_item
router.delete(
  "/delete_cart_item",
  (
    req: Request<{}, {}, DeleteCartItemBody>,
    res: Response,
    next: NextFunction,
  ) => {
    console.log("Hit route /cart/delete_cart_item");
    console.log("Request body:", req.body);
    next();
  },
  deleteCartItem,
);

// DELETE {host}/cart/delete_cart_items
router.delete(
  "/delete_cart_items",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Hit route /cart/delete_cart_items");
    console.log("Request body:", req.body);
    next();
  },
  deleteCartItems,
);

export default router;
