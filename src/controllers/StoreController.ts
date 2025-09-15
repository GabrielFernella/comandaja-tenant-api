import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'tsyringe'
import { IStoreService } from '../services/implementations/IStoreService'

@injectable()
export class StoreController {
  constructor(
    @inject('StoreService')
    private storeService: IStoreService,
  ) {}

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const tenantId = (request as any).tenantId

      const store = await this.storeService.create(
        {
          ...request.body,
        },
        tenantId,
      )
      return response.status(201).json(store)
      return response
        .status(201)
        .json({ message: 'Store created successfully' })
    } catch (error) {
      return next(error)
    }
  }

  async getByTenant(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const tenantId = (request as any).tenantId
      const { page = 1, limit = 10 } = request.query

      const stores = await this.storeService.getByTenant(
        tenantId,
        Number(page),
        Number(limit),
      )

      return response.status(200).json(stores)
    } catch (error) {
      return next(error)
    }
  }

  async findById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = request.params
      const tenantId = (request as any).tenantId
      const store = await this.storeService.findById(id, tenantId)
      return response.status(200).json(store)
    } catch (error) {
      return next(error)
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = request.params
      const tenantId = (request as any).tenantId
      const store = await this.storeService.update(id, request.body, tenantId)
      return response.status(200).json(store)
    } catch (error) {
      return next(error)
    }
  }

  async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = request.params
      const tenantId = (request as any).tenantId
      await this.storeService.delete(id, tenantId)
      return response.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
