import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  ValidationOptions,
} from 'class-validator';
import { Strings } from '../data/strings';

export function StrongUsername(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    Matches(/^[A-Za-z0-9]{5,20}$/, {
      message: Strings.usernameValidation,
      ...validationOptions,
    }),
  );
}
