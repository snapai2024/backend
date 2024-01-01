import {
    AutoIncrement, BelongsTo,
    Column,
    DataType, DefaultScope, ForeignKey, HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import Image from './image.model';
import { User } from './index';

@DefaultScope(() => ({
    include: [
        { model: Image, attributes: Object.keys(Image.getAttributes()), include: [] },
    ],
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

    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => Image, { onDelete: 'cascade' })
    declare images?: Image[]
}

export interface CollectionDto {
    id: string;
    name: string;
    userId: number;
}

export interface CreateCollectionDto extends Omit<CollectionDto, 'id'> {}
