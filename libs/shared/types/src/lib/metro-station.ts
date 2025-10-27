import {Station} from '@1770169-fitfriends/models';

export interface MetroStation {
  id?: string;
  latitude: number;
  longitude: number;
  station: Station;
}
