import express from "express";
import dotenv from "dotenv";
import Connection_To_DB from "./Db/Connect_TO_DB.js";
import productsRoutes from "./Routes/ProductsRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
Connection_To_DB();
dotenv.config();


app.use("/api/products", productsRoutes);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.get("/", (req, res) => {
    res.send("API is running...");
});


app.listen(8000, () => {
    console.log(`Server started on port `);
});