import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/database'
import { Tenant } from '../../entities/Tenant'
import { ICreateTenantDTO, ITenantRepository } from '../ITenantRepository'

export class TenantRepository implements ITenantRepository {
  private repository: Repository<Tenant>

  constructor() {
    this.repository = AppDataSource.getRepository(Tenant)
  }

  async create({
    name,
    configuration,
    apiKeyTenant,
  }: ICreateTenantDTO): Promise<Tenant> {
    const tenant = this.repository.create({ name, configuration, apiKeyTenant })
    await this.repository.save(tenant)
    return tenant
  }

  async findByName(name: string): Promise<Tenant | null> {
    return this.repository.findOneBy({ name })
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.repository.findOneBy({ id })
  }

  async list(): Promise<Tenant[]> {
    return this.repository.find()
  }

  async update(
    id: string,
    data: Partial<ICreateTenantDTO>,
  ): Promise<Tenant | null> {
    await this.repository.update(id, data)
    return this.findById(id)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
