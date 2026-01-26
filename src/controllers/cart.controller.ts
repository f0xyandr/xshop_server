import { Request, Response } from "express";
import db from "../db/db";

interface CartItem {
  product_id: String;
  quantity: number;
  user_id: String;
}

const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { quantity, user_id } = req.body;
    const { product_id } = req.params;
    const result = await db.query(
      "UPDATE cart_items SET quantity = $1 WHERE product_id = $2 AND user_id = $3",
      [quantity, product_id, user_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
};

const addCartItem = async (req: Request, res: Response) => {
  const { user_id, product_id } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
          VALUES ($1, $2, 1)
          ON CONFLICT (user_id, product_id)
          DO UPDATE SET quantity = cart_items.quantity + 1
          RETURNING *`,
      [user_id, product_id],
    );
    console.log("Query addCartItem executed successfully:", result.rows);
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(401).json("Error 401. Incorrect request");
  }
};

const deleteCartItem = async (req: Request, res: Response) => {};

const deleteCartItems = async (req: Request, res: Response) => {};

const getCartItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query<CartItem[]>(
      "SELECT * FROM cart_items WHERE user_id = $1",
      [id],
    );
    res.status(200).json(result.rows);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

export {
  addCartItem,
  getCartItems,
  deleteCartItem,
  deleteCartItems,
  updateCartItem,
};
