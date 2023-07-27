import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GetUserDto } from '../dto/get-user.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@Serialize(GetUserDto)
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const result = await this.service.findOneUser(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  @Get()
  async findAllUsers(@Query('phone_number') phone_number: string) {
    const result = await this.service.findUsers(phone_number);
    if (!result) {
      throw new NotFoundException('Users not found');
    }
    return result;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return this.service.removeUser(id);
  }
}
