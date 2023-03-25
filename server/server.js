import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"

import router from "./routes/posts.js";

const app = express()


app.use(bodyParser.urlencoded({extended: true}))
//app.use(express.static("public"))
app.use(cors())
app.use("/posts",router)

const CONNECTION_URL = "mongodb+srv://Wesam:xWkIvv6Un1HyCneG@cluster0.sawbkon.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true})
.then(() => app.listen(5000,() => {
    console.log("the server is running in port 5000")
}))
.catch((error) => console.log(error.message)  )







