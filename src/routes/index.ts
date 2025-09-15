import { Router } from 'express'

import { tenantMiddleware } from '../middlewares/tenantMiddleware'
import storeRoutes from './storeRoutes'
import tenantRoutes from './tenantRoutes'
import errorHandler from '../middlewares/errorHandler'

const routes = Router()

routes.get('/', (req, res) => res.send('Tenant Service running'))

routes.use('/tenants', tenantRoutes)

routes.use(tenantMiddleware)
routes.use('/stores', storeRoutes) // Nested route

routes.use(errorHandler)

export default routes
