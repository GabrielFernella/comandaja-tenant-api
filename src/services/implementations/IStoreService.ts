import { Store } from '../../entities/Store'
import { IPaginatedResult } from '../../repositories/IStoreRepository'

export interface ICreateStoreDTO {
  name: string
  description?: string
  configuration?: any
  paymentConfiguration?: any
  metadata?: any
}

export interface IStoreService {
  create(data: ICreateStoreDTO, tenantId: string): Promise<Store>
  getByTenant(
    tenantId: string,
    page: number,
    limit: number,
  ): Promise<IPaginatedResult<Store>>
  findById(id: string, tenantId: string): Promise<Store | null>
  update(id: string, data: ICreateStoreDTO, tenantId: string): Promise<Store>
  delete(id: string, tenantId: string): Promise<void>
}
