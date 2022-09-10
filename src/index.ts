import express, { json } from "express";
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()

dotenv.config()

app.use(cors())
app.use(json())

const PORT: number = Number(process.env.PORT) || 5009

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`))