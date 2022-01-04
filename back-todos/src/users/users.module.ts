import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  imports :  [TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'secret_password_jwt'})],
  controllers: [UsersController]
})
export class UsersModule {}
