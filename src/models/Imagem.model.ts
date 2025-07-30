import { Table, Model, PrimaryKey, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Visita } from "./Visita.model";

@Table({
    tableName: 'imagem',
    timestamps: true
})
export class Imagem extends Model<Imagem> {
    @PrimaryKey
    @Column(DataType.STRING)
    uuid!: string;

    @Column(DataType.STRING)
    url!: string;

    @ForeignKey(() => Visita)
    @Column(DataType.STRING)
    visitaId!: string; 

    @BelongsTo(() => Visita)
    visita!: Visita;
    
}
