import {AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import { Admin } from './Admin.model';
import { Visita } from './Visita.model';
//import { Beneficiario } from './Beneficiario.model';

@Table({
    tableName: 'assistente_social',
    timestamps: true
})
export class AssistenteSocial extends Model<AssistenteSocial> {
    @PrimaryKey
    @Column(DataType.STRING)
    uuid!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @Column(DataType.STRING)
    telefone!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    nome!: string;

    @ForeignKey(() => Admin)
    @Column(DataType.STRING)
    adminId!: string;

    @BelongsTo(() => Admin)
    admin!: Admin;

    @HasMany(() => Visita)
    visitas!: Visita[];

    //@HasMany(() => Beneficiario)
    //beneficiarios!: Beneficiario[];
}
