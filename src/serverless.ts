import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { EmailsScheduleService } from './emails-schedule/emails-schedule.service';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  app.get(EmailsScheduleService).scheduleEmail();
}
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap);
  return server(event, context, callback);
};
