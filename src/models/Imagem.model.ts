import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Visita } from './Visita.model';

@Table({
    tableName: 'imagem',
    timestamps: true
})
export class Imagem extends Model<Imagem> {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    uuid!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    url!: string;

    
    @ForeignKey(() => Visita)
    @Column({ type: DataType.UUID })
    visitaId!: string;

    @BelongsTo(() => Visita)
    visita!: Visita;
}
