import express from "express";
import dotenv from "dotenv";
import Connection_To_DB from "./Db/Connect_TO_DB.js";
import productsRoutes from "./Routes/ProductsRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.options("*", cors());

app.use(express.json());
Connection_To_DB();


app.use("/api/products", productsRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});