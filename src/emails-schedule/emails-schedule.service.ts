import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CrewService } from 'src/crew/crew.service';

@Injectable()
export class EmailsScheduleService {
  private readonly logger = new Logger(EmailsScheduleService.name);
  constructor(
    private readonly emailService: MailerService,
    private readonly crew: CrewService,
    private readonly configServise: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  /**
   * Trigger schedule email for birthday every day at 9:00 AM
   */
  @Cron('0 0 9 * * *')
  triggerScheduleEmail() {
    this.logger.debug('Called trigger Schedule Email');
    this.scheduleEmail();
  }

  async getScheduledEmails() {
    console.log('getScheduledEmails');
    await this.scheduleEmail();
    return;
  }

  /**
   * Schedule to send emails
   *
   * @return  void
   */
  async scheduleEmail(): Promise<void> {
    try {
      const crew = await this.crew.getCrewList();
      const crewEmails = crew.map((crewMember) => ({
        name: crewMember.name,
        address: crewMember.email,
      }));

      const currentBirthdays = crew.filter((member) => {
        return member.isBirthdayDate;
      });

      for (const crewMember of currentBirthdays) {
        this.logger.debug(`It's ${crewMember.name}'s Birthday`);
        await this.emailService.sendMail({
          to: crewEmails,
          from: this.configServise.get('EMAIL_FROM'),
          subject:
            this.configServise.get('EMAIL_SUBJECT') + ` ${crewMember.name}`,
          template: 'birthday',
          context: {
            name: crewMember.name,
            image: crewMember.image,
            position: crewMember.position,
          },
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
