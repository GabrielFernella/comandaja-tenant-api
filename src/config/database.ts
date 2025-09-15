import { DataSource } from 'typeorm'
import { join } from 'path'
import { Tenant } from '../entities/Tenant'
import { Store } from '../entities/Store'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db-tenants',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'tenants_db',
  synchronize: false, // Keep false in production
  logging: process.env.NODE_ENV === 'development',
  entities: [Tenant, Store],
  migrations: [
    join(__dirname, '..', 'shared', 'typeorm', 'migrations', '*.{ts,js}'),
  ],
})
