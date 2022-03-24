import { IsString, IsNotEmpty, IsDateString, IsEmail } from 'class-validator';

export class EmailScheduleDto {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  date: string;
}

export default EmailScheduleDto;
