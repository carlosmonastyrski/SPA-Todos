import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoFolder } from './entities/todoFolder.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderDto } from './dto/todoFolder.dto';
import { TodoDto } from './dto/todo.dto';
import { throws } from 'assert';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Todo) private todosRepo: Repository<Todo>,
                @InjectRepository(TodoFolder) private foldersRepo: Repository<TodoFolder>){}

    async findAllTodosByFolder(folderId: number): Promise<Todo[]>{
        const folder = await this.todosRepo.find({ relations: ["folder"] , where : { folder : {id : folderId}}})
        return folder;
    }

    async findAllFolders(): Promise<TodoFolder[]>{
        return await this.foldersRepo.find();
    }

    async findFolderById(idFolder: number): Promise<TodoFolder[]>{
        return await this.foldersRepo.findByIds([idFolder]);
    }

    async createFolder(folder: FolderDto): Promise<TodoFolder>{
        console.log(folder)
        const new_folder = new TodoFolder();
        new_folder.description = folder.description;
        console.log(new_folder);
        return await this.foldersRepo.save(new_folder);
    }
    
    async createTask(todo: TodoDto): Promise<Todo>{
        const todo_new = new Todo();
        const folder = await this.foldersRepo.findByIds([todo.folder]);
        todo_new.description = todo.description;
        todo_new.isFinished = false;
        todo_new.folder = folder[0];
        return await this.todosRepo.save(todo_new);
    }

    async updateTodo(todo: TodoDto, idTodo: number): Promise<Todo>{
        const updated_todo = await this.todosRepo.findOne({id:idTodo});
        updated_todo.description = todo.description;
        updated_todo.isFinished = todo.isFinished;
        return await this.todosRepo.save(updated_todo);
    }

    async deleteTodo(todoId: number): Promise<DeleteResult>{
        return await this.todosRepo.delete(todoId);
    }

    async deleteFolder(folderId: number){
        return await this.foldersRepo.delete(folderId);
    }
    
}
