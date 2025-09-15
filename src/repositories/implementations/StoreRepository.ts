import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/database'
import { Store } from '../../entities/Store'
import {
  ICreateStoreDTO,
  IPaginatedResult,
  IStoreRepository,
} from '../IStoreRepository'

export class StoreRepository implements IStoreRepository {
  private repository: Repository<Store>

  constructor() {
    this.repository = AppDataSource.getRepository(Store)
  }

  async listByTenantPaginated(
    tenantId: string,
    page: number,
    limit: number,
  ): Promise<IPaginatedResult<Store>> {
    const skip = (page - 1) * limit
    const [data, total] = await this.repository.findAndCount({
      where: { tenantId },
      skip,
      take: limit,
    })

    return { data, total, page, limit }
  }

  async create(data: ICreateStoreDTO): Promise<Store> {
    const store = this.repository.create(data)
    await this.repository.save(store)
    return store
  }

  async findByCode(codeStore: string): Promise<Store | null> {
    return this.repository.findOneBy({ codeStore })
  }

  async findByTenant(tenantId: string): Promise<Store[]> {
    return this.repository.find({ where: { tenantId } })
  }

  async findById(id: string, tenantId: string): Promise<Store | null> {
    return this.repository.findOne({ where: { id, tenantId } })
  }

  async update(
    id: string,
    tenantId: string,
    data: Partial<ICreateStoreDTO>,
  ): Promise<Store | null> {
    await this.repository.update({ id, tenantId }, data)
    return this.findById(id, tenantId)
  }

  async delete(id: string, tenantId: string): Promise<void> {
    await this.repository.delete({ id, tenantId })
  }
}
