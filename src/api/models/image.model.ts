import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

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
}

export interface ImageDto {
    id: string;
    name: string;
    description: string;
    path: string;
    labels: string;
}

export interface CreateImageDto extends Omit<ImageDto, 'id'> {}
