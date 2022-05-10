import { Injectable } from '@nestjs/common';
import { Crew } from './crew.model';
import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';

@Injectable()
export class CrewService {
  private crew: Crew[] = [];
  today: Date = new Date();
  currentMonth: number;
  currentDay: number;
  async getCrewList() {
    console.log('Get Crew List');
    this.currentMonth = this.today.getUTCMonth();
    this.currentDay = this.today.getUTCDate();
    try {
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

      return this.crew;
    } catch (error: unknown) {
      console.error('Get Crew List', error);
      if (isNotionClientError(error)) {
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            console.error('Notion error', ClientErrorCode.RequestTimeout);
            break;
          case APIErrorCode.ObjectNotFound:
            console.error('Notion error', APIErrorCode.ObjectNotFound);
            break;
          case APIErrorCode.Unauthorized:
            console.error('Notion error', APIErrorCode.Unauthorized);
            break;
          default:
            console.error('Error code', error.code);
        }
      }
    }
  }

  private getCrewMember(memberProps): Crew {
    const crewMember: Crew = {
      isActive: memberProps.Active.checkbox,
      name:
        memberProps.Name &&
        memberProps.Name.title &&
        memberProps.Name.title[0].plain_text
          ? this.capitalize(memberProps.Name.title[0].plain_text)
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
      position: memberProps.Position.rich_text[0].plain_text
        ? this.capitalize(memberProps.Position.rich_text[0].plain_text)
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
    const date1 = this.currentDay + '-' + this.currentMonth;
    const date2 = date.getUTCDate() + '-' + date.getUTCMonth();

    return date1 === date2;
  }

  private capitalize(sentence: string) {
    sentence = sentence.toLowerCase();
    const words = sentence.split(' ').map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return words.join(' ');
  }
}
