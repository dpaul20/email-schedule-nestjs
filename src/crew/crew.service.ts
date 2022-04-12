import { Injectable } from '@nestjs/common';
import { Crew } from './crew.model';
import { Client } from '@notionhq/client';

@Injectable()
export class CrewService {
  private crew: Crew[] = [];

  async getCrewList() {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const { results } = response;

    results.map((result) => {
      if ('properties' in result) {
        const crewMember = this.getCrewMember(result.properties);

        this.crew.push(crewMember);
      }
    });

    return this.crew;
  }

  private getCrewMember(memberProps): Crew {
    const crewMember: Crew = {
      isActive: memberProps.Active.checkbox,
      name:
        memberProps.Name &&
        memberProps.Name.title &&
        memberProps.Name.title[0].plain_text
          ? memberProps.Name.title[0].plain_text
          : 'no data',
      date:
        memberProps.Date && memberProps.Date.date && memberProps.Date.date.start
          ? new Date(memberProps.Date.date.start)
          : null,
      email: memberProps.Email.email,
      position: memberProps.Position.select
        ? memberProps.Position.select.name
        : 'no data',
      image:
        memberProps.Image.files &&
        memberProps.Image.files.length > 0 &&
        memberProps.Image.files[0].file
          ? memberProps.Image.files[0].file.url
          : 'no data',
    };
    console.log(crewMember);
    return crewMember;
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
