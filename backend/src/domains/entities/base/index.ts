import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

// Base class containing common properties
@Entity({ name: "BaseEntity" })
export class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;
}

// Entity with soft delete functionality
@Entity({ name: "BaseSoftDelete" })
export class BaseSoftDelete extends BaseEntity {
  @Column({ default: false, name: "is_deleted" })
  public isDeleted: boolean;
}
