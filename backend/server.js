
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import AuthRouter from "./routes/AuthRoutes.js";
import connectToDatabase from "./config/mongoose_connection.js";


const app = express();


connectToDatabase(); 
console.log("Database connection function loaded");

app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);

app.use(cookieParser());              
app.use(express.json());              
app.use(express.urlencoded({ extended: true })); 

app.set("view engine", "ejs");
app.use(express.static("public"));    


app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
