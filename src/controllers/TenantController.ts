import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'tsyringe'
import { ITenantService } from '../services/implementations/ITenantService'

@injectable()
export class TenantController {
  constructor(
    @inject('TenantService')
    private tenantService: ITenantService,
  ) {}

  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { name, configuration } = request.body
      const tenant = await this.tenantService.create({ name, configuration })
      return response.status(201).json(tenant)
    } catch (error) {
      return next(error)
    }
  }

  async list(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const tenants = await this.tenantService.list()
      return response.status(200).json(tenants)
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
      const tenant = await this.tenantService.findById(id)
      return response.status(200).json(tenant)
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
      const { name, configuration } = request.body
      const tenant = await this.tenantService.update(id, {
        name,
        configuration,
      })
      return response.status(200).json(tenant)
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
      await this.tenantService.delete(id)
      return response.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
