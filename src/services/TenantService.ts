import { injectable, inject } from 'tsyringe'
import { Tenant } from '../entities/Tenant'
import { AppError } from '../errors/AppError'
import { ITenantRepository } from '../repositories/ITenantRepository'
import { ITenantService } from './implementations/ITenantService'

interface IRequest {
  name: string
  configuration?: any
}

@injectable()
export class TenantService implements ITenantService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository,
  ) {}

  async create({ name, configuration }: IRequest): Promise<Tenant> {
    const tenantExists = await this.tenantRepository.findByName(name)

    if (tenantExists) {
      throw new AppError('Tenant with this name already exists.')
    }

    // You can add logic here to generate api keys if needed
    const apiKeyTenant = 'some-generated-key' // Placeholder

    const tenant = await this.tenantRepository.create({
      name,
      configuration,
      apiKeyTenant,
    })

    return tenant
  }

  async list(): Promise<Tenant[]> {
    return this.tenantRepository.list()
  }

  async findById(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findById(id)
    if (!tenant) {
      throw new AppError('Tenant not found', 404)
    }
    return tenant
  }

  async update(id: string, data: Partial<IRequest>): Promise<Tenant> {
    await this.findById(id) // Check if tenant exists
    const updatedTenant = await this.tenantRepository.update(id, data)
    if (!updatedTenant) {
      throw new AppError('Failed to update tenant', 500)
    }
    return updatedTenant
  }

  async delete(id: string): Promise<void> {
    await this.findById(id) // Check if tenant exists
    await this.tenantRepository.delete(id)
  }
}
