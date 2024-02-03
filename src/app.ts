import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";



dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})