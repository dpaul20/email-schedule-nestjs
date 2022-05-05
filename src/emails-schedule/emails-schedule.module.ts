import { Module } from '@nestjs/common';
import { EmailsScheduleService } from './emails-schedule.service';
import { ConfigModule } from '@nestjs/config';
import { CrewModule } from 'src/crew/crew.module';
import { CrewService } from 'src/crew/crew.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    CrewModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          port: Number(process.env.EMAIL_PORT),
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: process.env.EMAIL_FROM,
        },
        preview: false,
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [EmailsScheduleService, CrewService],
})
export class EmailsScheduleModule {}
