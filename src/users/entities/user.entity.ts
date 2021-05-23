import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../users-role.enum";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ length: 128 })
    public name: string;

    @Column({ default: true, type: 'boolean' })
    public active: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    public role: UserRole;
}
