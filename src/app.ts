import express from "express";
import { router } from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API Fake fake strore");
});

app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
