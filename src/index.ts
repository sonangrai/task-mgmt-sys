import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/db-error";
import cors from "cors";
import path from "path";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Routes
app.use("/api/", router);

const frontendDistPath = path.join(__dirname, "../../frontend/dist");
console.log("Serving frontend from:", frontendDistPath);

// Serve static assets with caching
app.use(
  express.static(frontendDistPath, {
    maxAge: "1y",
    etag: true,
    lastModified: true,
    setHeaders: (res, filepath) => {
      if (filepath.match(/\.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

// Handle SPA routing - Express v5 syntax
app.use((req, res, next) => {
  // If it's an API route, skip
  if (req.path.startsWith("/api/")) {
    return next();
  }

  // If the file doesn't exist in static files, serve index.html
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

// Global Error Handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("app running on PORT -> ", PORT);
  console.log("NODE_ENV:", process.env.NODE_ENV);
});
