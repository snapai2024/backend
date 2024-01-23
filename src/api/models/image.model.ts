import {
  AfterFind,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Collection } from './index';

@Table({ tableName: 'images' })
export default class Image extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare path: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  declare labels: string;

  @ForeignKey(() => Collection)
  @Column
  declare collectionId: number;

  @BelongsTo(() => Collection)
  declare collection: Collection;

  @AfterFind
  static converterHook(instance: Image) {
    instance.labels = JSON.parse(instance.labels);
  }
}

export interface ImageDto {
  id: string;
  name: string;
  description: string;
  path: string;
  labels: string;
  collectionId?: number;
}

export interface CreateImageDto extends Omit<ImageDto, 'id'> {}
