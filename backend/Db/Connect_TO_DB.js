import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const Connection_To_DB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_Url);
        console.log("Database connected");

    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
        process.exit(1);
    }
}
export default Connection_To_DB;