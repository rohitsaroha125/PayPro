import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from "typeorm"
import { User } from "./User"

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ManyToOne(() => User, (user) => user.totalSent)
    @Index()
    senderId: number

    @Column()
    @ManyToOne(() => User, (user) => user.totalReceieved)
    @Index()
    receiverId: number

    @Column()
    amount: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}