import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Exclude } from 'class-transformer';

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
    photo: string

    @Column()
    @Exclude()
    @Validate((object: User, value: string) => object.password === value, {
        message: 'Passwords do not match',
      })
    passwordConfirmation: string;
}
