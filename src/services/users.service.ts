import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(body: User) {
    const createdUser = new this.userModel(body);
    return createdUser.save();
  }

  async findOneUser(id: string): Promise<User> {
    const checkId = Types.ObjectId.isValid(id);
    if (!checkId) {
      throw new BadRequestException('User id is not valid');
    }
    return await this.userModel.findById(id).exec();
  }

  async findUsers(phone_number: string): Promise<User[]> {
    return await this.userModel.find({ phone_number }).exec();
  }

  async updateUser(id: string, attrs: Partial<User>) {
    const checkId = Types.ObjectId.isValid(id);
    if (!checkId) {
      throw new BadRequestException('User id is not valid');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return user.save();
  }
  async removeUser(id: string): Promise<User> {
    const checkId = Types.ObjectId.isValid(id);
    if (!checkId) {
      throw new BadRequestException('User id is not valid');
    }

    const result = await this.userModel.findOneAndDelete({ _id: id }).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }
}
