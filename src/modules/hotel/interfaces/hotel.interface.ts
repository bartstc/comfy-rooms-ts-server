import { EmailTemplate } from './email-template.interface';
import { Opinion } from './opinion.interface';

export interface Image {
  url: string;
}

export interface Hotel {
  owner: string;
  pin: string;
  type: string;
  stars: number;
  rating: number;
  name: string;
  city: string;
  address: string;
  description: string;
  contact: number;
  images: Image[];
  emailTemplate: EmailTemplate;
  rooms: string[];
  opinions: Opinion[];
}
