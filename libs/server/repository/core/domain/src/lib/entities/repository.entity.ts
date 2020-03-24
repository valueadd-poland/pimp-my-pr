import { f } from '@marcj/marshal';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PrEntity } from './pr.entity';

@Entity()
export class RepositoryEntity {
  @f.primary()
  @PrimaryColumn()
  id: number;

  @Column()
  @f
  fullName: string;

  @Column()
  @f
  name: string;

  @Column()
  @f
  owner: string;

  @Column()
  @f
  pictureUrl: string;

  @Column({ nullable: true })
  @f.optional()
  maxLines?: number;

  @Column({ nullable: true })
  @f.optional()
  maxWaitingTime?: number;

  @f.array(PrEntity)
  prs: PrEntity[] = [];
}
