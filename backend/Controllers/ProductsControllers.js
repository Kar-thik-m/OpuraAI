import Product from "../Modal/Product_schema.js";
import ai from "../Services/GeminiService.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



export const bulkUploadProducts = async (req, res) => {
    try {
        const products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "Please provide an array of products."
            });
        }

        const insertedProducts = await Product.insertMany(products);

        res.status(201).json({
            success: true,
            message: `${insertedProducts.length} products uploaded successfully`,
            products: insertedProducts
        });

    } catch (error) {
        console.error("Bulk upload error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};







export const aiSearch = async (req, res) => {
    try {
        const { query } = req.body;

        // Get products from MongoDB
        const products = await Product.find();

        // Build prompt
        const prompt = `
You are Opura AI, an advanced ecommerce shopping assistant.

Your task:
- Understand the user's shopping intent.
- Find the most relevant products.
- Rank products by relevance.
- Recommend alternatives if needed.
- Consider budget, category, style, color, features, and use case.
- Return ONLY valid JSON.

USER QUERY:
"${query}"

AVAILABLE PRODUCTS:
${JSON.stringify(products)}

Return JSON in this format:

{
  "intent": "",
  "message": "",
  "recommendedProducts": [
    {
      "_id": "",
      "score": 0,
      "reason": ""
    }
  ]
}
`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log("Gemini Raw Response:");
        console.log(result.text);

        // Clean markdown if Gemini adds it
        const cleanedText = result.text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const aiResponse = JSON.parse(cleanedText);

        // Get product IDs chosen by AI
        const recommendedIds = aiResponse.recommendedProducts.map(
            (item) => item._id
        );

        // Fetch full products
        const recommendedProducts = products.filter((product) =>
            recommendedIds.includes(product._id.toString())
        );

        res.status(200).json({
            success: true,
            query,
            intent: aiResponse.intent,
            message: aiResponse.message,
            count: recommendedProducts.length,
            products: recommendedProducts,
            aiRanking: aiResponse.recommendedProducts,
        });

    } catch (error) {
        console.error("AI Search Error:", error);

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};



export const compareProducts = async (req, res) => {
    try {
        const { productIds } = req.body;

        const products = await Product.find({
            _id: { $in: productIds }
        });

        const prompt = `
You are an ecommerce product expert.

Compare these products:

${JSON.stringify(products)}

Return JSON:

{
  "winner":"",
  "bestValue":"",
  "comparison":[]
}
`;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const comparison = JSON.parse(
            result.text
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim()
        );

        res.status(200).json({
            success: true,
            products,
            comparison
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};