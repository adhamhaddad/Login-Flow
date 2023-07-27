import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from '../services/users.service';
import { UsersModule } from './users.module';
import { UserSchema } from '../schemas/user.schema';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor }
  ]
})
export class AuthModule {}
