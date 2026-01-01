import express from "express";
import cors from "cors";
import cartRouter from "./routes/cart.router";
import authRouter from "./routes/auth.router";
import categoryRouter from "./routes/category.router";

import productRouter from "./routes/product.router";
import { errorHandler } from "./middlewares/errorHandler";

console.log("APP FILE LOADED");

const app = express();
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.get("/test", (req, res) => {
  console.log(">>> TEST ROUTE HIT");
  res.send("ok");
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
