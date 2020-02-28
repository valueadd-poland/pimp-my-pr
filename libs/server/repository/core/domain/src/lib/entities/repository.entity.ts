import { f } from '@marcj/marshal';
import { PrEntity } from './pr.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  @f.array(PrEntity)
  prs: PrEntity[] = [];
}
