import express, { Request, Response } from "express";
import connectDB from "./utils/db";
import storageRoutes from "./routes/routeservice";
import path from "path";
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req: Request, res: Response) => {
  res.send("file storage server is running?");
});
app.use(storageRoutes);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
