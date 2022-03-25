import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { CrewModule } from './crew/crew.module';
import { EmailsScheduleModule } from './emails-schedule/emails-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    EmailsScheduleModule,
    CrewModule,
  ],
})
export class AppModule {}
