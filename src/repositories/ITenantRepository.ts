import { Tenant } from '../entities/Tenant'

export interface ICreateTenantDTO {
  name: string
  configuration?: any
  apiKeyTenant?: string
}

export interface ITenantRepository {
  create(data: ICreateTenantDTO): Promise<Tenant>
  findByName(name: string): Promise<Tenant | null>
  findById(id: string): Promise<Tenant | null>
  list(): Promise<Tenant[]>
  update(id: string, data: Partial<ICreateTenantDTO>): Promise<Tenant | null>
  delete(id: string): Promise<void>
}
