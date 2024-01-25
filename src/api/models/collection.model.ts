import {
  AfterFind,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Image from './image.model';
import { User } from './index';

@DefaultScope(() => ({
  include: [{ model: Image, attributes: Object.keys(Image.getAttributes()), include: [] }],
}))
@Table({ tableName: 'collections' })
export default class Collection extends Model {
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
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  declare default: boolean;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Image, { onDelete: 'cascade' })
  declare images?: Image[];

  @AfterFind
  static converterHook(instance: Collection) {
    instance.images?.forEach((image) => {
      image.labels = JSON.parse(image.labels);
    });
  }
}

export interface CollectionDto {
  id: string;
  name: string;
  userId: number;
}

export interface CreateCollectionDto extends Omit<CollectionDto, 'id'> {}
