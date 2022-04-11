import { Module } from '@nestjs/common';
import { CrewService } from './crew.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CrewService],
  exports: [CrewService],
})
export class CrewModule {}
