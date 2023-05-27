import { Model,  PrimaryKey, Column, Table, ForeignKey, CreatedAt, UpdatedAt, DataType, DeletedAt, BelongsTo, HasMany, BeforeCreate } from 'sequelize-typescript';
import { generateUUID } from '../utils/uuid';
import { Patient } from './Patient';
import { Appointment } from './Appointment';

@Table({ tableName: 'MedicalResults' })
export class MedicalResult extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING })
    public medicalResultId!: string;
    
    @Column({ type: DataType.STRING })
    public disease!: string

    @Column({ type: DataType.STRING })
    public medicines!: string

    @Column({ type: DataType.STRING })
    public note!: Date

    @CreatedAt
    public readonly createdAt!: Date;
  
    @UpdatedAt
    public readonly updatedAt!: Date;

    @ForeignKey(() => Appointment)
    public appointmentId!: string;

    // associate

    @BelongsTo(() => Appointment)
    private appointment!: Appointment


    @BeforeCreate
    static generateID(instance: MedicalResult) {
        instance.medicalResultId = generateUUID()
    }
}