import { Module } from '@nestjs/common';
import { EmailsScheduleService } from './emails-schedule.service';
import { ConfigModule } from '@nestjs/config';
import { TripulantesModule } from 'src/tripulantes/tripulantes.module';
import { TripulantesService } from 'src/tripulantes/tripulantes.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TripulantesModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
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
        dir: process.cwd() + '/src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [EmailsScheduleService, TripulantesService],
})
export class EmailsScheduleModule {}
