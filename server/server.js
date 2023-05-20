import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"

import formRouter from "./routes/form.js";
import quizRouter from "./routes/quiz.js"
import groupsRouter from "./routes/groups.js"
import assignGroup from "./routes/assignGroup.js"
import apportunityRouter from "./routes/opportunity.js"
import storeRouter from "./routes/store.js"
import transactionRouter from "./routes/transaction.js"
import helmet from "helmet";
import morgan from "morgan";

const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.use("/form",formRouter)
app.use("/quiz",quizRouter)
app.use("/groups",groupsRouter)
app.use("/assignGroup",assignGroup)
app.use("/opportunity",apportunityRouter)
app.use("/store",storeRouter)
app.use("/transaction",transactionRouter)

//const CONNECTION_URL = "mongodb+srv://Wesam:xWkIvv6Un1HyCneG@cluster0.sawbkon.mongodb.net/?retryWrites=true&w=majority"
const CONNECTION_URL = "mongodb://localhost:27017/UsersData"
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true})
.then(() => app.listen(5000,() => {
    console.log("the server is running in port 5000")
}))
.catch((error) => console.log(error.message)  )







