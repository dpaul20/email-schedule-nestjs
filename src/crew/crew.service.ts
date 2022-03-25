import { Injectable } from '@nestjs/common';
import { Crew } from './crew.model';

@Injectable()
export class CrewService {
  private crew: Crew[] = [
    {
      name: 'Dpaul',
      date: '10/03/1989',
      email: 'dpaul_20@hotmail.com',
    },
    {
      name: 'Fulanita',
      date: '03/25/1989',
      email: 'fulanita@example.com',
    },
    {
      name: 'Pepito',
      date: '03/26/2000',
      email: 'pepito@example.com',
    },
    {
      name: 'Pepe',
      date: '03/25/2000',
      email: 'pepe@example.com',
    },
  ];

  /**
   * Find all crew members
   *
   * @return  {<Promise><Crew>[]}
   */
  async findAll(): Promise<Crew[]> {
    return await this.crew;
  }

  /**
   * Find crew members birthday
   *
   * @return  {[string]}
   */
  async findBirthdayBoys() {
    const crew = this.crew;

    const hoy = new Date();
    const getMonth = hoy.getMonth();
    const getDay = hoy.getDate();

    const birthdayBoys = crew.filter((crewMember) => {
      const cumpleanos = new Date(crewMember.date);
      const month = getMonth - cumpleanos.getMonth();
      const day = getDay - cumpleanos.getDate();
      if (month === 0 && day === 0) {
        return crewMember;
      }
    });

    return await birthdayBoys.map((crewMember) => {
      return crewMember.name;
    });
  }
}
