import { Body, Controller, Post } from '@nestjs/common';
import { EmailsScheduleService } from './emails-schedule.service';
import EmailScheduleDto from './dto/emailSchedule.dto';

@Controller('emails-schedule')
export class EmailsScheduleController {
  constructor(private readonly emailSchedulingService: EmailsScheduleService) {}

  @Post('schedule')
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
