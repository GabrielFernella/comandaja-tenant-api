import { inject, injectable } from 'tsyringe'
import { Store } from '../entities/Store'
import { AppError } from '../errors/AppError'
import {
  IPaginatedResult,
  IStoreRepository,
} from '../repositories/IStoreRepository'
import { ITenantRepository } from '../repositories/ITenantRepository'
import { IStoreService } from './implementations/IStoreService'

interface IRequest {
  name: string
  description?: string
  codeStore: string
  tenantId: string
  configuration?: any
  paymentConfiguration?: any
  metadata?: any
}

@injectable()
export class StoreService implements IStoreService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
    @inject('TenantRepository')
    private tenantRepository: ITenantRepository,
  ) {}

  async list(): Promise<Store[]> {
    throw new Error('Method not implemented.')
  }

  async create(data: IRequest): Promise<Store> {
    const tenant = await this.tenantRepository.findById(data.tenantId)
    if (!tenant) {
      throw new AppError('Tenant not found', 404)
    }

    const storeExists = await this.storeRepository.findByCode(data.codeStore)
    if (storeExists) {
      throw new AppError('Store with this code already exists.')
    }

    const store = await this.storeRepository.create(data)
    return store
  }

  async getByTenant(
    tenantId: string,
    page: number,
    limit: number,
  ): Promise<IPaginatedResult<Store>> {
    return this.storeRepository.listByTenantPaginated(tenantId, page, limit)
  }

  async findById(id: string, tenantId: string): Promise<Store> {
    const store = await this.storeRepository.findById(id, tenantId)
    if (!store) {
      throw new AppError('Store not found in this tenant', 404)
    }
    return store
  }

  async update(
    id: string,
    data: Partial<IRequest>,
    tenantId: string,
  ): Promise<Store> {
    await this.findById(id, tenantId) // Check if store exists in tenant
    const updatedStore = await this.storeRepository.update(id, tenantId, data)
    if (!updatedStore) {
      throw new AppError('Failed to update store', 500)
    }
    return updatedStore
  }

  async delete(id: string, tenantId: string): Promise<void> {
    await this.findById(id, tenantId) // Check if store exists in tenant
    await this.storeRepository.delete(id, tenantId)
  }
}
