import {
  AfterFind,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Role from './role.model';
import { Collection } from './index';

@DefaultScope(() => ({
  include: [
    { model: Role, attributes: Object.keys(Role.getAttributes()), include: [] },
    { model: Collection, attributes: Object.keys(Collection.getAttributes()), include: [] },
  ],
}))
@Table({ tableName: 'users' })
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare uid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ForeignKey(() => Role)
  @Column
  declare roleId: number;

  @BelongsTo(() => Role)
  declare role: Role;

  @HasMany(() => Collection, { onDelete: 'cascade' })
  declare collections?: Collection[];

  @AfterFind
  static converterHook(instance: User) {
    if (instance && instance.collections) {
      instance.collections?.forEach((collection) => {
        collection.images?.forEach((image) => {
          image.labels = JSON.parse(image.labels);
        });
      });
    }
  }
}

export interface UserDto {
  uid: string;
  email: string;
  password: string;
  roleId: number;
}

export interface CreateUserDto extends Omit<UserDto, 'uid'> {}

export interface UpdateUserDto extends Partial<UserDto> {}
