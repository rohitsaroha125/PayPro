import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    firstName: string

    @Column({nullable: false})
    lastName: string

    @Column({unique: true, nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @Column({nullable: true})
    photo: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
