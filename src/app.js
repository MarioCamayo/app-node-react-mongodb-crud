import express, { json } from 'express'
import morgan from 'morgan'
import {connectDB} from './db.js'
import authRoutes from './routes/auth.routes.js'


connectDB()


const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api',authRoutes)




export default app

