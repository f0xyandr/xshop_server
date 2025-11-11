import express, { Request, Response } from "express";
import { login, register, getUsers } from "../controllers/auth.controller";

const router = express.Router();

// POST /auth/login
router.post(
  "/login",
  (req: Request, res: Response) => {
    console.log("Route hit: /login");
    console.log("Request body:", req.body);
  },
  login,
);

// POST /auth/register
router.post(
  "/register",
  (req: Request, res: Response) => {
    console.log("Route hit: /register");
    console.log("Request body:", req.body);
  },
  register,
);

// GET /auth/getUsers
router.get(
  "/getUsers",
  (req: Request, res: Response) => {
    console.log("Route hit: /getUsers");
    console.log("Request body:", req.body);
  },
  getUsers,
);

export default router;
