// require ('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({path: './env'});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    }) 
})
.catch((err) => {
    console.log("MONGODB CONNECTION ERROR !! ", err);
})








/*
import express from "express";
const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on("error", (error) =>{
            console.log("ERRR: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`API working on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR:", error)
        throw err
    }
})
 */