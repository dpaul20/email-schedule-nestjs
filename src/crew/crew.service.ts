import { Injectable } from '@nestjs/common';
import { Crew } from './crew.model';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponse, GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

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

  async getCrewList() {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    response.results[0].properties.Email.email
    const { results } = response;
   
    console.log('results', results);
    return response;
  }

  /**
   * Find all crew members
   *
   * @return  crew
   */
  async findAll() {
    return await this.crew;
  }

  /**
   * Find crew members birthday
   *
   * @return  {[string]}
   */
  async findCrewBirthday() {
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
