import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db/db";

const SALT_ROUNDS = 10;
const JWT_SECRET: string = process.env.JWT_SECRET ?? (() => { throw new Error('JWT_SECRET is not defined in environment variables'); })();

console.log("AUTH CONTROLLER INITIALIZED");

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await db.query(
      "INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, passwordHash],
    );

    const newUser = result.rows[0];

    // Create token immediately after registration
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "10h" },
    );

    res.status(201).json({
      user: newUser,
      token: token,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // ищем пользователя
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount === 0) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }

    const user = result.rows[0];
    // сверяем пароль с password_hash из БД
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    // создаём токен
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "10h" },
    );

    // возвращаем юзера и токен в одном объекте
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  console.log(">>> getUsers START");

  try {
    const result = await db.query("SELECT id, username, email FROM users");
    res.status(200).json(result.rows);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
