import { Router } from 'express'
import { container } from 'tsyringe'
import { StoreController } from '../controllers/StoreController'

const storeRoutes = Router({ mergeParams: true })

storeRoutes.post('/', (req, res, next) => {
  const storeController = container.resolve(StoreController)
  storeController.create(req, res, next)
})

storeRoutes.get('/', (req, res, next) => {
  const storeController = container.resolve(StoreController)
  storeController.getByTenant(req, res, next)
})

storeRoutes.get('/:id', (req, res, next) => {
  const storeController = container.resolve(StoreController)
  storeController.findById(req, res, next)
})

storeRoutes.put('/:id', (req, res, next) => {
  const storeController = container.resolve(StoreController)
  storeController.update(req, res, next)
})

storeRoutes.delete('/:id', (req, res, next) => {
  const storeController = container.resolve(StoreController)
  storeController.delete(req, res, next)
})

export default storeRoutes
