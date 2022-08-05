import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('inventory')
@Unique(['product'])
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => ProductEntity, { lazy: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ name: 'total', type: 'int' })
  total: number;
}
