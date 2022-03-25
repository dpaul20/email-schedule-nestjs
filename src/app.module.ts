import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TripulantesModule } from './tripulantes/tripulantes.module';
import { EmailsScheduleModule } from './emails-schedule/emails-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    EmailsScheduleModule,
    TripulantesModule,
  ],
})
export class AppModule {}
