import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class TodoFolder extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @OneToMany(() => Todo, (todo) => todo.id, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    todos: Array<Todo>;

}