import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn, BeforeInsert, Double, OneToMany } from "typeorm"
import * as bcrypt from 'bcryptjs';
import { Transaction } from "./Transaction";

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

    @Column({ type: 'float', default: 0 })
    balance: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.senderId)
    totalSent: Transaction[];

    @OneToMany(() => Transaction, (transaction) => transaction.receiverId)
    totalReceieved: Transaction[]

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async checkIfUnencryptedPasswordIsValid(userPassword: string) {
        return await bcrypt.compare(userPassword, this.password)
    }
}
