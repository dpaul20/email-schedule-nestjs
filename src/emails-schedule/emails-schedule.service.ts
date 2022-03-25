import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { TripulantesService } from 'src/tripulantes/tripulantes.service';

@Injectable()
export class EmailsScheduleService {
  private readonly logger = new Logger(EmailsScheduleService.name);
  constructor(
    private readonly emailService: MailerService,
    private readonly tripulantes: TripulantesService,
    private readonly configServise: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('0 0 9 * * *')
  triggerScheduleEmail() {
    this.logger.debug('Called 00:45');
    this.scheduleEmail();
    this.getCrons();
  }

  async scheduleEmail() {
    const tripulantes = await this.tripulantes.findAll();
    const tripulantesTo = tripulantes.map((tripulante) => ({
      name: tripulante.name,
      address: tripulante.email,
    }));

    const birthdayBoys = await this.tripulantes.findBirthdayBoys();

    for (const tripulante of birthdayBoys) {
      this.logger.debug(`${tripulante}'s Birthday`);
      this.emailService.sendMail({
        to: tripulantesTo,
        from: this.configServise.get('EMAIL_FROM'),
        subject: this.configServise.get('EMAIL_SUBJECT') + ` ${tripulante}`,
        template: 'birthday',
        context: {
          name: tripulante,
        },
      });
    }
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
}
