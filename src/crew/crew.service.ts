import { Injectable } from '@nestjs/common';
import { Crew } from './crew.model';
import { Client } from '@notionhq/client';

@Injectable()
export class CrewService {
  private crew: Crew[] = [];
  today: Date = new Date();
  currentMonth: number;
  currentDay: number;
  async getCrewList() {
    this.currentMonth = this.today.getUTCMonth();
    this.currentDay = this.today.getUTCDate();

    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Active',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Email',
            email: {
              is_not_empty: true,
            },
          },
        ],
      },
    });

    const { results } = response;

    this.crew = results.map((result) => {
      if ('properties' in result) {
        return this.getCrewMember(result.properties);
      }
    });

    console.log(this.crew);
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
      isBirthdayDate:
        memberProps.Date && memberProps.Date.date && memberProps.Date.date.start
          ? this.isBirthdayDate(new Date(memberProps.Date.date.start))
          : false,
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
    return crewMember;
  }

  private isBirthdayDate(date: Date) {
    const month = this.currentMonth - date.getUTCMonth();
    const day = this.currentDay - date.getUTCDate();

    return month === 0 && day === 0;
  }
}
