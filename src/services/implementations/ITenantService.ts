import { Tenant } from '../../entities/Tenant'

export interface ICreateTenantDTO {
  name: string
  configuration?: any
}

export interface ITenantService {
  create(data: ICreateTenantDTO): Promise<Tenant>
  list(): Promise<Tenant[]>
  findById(id: string): Promise<Tenant | null>
  update(id: string, data: ICreateTenantDTO): Promise<Tenant>
  delete(id: string): Promise<void>
}
