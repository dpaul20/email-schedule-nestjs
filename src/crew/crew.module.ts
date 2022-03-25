import { Module } from '@nestjs/common';
import { CrewService } from './crew.service';

@Module({
  controllers: [],
  providers: [CrewService],
  exports: [],
})
export class CrewModule {}
