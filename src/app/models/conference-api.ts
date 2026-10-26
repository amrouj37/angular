import { Conference } from './conference';

// meme chose que Conference mais la date arrive en string depuis le JSON
// et l'id est généré par json-server lors du POST
export interface ConferenceApi extends Omit<Conference, 'id' | 'date'> {
  id?: number;
  date: string;
}
