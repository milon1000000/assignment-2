import express, { type Application, type Request, type Response, } from "express"
import cookeiParser from "cookie-parser"
import cors from "cors"
import logger from "./middleware/logger.js"
import { authRouter } from "./modules/auth/auth.route.js"
import { globalErrorHandler } from "./middleware/globalErrorHandler.js"
import { issuesRouter } from "./modules/issues/issues.route.js"
const app :Application= express()


app.use(cookeiParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin: 'http://localhost:5000'}));


app.use(logger)

app.get('/', (req:Request, res:Response) => {
res.status(200).json({message:"Express server",author:"Next Level"})
})

app.use("/api/auth",authRouter);
app.use("/api/issues",issuesRouter);




app.use(globalErrorHandler);

export default  app;