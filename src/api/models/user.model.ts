import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';
import Role from './role.model';

@DefaultScope(() => ({
  include: [{ model: Role, attributes: Object.keys(Role.getAttributes()), include: [] }],
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
}

export interface UserDto {
  uid: string;
  email: string;
  password: string;
  roleId: number;
}

export interface CreateUserDto extends Omit<UserDto, 'uid'> {}

export interface UpdateUserDto extends Partial<UserDto> {}
