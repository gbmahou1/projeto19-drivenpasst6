import express, { json } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express()
dotenv.config()

app.use(cors())
app.use(json())
app.use(router)
app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 5009
app.listen(PORT, () => console.log(`Running on PORT ${PORT}`))