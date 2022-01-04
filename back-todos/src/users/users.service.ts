import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepo: Repository<User>,
                private jwtService: JwtService){}

    async signIn(user: UserDto):Promise<String>{
        const current_user =  await this.usersRepo.findOne( {where : { username : user.username}});
        if (!current_user) throw new UnauthorizedException("Incorrect Credentials");
        if (current_user.password !==  user.password) throw new UnauthorizedException("Incorrect Credentials");
        return this.signUser(current_user.id, current_user.username,'user');
    }

    async signUp(user: UserDto):Promise<String>{
        var answer;
        try{
            if(await this.usersRepo.findOne( {where : { username : user.username}}) != null){
                throw "Username Already Used";
            }
            else{
                const newUser = new User();
                newUser.password = user.password;
                newUser.username = user.username;
                await newUser.save()
                answer = await this.signUser(newUser.id, newUser.username,'user');
            }
        }catch (e){
            answer = null;
        }
        finally{
            return answer;
        }
    }

    async signUser(userId: number, username: string, type: string){
        return this.jwtService.sign({
            sub: userId,
            username,
            claim:type,
        });
    }

}
