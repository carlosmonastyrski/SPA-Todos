import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { TodoFolder } from "./todoFolder.entity";

@Entity({name:'todo'})
export class Todo extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({default: false})
    isFinished: boolean;

    @ManyToOne(() => TodoFolder, (folderContainer) => folderContainer.todos)
    @JoinColumn({name:'folder_id'})
    folder: TodoFolder;

}