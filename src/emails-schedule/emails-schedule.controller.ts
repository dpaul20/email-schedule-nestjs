import { Controller, Get } from '@nestjs/common';
import { EmailsScheduleService } from './emails-schedule.service';

@Controller('schedule')
export class EmailsScheduleController {
  constructor(private readonly schedulerService: EmailsScheduleService) {}

  @Get()
  getAllGreetings() {
    this.schedulerService.getScheduledEmails();
  }
}
