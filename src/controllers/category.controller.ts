import { Request, Response } from "express";
import db from "../db/db";

interface Category {
  category_id: string;
  category_name: string;
  created_at: string;
}

export const getCategories = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await db.query<Category>("SELECT * FROM category");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
    console.log(e);
  }
};

export const addCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("=== addCategory called ===");
  console.log("Request body:", req.body);

  const { category_name } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO category(category_name) VALUES ($1) RETURNING *",
      [category_name],
    );

    console.log("Query executed successfully:", result.rows);
    res.status(201).json(result.rows[0]);
  } catch (e: any) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: e.message });
  }
};
