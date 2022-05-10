import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CrewService } from 'src/crew/crew.service';

@Injectable()
export class EmailsScheduleService {
  constructor(
    private readonly emailService: MailerService,
    private readonly crew: CrewService,
    private readonly configServise: ConfigService,
  ) {}

  /**
   * Schedule to send emails
   *
   * @return  void
   */
  async scheduleEmail(): Promise<void> {
    console.log('Schedule Email');
    try {
      const today: Date = new Date();
      const currentMonth: string = await this.getMonth(today.getUTCMonth());
      const currentDay: number = today.getUTCDate();

      const crew = await this.crew.getCrewList();
      const crewEmails = crew.map((crewMember) => ({
        name: crewMember.name,
        address: crewMember.email,
      }));

      const currentBirthdays = crew.filter((member) => {
        return member.isBirthdayDate;
      });

      for (const crewMember of currentBirthdays) {
        console.log(`It's ${crewMember.name}'s Birthday`);
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
            day: currentDay,
            month: currentMonth,
          },
        });
      }
    } catch (error) {
      console.error('Schedule Email', error);
    }
  }

  async getMonth(month: number) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[month];
  }
}
