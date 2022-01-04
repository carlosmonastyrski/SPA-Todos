import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('/local/signin')
    async signIn(@Res() res, @Body() dto: UserDto){
        const answer = await this.userService.signIn(dto)
        return res.status(HttpStatus.OK).json({answer})
    }

    @Post('/local/signup')
    async signUp(@Res() res, @Body() dto: UserDto){
        const answer = await this.userService.signUp(dto)
        if (answer !== null){
            return res.status(HttpStatus.OK).json({answer})
        }
        else{
            return res.status(HttpStatus.BAD_REQUEST).json({answer: "The username is already taken"})
        }
    }
}
