import {Station} from '@1770169-fitfriends/models';
import {Entity, MetroStation} from '@1770169-fitfriends/types';

export class MetroStationEntity implements MetroStation, Entity<string> {
  public id?: string;
  public latitude!: number;
  public longitude!: number;
  public station!: Station;

  constructor(metroStation: MetroStation) {
    this.populate(metroStation);
  }

  public populate(metroStation: MetroStation) {
    this.id = metroStation.id;
    this.latitude = metroStation.latitude;
    this.longitude = metroStation.longitude;
    this.station = metroStation.station;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      latitude: this.latitude,
      longitude: this.longitude,
      station: this.station
    }
  }

  public toPrismaObject() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      station: this.station
    }
  }

  static isOwnKey(key: string): boolean {
    const ownKeys = [
      'id',
      'latitude',
      'longitude',
      'station'
    ]
    return ownKeys.includes(key);
  }

  static fromObject(metroStation: MetroStation) {
    return new MetroStationEntity(metroStation);
  }
}
