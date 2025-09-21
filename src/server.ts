import 'reflect-metadata'
import dotenv from 'dotenv'
import './shared/container'

import cors from 'cors'
import express from 'express'
import routes from './routes'

import errorHandler from './middlewares/errorHandler'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorHandler)

export default app
