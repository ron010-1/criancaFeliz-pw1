import {AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import { Admin } from './Admin.model';
import { Imagem } from './Imagem.model';
import { AssistenteSocial } from './AssistenteSocial.model';
import { Beneficiario } from './Beneficiario.model';

@Table({
    tableName: 'visita',
    timestamps: true
})
export class Visita extends Model<Visita> {
    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid!: string;

    @Column(DataType.DATE)
    date!: Date;

    //array de imagens
    @HasMany(() => Imagem)
    imagens!: Imagem[];

    @Column(DataType.STRING)
    evolucao!: string;
    
    @Column(DataType.STRING)
    acompanhamento_familiar!: string;

    @Column(DataType.STRING)
    estimulo_familiar!: string;

    //chave estrangeira
    @ForeignKey(() => AssistenteSocial)
    @Column(DataType.STRING)
    assistenteId!: string; 

    @BelongsTo(() => AssistenteSocial)
    assistente!: AssistenteSocial;

    // chave estrangeira
    @ForeignKey(() => Beneficiario)
    @Column({type:DataType.UUID, defaultValue:DataType.UUIDV4})
    beneficiarioId!: string;

    @BelongsTo(() => Beneficiario)
    beneficiario!: Beneficiario;
}
