import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class CustomExeptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
