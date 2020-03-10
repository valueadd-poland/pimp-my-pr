import { f } from '@marcj/marshal';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PrEntity } from './pr.entity';

@Entity()
export class RepositoryEntity {
  @f.primary()
  @PrimaryColumn()
  id: string;

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
