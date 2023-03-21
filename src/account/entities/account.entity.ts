import { Exclude } from 'class-transformer';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Account extends Model<Account> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
