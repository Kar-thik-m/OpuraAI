import express from "express";
import { createProduct, getAllProducts, bulkUploadProducts, aiSearch, compareProducts } from "../Controllers/ProductsControllers.js";

const router = express.Router();

router.post("/post", createProduct);
router.post("/bulkPost", bulkUploadProducts);
router.get("/getAll", getAllProducts);
router.post("/search", aiSearch);
router.post("/compare", compareProducts);

export default router;
