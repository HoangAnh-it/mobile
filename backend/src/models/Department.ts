import { Model,  PrimaryKey, Column, Table, ForeignKey, CreatedAt, UpdatedAt, DataType, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import {Hospital} from '.'
import { generateUUID } from '../utils/uuid';

@Table({
    tableName: 'Departments',
})
export class Department  extends Model{
  @PrimaryKey
  @Column({
      type: DataType.STRING,
  })
  public departmentId!: string;

  @Column({ type: DataType.STRING })
  public name!: string

  @Column({ type: DataType.STRING })
  public avatar!: string

  @ForeignKey(() => Hospital)
  @Column({ type: DataType.STRING })
  public hospitalId!: string;

  @CreatedAt
  public readonly createdAt!: Date;

  // association

  @BelongsTo(() => Hospital)
  private hospital!: Hospital
  

  public getHospital(): Hospital {
    return this.hospital
  }

  @BeforeCreate
  static generateID(instance: Department) {
    instance.departmentId = generateUUID()
  }
}