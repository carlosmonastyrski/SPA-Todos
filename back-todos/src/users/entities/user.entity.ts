import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({name:'user'})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;
}