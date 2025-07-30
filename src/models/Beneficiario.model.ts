import {Column, DataType, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript'; //BelongsToBelongsTo
import {Visita} from './Visita.model';
//import { AssistenteSocial } from './AssistenteSocial.model';

@Table({
    tableName: 'beneficiario',
    timestamps: true
})
export class Beneficiario extends Model<Beneficiario> {
    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid!: string;

    @Column(DataType.STRING)
    nome!: string;

    @Column(DataType.STRING)
    nome_responsavel!: string;

    @Column(DataType.STRING)
    data_nascimento!: string;

    @Column(DataType.STRING)
    phone1!: string;

    @Column(DataType.STRING)
    phone2!: string;

    @Column({
        type: DataType.GEOMETRY('POINT', 4326),
        allowNull: false
    })
    location!: {
        type: 'Point';
        coordinates: [number, number];
    };

    @HasMany(() => Visita)
    visitas!: Visita[];

    //@ForeignKey(() => AssistenteSocial)
    //@Column(DataType.STRING)
    //assistenteId!: string;

    //@BelongsTo(() => AssistenteSocial)
    //assistente!: AssistenteSocial;
}
