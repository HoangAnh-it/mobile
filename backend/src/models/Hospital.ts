import { Model, PrimaryKey, Column, Table, CreatedAt, DataType, HasMany, BeforeCreate, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Department, User } from '.';
import { generateUUID } from '../utils/uuid';

@Table({ tableName: 'Hospitals' })
export class Hospital extends Model{
  @PrimaryKey
  @Column({ type: DataType.STRING })
  public hospitalId!: string;


  @Column({ type: DataType.STRING })
  public description!: string;

  @Column({ type: DataType.STRING })
  @ForeignKey(() => User)
  public userId!: string;

  // associate

  @HasMany(() => Department)
  private departments!: Department[]

  @BelongsTo(() => User)
  private user!: User

  public getDepartments(): Department[] {
    return this.departments
  }

  public getUser() {
    return this.user
  }

  @BeforeCreate
  static generateID(instance: Hospital) {
    instance.hospitalId = generateUUID()
  }
}