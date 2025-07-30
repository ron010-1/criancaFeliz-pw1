import {Column, DataType, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import { AssistenteSocial } from './AssistenteSocial.model';

    @Table({
        tableName: 'admin',
        timestamps: true
    })
    export class Admin extends Model<Admin> {
        @PrimaryKey
        @Column(DataType.STRING)
        uuid!: string;

        @Column(DataType.STRING)
        email!: string;

        @Column(DataType.STRING)
        password!: string;

        @HasMany(() => AssistenteSocial)
        assistenteSocial!: AssistenteSocial[];
    };
