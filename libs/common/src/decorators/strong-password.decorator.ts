import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  ValidationOptions,
} from 'class-validator';
import { Strings } from '../data/strings';

export function StrongPassword(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    MinLength(7, {
      message: Strings.passwordLengthValidation,
    }),
    Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{7,}$/, {
      message: Strings.strongPasswordValidation,
      ...validationOptions,
    }),
  );
}
