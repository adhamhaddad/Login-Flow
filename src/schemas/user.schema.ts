import * as mongoose from 'mongoose';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

export const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 50 },
  last_name: { type: String, required: true, maxlength: 50 },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        try {
          const phoneNumber = parsePhoneNumberFromString(
            value,
            'PS' as CountryCode
          );
          return phoneNumber && phoneNumber.isValid();
        } catch (error) {
          return false;
        }
      },
      message: 'Invalid phone number'
    }
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});
