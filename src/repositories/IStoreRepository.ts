import { Store } from '../entities/Store'
export interface IPaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ICreateStoreDTO {
  name: string
  description?: string
  codeStore: string
  tenantId: string
  configuration?: any
  paymentConfiguration?: any
  metadata?: any
}

export interface IStoreRepository {
  create(data: ICreateStoreDTO): Promise<Store>
  findByCode(codeStore: string): Promise<Store | null>
  findByTenant(tenantId: string): Promise<Store[]>
  findById(id: string, tenantId: string): Promise<Store | null>
  listByTenantPaginated(
    tenantId: string,
    page: number,
    limit: number,
  ): Promise<IPaginatedResult<Store>>
  update(
    id: string,
    tenantId: string,
    data: Partial<ICreateStoreDTO>,
  ): Promise<Store | null>
  delete(id: string, tenantId: string): Promise<void>
}
