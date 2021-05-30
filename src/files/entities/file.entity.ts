import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class File extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ length: 128 })
    public name: string;

    @Column()
    public path: string;
}