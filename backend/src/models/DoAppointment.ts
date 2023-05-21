import { Model,  PrimaryKey, Column, Table, ForeignKey, CreatedAt, UpdatedAt, DataType, DeletedAt, BelongsTo, HasMany, BeforeCreate } from 'sequelize-typescript';
import { Appointment, User } from '.';
import { generateUUID } from '../utils/uuid';

@Table({ tableName: 'DoAppointments' })
export class DoAppointment extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
    })
    public doAppointmentId!: string;
    
    @Column({ type: DataType.STRING })
    @ForeignKey(() => User)
    public userId!: string

    @Column({ type: DataType.STRING })
    @ForeignKey(() => Appointment)
    public appointmentId!: string

    @CreatedAt
    public readonly createdAt!: Date;
  
    @UpdatedAt
    public readonly updatedAt!: Date;

    // associate
    
    @BelongsTo(() => User)
    private user!: User
        
    @BelongsTo(() => Appointment)
    private appointment!: Appointment

    public GetDoctor() {
        return this.user
    }

    public GetAppointment() {
        return this.appointment
    }

    @BeforeCreate
    static generateID(instance: DoAppointment) {
        instance.doAppointmentId = generateUUID()
    }
}