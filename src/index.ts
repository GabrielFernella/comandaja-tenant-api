import 'reflect-metadata' // Must be the first import
import { AppDataSource } from './config/database'
import './shared/container' // Import the tsyringe container setup
import app from './server'

const PORT = process.env.PORT || 3005 // Using port 3003 for user-service

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully!')
    app.listen(PORT, () => {
      console.log(`🔥 User Service running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error)

    process.exit(1)
  })
