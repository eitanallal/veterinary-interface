import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Event from "./event";

@Table({
  tableName: "animals",
  timestamps: false, // same as your original
})
export default class Animal extends Model<Animal> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare species: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare birth_date?: Date;

  @HasMany(() => Event)
  declare events?: Event[];
}
