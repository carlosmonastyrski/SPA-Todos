import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoFolder } from './entities/todoFolder.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoFolder])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
