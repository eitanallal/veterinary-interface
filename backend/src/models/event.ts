import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Animal from "./animal";
import { Optional } from "sequelize";

@Table({
  tableName: "events",
  timestamps: false, // same as your original
})
export default class Event extends Model<Event> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Animal)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare animal_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare type: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare event_date?: Date;

  @BelongsTo(() => Animal)
  declare animal?: Animal;

  @Column(DataType.VIRTUAL)
  get object() {
    return this.constructor.name.toLowerCase();
  }
}
