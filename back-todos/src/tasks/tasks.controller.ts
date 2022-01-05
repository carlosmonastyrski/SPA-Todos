import { Controller, Get, Res, HttpStatus, Query, Post, Body, Put, Delete, HttpException, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoDto } from './dto/todo.dto';
import { FolderDto } from './dto/todoFolder.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @UseGuards(AuthGuard('jwt'))
    @Get("/")
    async getFolders(@Res() res){
        const folders = await this.tasksService.findAllFolders();
        return await res.status(HttpStatus.OK).json({
            folders
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/folder")
    async getFolderById(@Res() res, @Query('idFolder') idFolder){
        const folder = await this.tasksService.findFolderById(idFolder);
        return await res.status(HttpStatus.OK).json({
            folder
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/tasks")
    async getTasksByFolderId(@Res() res, @Query('idFolder') idFolder){
        try{
            const todos = await this.tasksService.findAllTodosByFolder(idFolder);
            return await res.status(HttpStatus.OK).json({
                todos
             })
        }
        catch (error){
            return await res.status(HttpStatus.BAD_REQUEST).json({
                error: "Error",
                message: "The id provided does not exist"
            })
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/create-task")
    async createTask(@Res() res, @Body() todoDto: TodoDto){
        try{
            const todo = await this.tasksService.createTask(todoDto);
            console.log(todo)
            return await res.status(HttpStatus.OK).json({
                todo
            })
        }
        catch (error){
            return await res.status(HttpStatus.BAD_REQUEST).json({
                error: "Error",
                message: "An error occured while saving"
            })
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/create-folder")
    async createFolder(@Res() res, @Body() folderDto: FolderDto){
        try{
            const folder = await this.tasksService.createFolder(folderDto);
            console.log(folder)
            return await res.status(HttpStatus.OK).json({
                folder
            })
        }
        catch (error){
            return await res.status(HttpStatus.BAD_REQUEST).json({
                error: "Error",
                message: "An error occured while saving"
            })
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/update-task")
    async updateTask(@Res() res, @Body() todoDto: TodoDto, @Query('idTodo') idTodo: number){
        try{
            const todo = await this.tasksService.updateTodo(todoDto,idTodo);
            console.log(todo)
            return await res.status(HttpStatus.OK).json({
                todo
            })
        }
        catch (error){
            return await res.status(HttpStatus.BAD_REQUEST).json({
                error: "Error",
                message: "An error occured while saving"
            })
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/delete-task")
    async deleteTask(@Res() res, @Query('idTodo') idTodo: number){
        try{
            const todo = await this.tasksService.deleteTodo(idTodo);
            return await res.status(HttpStatus.OK).json({
                todo
        })
        }
        catch (error){
            return await res.status(HttpStatus.BAD_REQUEST).json({
                error: "Error",
                message: "An error occured while saving"
            })
        }
    }

    @Delete("/delete-folder")
    async deleteFolder(@Res() res, @Query('idFolder') idFolder: number){
        try{
            const todos = await this.tasksService.findAllTodosByFolder(idFolder);
            await todos.forEach(todo => this.tasksService.deleteTodo(todo.id));
            await this.tasksService.deleteFolder(idFolder);
            return await res.status(HttpStatus.OK).json({
                res: "Ok"
        })
        }
        catch (error){
            return await res.status(HttpStatus.BAD_REQUEST).json({
                error: "Error",
                message: "An error occured while deleting the folder"
            })
        }
    }

}
