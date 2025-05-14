import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  ValidationOptions,
} from 'class-validator';
import { Strings } from '../data/strings';
import { Transform } from 'class-transformer';

export function StrongUsername(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    Transform(({ value }) => value?.toLowerCase()),
    Matches(/^[a-z0-9]{5,20}$/, {
      message: Strings.usernameValidation,
      ...validationOptions,
    }),
  );
}
