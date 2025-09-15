import 'reflect-metadata'
import './shared/container'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorHandler)

export default app
