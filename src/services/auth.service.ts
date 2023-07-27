import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { User } from '../interfaces/user.interface';
import { Password } from '../interfaces/password.interface';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private userService: UsersService
  ) {}

  async createUser(body: User) {
    // Validate the phone number
    const phoneNumber = parsePhoneNumberFromString(
      body.phone_number,
      'PS' as CountryCode
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      throw new BadRequestException('Invalid phone number');
    }

    const users = await this.userService.findUsers(body.phone_number);
    if (users.length) {
      throw new BadRequestException('Phone number in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.createUser({
      ...body,
      password: result
    });

    return user;
  }
  async authUser(phone_number: string, password: string) {
    const [user] = await this.userService.findUsers(phone_number);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, hash] = user.password.split('.');

    const compare = (await scrypt(password, salt, 32)) as Buffer;
    if (hash !== compare.toString('hex')) {
      throw new BadRequestException('Password is incorrect.');
    }
    return user;
  }

  async updatePassword(id: string, body: Partial<Password>) {
    const checkId = Types.ObjectId.isValid(id);
    if (!checkId) {
      throw new BadRequestException('User id is not valid');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, hash] = user.password.split('.');
    const compare = (await scrypt(body.current_password, salt, 32)) as Buffer;
    if (hash !== compare.toString('hex')) {
      throw new BadRequestException('Current password is incorrect.');
    }
    
    const newSalt = randomBytes(8).toString('hex');
    const newHash = (await scrypt(body.new_password, salt, 32)) as Buffer;
    const newPassword = newSalt + '.' + newHash.toString('hex');

    Object.assign(user, newPassword);
    return user.save();
  }
}
