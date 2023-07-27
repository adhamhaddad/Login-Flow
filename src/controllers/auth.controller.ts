import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Session,
  UseGuards
} from '@nestjs/common';
import { AuthUserDto } from '../dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdatePasswordDto } from 'src/dto/update-password.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(GetUserDto)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Post('/register')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const result = await this.authService.createUser(body);
    session.id = result.id;
    return result;
  }

  @Post('/login')
  async authUser(@Body() body: AuthUserDto, @Session() session: any) {
    const result = await this.authService.authUser(
      body.phone_number,
      body.password
    );
    session.id = result.id;
    return result;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async authMe(@Session() session: any) {
    return await this.userService.findOneUser(session.id);
  }

  @Post('/logout')
  async logOut(@Session() session: any) {
    session.id = null;
  }

  @Patch('/change-password/:id')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDto
  ) {
    return await this.authService.updatePassword(id, body);
  }
}
