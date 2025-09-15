import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Store } from './Store'

@Entity('tenants')
export class Tenant extends BaseEntity {
  @Column({ unique: true })
  name!: string

  @Column({ type: 'jsonb', nullable: true })
  configuration: any

  @Column({ name: 'api_key_tenant', nullable: true })
  apiKeyTenant!: string

  @OneToMany(() => Store, (store) => store.tenant)
  stores!: Store[]
}
