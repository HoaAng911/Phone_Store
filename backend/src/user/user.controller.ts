import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService:UserService){}


@Get()
getAll(){
  return this.usersService.findAll()
}
@Get('stats')
getStats(){
  return this.usersService.getUserStats()
}
@Get(":id")
getOne(@Param('id' ,ParseIntPipe) id:number){
return this.usersService.findOne(id)
}

@Post()
create(@Body() body:CreateUserDto){
  return this.usersService.create(body)
}
@Put(':id')
update(@Param('id',ParseIntPipe)id:number,@Body() body:UpdateUserDto){
  return this.usersService.update(id,body)
}
@Delete(':id')
remove(@Param('id',ParseIntPipe)id:number){
  return this.usersService.remove(id)
}

}
