import { Module } from '@nestjs/common';
import { TripulantesService } from './tripulantes.service';

@Module({
  controllers: [],
  providers: [TripulantesService],
  exports: [],
})
export class TripulantesModule {}
