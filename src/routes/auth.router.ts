import express, { NextFunction, Request, Response } from "express";
import { login, register, getUsers } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/authMiddleware";

console.log("AUTH ROUTER INITIALIZED");

const router = express.Router();

// POST /auth/login
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Route hit: /login");
    console.log("Request body:", req.body);
    next();
  },
  login,
);

// POST /auth/register
router.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Route hit: /register");
    console.log("Request body:", req.body);
    next();
  },
  register,
);

// GET /auth/getUsers
router.get(
  "/getUsers",
  verifyToken,
  getUsers,
);

export default router;
