import { IsString, Validate, ValidationOptions } from 'class-validator';
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

export class AuthUserDto {
  @IsE164PhoneNumber()
  phone_number: string;

  @IsString()
  password: string;
}
