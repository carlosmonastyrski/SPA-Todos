import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'carlos',
    password: 'password',
    database: 'ensolvers_db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    retryDelay: 3000,
    retryAttempts: 10
  }), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
