import { Model,  PrimaryKey, Column, Table, ForeignKey, CreatedAt, UpdatedAt, DataType, DeletedAt, BelongsTo, HasMany, BeforeCreate } from 'sequelize-typescript';
import {User, Comment} from '.'
import { generateUUID } from '../utils/uuid';

@Table({ tableName: 'post' })
export class Post extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  public post_id!: string;

  @Column({ type: DataType.STRING })
  public topic!: string;

  @Column({ type: DataType.TEXT })
  public content!: string;

  @Column({ type: DataType.STRING })
  public media!: string;

  @CreatedAt
  public readonly created_at!: Date;

  @UpdatedAt
  public readonly updated_at!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  public auth_id!: string;

  // associate 
  
  @BelongsTo(() => User)
  private auth!: User
  
  @HasMany(() => Comment)
  private comments!: Comment[]

  public getAuth(): User {
    return this.auth
  }

  public getAllComments(): Comment[] {
    return this.comments
  }

  @BeforeCreate
  static generateID(instance: Post) {
    instance.post_id = generateUUID()
  }
}