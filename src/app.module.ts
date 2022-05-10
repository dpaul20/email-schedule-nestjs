import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { CrewModule } from './crew/crew.module';
import { EmailsScheduleModule } from './emails-schedule/emails-schedule.module';
import { EmailsScheduleService } from './emails-schedule/emails-schedule.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    EmailsScheduleModule,
    CrewModule,
  ],
  providers: [EmailsScheduleService],
  exports: [EmailsScheduleService],
})
export class AppModule {}
