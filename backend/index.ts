import { clerkMiddleware } from "@clerk/express";
import { createClient } from "@libsql/client";
import cors from "cors";
import "dotenv/config";
import { drizzle } from "drizzle-orm/singlestore/driver";
import express from "express";

const app = express();
const client = createClient({ url: `file:sqlite.db` });
const db = drizzle(client);
app.use(clerkMiddleware());
// Dynamically handles your local dev or your deployed Render frontend URL
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [allowedOrigin],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "Backend is alive and connected!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
