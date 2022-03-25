import { Injectable } from '@nestjs/common';
import { Tripulante } from './tripulante.model';

@Injectable()
export class TripulantesService {
  private tripulantes: Tripulante[] = [
    {
      name: 'fulanito',
      date: '10/03/1989',
      email: 'dpaul_20@hotmail.com',
    },
    {
      name: 'fulanita',
      date: '03/25/1989',
      email: 'fulanita@example.com',
    },
    {
      name: 'Pepito',
      date: '03/25/2000',
      email: 'pepito@example.com',
    },
  ];

  async findAll(): Promise<Tripulante[]> {
    return await this.tripulantes;
  }

  async findBirthdayBoys() {
    const tripulantes = this.tripulantes;

    const hoy = new Date();
    const getMonth = hoy.getMonth();
    const getDay = hoy.getDate();

    const birthdayBoys = tripulantes.filter((tripulante) => {
      const cumpleanos = new Date(tripulante.date);
      const month = getMonth - cumpleanos.getMonth();
      const day = getDay - cumpleanos.getDate();
      if (month === 0 && day === 0) {
        return tripulante;
      }
    });

    return await birthdayBoys.map((tripulante) => {
      return tripulante.name;
    });
  }
}
