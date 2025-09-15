import { container } from 'tsyringe'
import { StoreRepository } from '../../repositories/implementations/StoreRepository'
import { TenantRepository } from '../../repositories/implementations/TenantRepository'
import { IStoreRepository } from '../../repositories/IStoreRepository'
import { ITenantRepository } from '../../repositories/ITenantRepository'

import { IStoreService } from '../../services/implementations/IStoreService'
import { ITenantService } from '../../services/implementations/ITenantService'
import { StoreService } from '../../services/StoreService'
import { TenantService } from '../../services/TenantService'

// Repositories
container.registerSingleton<ITenantRepository>(
  'TenantRepository',
  TenantRepository,
)
container.registerSingleton<IStoreRepository>(
  'StoreRepository',
  StoreRepository,
)

// Services
container.registerSingleton<ITenantService>('TenantService', TenantService)
container.registerSingleton<IStoreService>('StoreService', StoreService)
