import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'
export class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationError: ValidationError[]): string[] {
    const messages = {}
    validationError.forEach((error) => {
      messages[error.property] = Object.values(error.constraints)[0]
    })
    throw new HttpException({ code: 422, messages }, HttpStatus.UNPROCESSABLE_ENTITY)
    // return []
  }
}
