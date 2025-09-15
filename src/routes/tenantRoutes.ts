import { Router } from 'express'
import { container } from 'tsyringe'
import { TenantController } from '../controllers/TenantController'

const tenantRoutes = Router()

tenantRoutes.post('/', (req, res, next) => {
  const tenantController = container.resolve(TenantController)
  tenantController.create(req, res, next)
})

tenantRoutes.get('/', (req, res, next) => {
  const tenantController = container.resolve(TenantController)
  tenantController.list(req, res, next)
})

tenantRoutes.get('/:id', (req, res, next) => {
  const tenantController = container.resolve(TenantController)
  tenantController.findById(req, res, next)
})

tenantRoutes.put('/:id', (req, res, next) => {
  const tenantController = container.resolve(TenantController)
  tenantController.update(req, res, next)
})

tenantRoutes.delete('/:id', (req, res, next) => {
  const tenantController = container.resolve(TenantController)
  tenantController.delete(req, res, next)
})

export default tenantRoutes
