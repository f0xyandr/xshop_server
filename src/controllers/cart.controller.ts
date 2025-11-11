import { Request, Response } from "express";
import db from "../db/db";

const addCartItem = async (req: Request, res: Response) => {
  const { user_id, product_id } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO cart(user_id, product_id) VALUES ($1, $2) RETURNING *",
      [user_id, product_id],
    );
    console.log("Query getCartItems executed successfully:", result.rows);
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
    const result = await db.query("SELECT * FROM cart RETURNING *");
    res.status(200).json(result.rows);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

export { addCartItem, getCartItems, deleteCartItem, deleteCartItems };
