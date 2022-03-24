import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { EmailsService } from 'src/emails/emails.service';
import EmailScheduleDto from './dto/emailSchedule.dto';

@Injectable()
export class EmailsScheduleService {
  constructor(
    private readonly emailService: EmailsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: emailSchedule.to,
        from: 'noreply@nestjs.com',
        subject: emailSchedule.subject,
        html: '<b>Hello world?</b>',
      });
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${emailSchedule.subject}`,
      job,
    );
    job.start();
  }
}
