import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Tenant } from './Tenant'

@Entity('stores')
export class Store extends BaseEntity {
  @Column()
  name!: string

  @Column({ nullable: true })
  description!: string

  @Column({ unique: true, name: 'code_store' })
  codeStore!: string

  @Column({ name: 'api_key_store', nullable: true })
  apiKeyStore!: string

  @Column({ type: 'jsonb', nullable: true })
  configuration: any

  @Column({ type: 'jsonb', nullable: true, name: 'payment_configuration' })
  paymentConfiguration: any

  @Column({ type: 'jsonb', nullable: true })
  metadata: any

  @Column({ name: 'tenant_id' })
  tenantId!: string

  @ManyToOne(() => Tenant, (tenant) => tenant.stores)
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Tenant
}
