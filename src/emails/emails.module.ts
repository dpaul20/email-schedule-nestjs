import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailsService } from './emails.service';
import { EmailsScheduleService } from 'src/emails-schedule/emails-schedule.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailsService, EmailsScheduleService],
  exports: [EmailsService],
})
export class EmailsModule {}
