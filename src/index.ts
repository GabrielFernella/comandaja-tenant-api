import 'reflect-metadata' // Must be the first import
import app from './server'
import './shared/container' // Import the tsyringe container setup
import { initializeDataSource } from './config/database'

const PORT = process.env.PORT || 3005 // Using port 3003 for user-service

async function bootstrap() {
  try {
    await initializeDataSource()
    console.log('✅ Database connection established')

    app.listen(PORT, () => {
      console.log(`🔥 Tenant Service running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to initialize the application:', error)
    process.exit(1)
  }
}

bootstrap()
