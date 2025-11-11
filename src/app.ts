import express from "express";
import cartRouter from "./routes/cart.router";
import authRouter from "./routes/auth.router";
import productRouter from "./routes/product.router";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
