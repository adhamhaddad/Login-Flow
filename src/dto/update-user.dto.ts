import {
  IsString,
  IsOptional,
  Validate,
  ValidationOptions
} from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function IsE164PhoneNumber(validationOptions?: ValidationOptions) {
  return Validate((value: string) => {
    try {
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber && phoneNumber.isValid();
    } catch (error) {
      return false;
    }
  }, validationOptions);
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsE164PhoneNumber()
  @IsOptional()
  phone_number: string;
}
