import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailsScheduleService } from './emails-schedule/emails-schedule.service';
import { EmailsScheduleController } from './emails-schedule/emails-schedule.controller';
import { configValidationSchema } from './config.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    ScheduleModule.forRoot(),
    EmailsModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailsScheduleController],
  providers: [EmailsService, EmailsScheduleService],
})
export class AppModule {}
