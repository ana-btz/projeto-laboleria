import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
