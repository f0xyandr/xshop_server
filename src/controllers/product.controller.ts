import { Request, Response } from "express";
import db from "../db/db";

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  specs?: string;
}

export const addProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("=== addProduct called ===");
  console.log("Request body:", req.body);

  const { title, price, description, specs } = req.body as Partial<Product>;

  try {
    const result = await db.query<Product>(
      "INSERT INTO products(title, price, description, specs) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, price, description, specs],
    );

    console.log("Query executed successfully:", result.rows);
    res.status(201).json(result.rows[0]);
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const fields = req.body as Partial<Product>;

  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");

  if (keys.length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  try {
    const result = await db.query<Product>(
      `UPDATE products SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id],
    );

    res.json({ ok: true, message: result.rows[0] });
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(200).json({ ok: true, message: `Product ${id} deleted` });
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};

export const getAllProducts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await db.query<Product>("SELECT * FROM products");
    res.status(200).json(result.rows);
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};

export const getOneProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await db.query<Product>(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );
    res.status(200).json(result.rows[0]);
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};

export const fetchRandomProducts = async (req: Request, res: Response) => {
  try {
    const result = await db.query<Product>(
      "SELECT * FROM products ORDER BY RANDOM() LIMIT 10",
    );
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};
