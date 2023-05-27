import { Model,  PrimaryKey, Column, Table, ForeignKey, CreatedAt, UpdatedAt, DataType, BelongsTo, BeforeCreate, HasOne } from 'sequelize-typescript';
import {User, TestPackage, MedicalRecord, Department, DoAppointment, MedicalResult} from '.'
import { generateUUID } from '../utils/uuid';

@Table({ tableName: 'Appointments' })
export class Appointment extends Model{
  @PrimaryKey
  @Column({ type: DataType.STRING })
  public appointmentId!: string;

  @Column({type: DataType.ENUM("PENDING", "DONE", "ACCEPTED", "CANCELED", "REJECTED")})
  public status!: string;

  @Column({ type: DataType.DATE })
  public dateTime!: Date;

  @CreatedAt
  public readonly createdAt!: Date;

  @UpdatedAt
  public readonly updatedAt!: Date;

  @ForeignKey(() => MedicalRecord)
  @Column({ type: DataType.STRING })
  public medicalRecordId!: string

  @ForeignKey(() => TestPackage)
  @Column({ type: DataType.STRING })
  public testPackageId!: string;

  @ForeignKey(() => Department)
  @Column({ type: DataType.STRING })
  public departmentId!: string

  // association

  @BelongsTo(() => TestPackage)
  private testPackage!: TestPackage
  
  @BelongsTo(() => Department)
  private department!: Department
  
  @BelongsTo(() => MedicalRecord)
  private medicalRecord!: MedicalRecord

  @HasOne(() => DoAppointment)
  private doAppointment!: DoAppointment

  @HasOne(() => MedicalResult)
  private medicalResult!: MedicalResult

  public getTestPackage(): TestPackage {
    return this.testPackage
  }

  public getDepartment() {
    return this.department
  }

  public getMedicalRecord() {
    return this.medicalRecord
  }

  public getDoAppointment() {
    return this.doAppointment
  }

  public getMedicalResult() {
    return this.medicalResult
  }

  @BeforeCreate
  static generateID(instance: Appointment) {
    instance.appointmentId = generateUUID()
  }

}