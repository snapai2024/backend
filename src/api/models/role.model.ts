import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import User from './user.model';

export enum RoleNameEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Table({ tableName: 'roles' })
export default class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => User)
  declare users: User[];
}
