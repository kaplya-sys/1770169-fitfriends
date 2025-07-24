import {Entity} from '@1770169-guitar/core';
import {Guitar, Image} from '@1770169-guitar/types';
import {GuitarType, GuitarStrings} from '@1770169-guitar/models';

export class ProductsEntity implements Guitar, Entity<string> {
  public id?: string;
  public title!: string;
  public description!: string;
  public date!: Date;
  public image!: Image | string;
  public type!: GuitarType;
  public stringCount!: GuitarStrings;
  public article!: string;
  public price!: number;

  constructor(guitar: Guitar) {
    this.populate(guitar)
  }

  static fromObject(guitar: Guitar) {
    return new ProductsEntity(guitar);
  }

  public toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      image: this.image,
      type: this.type,
      stringCount: this.stringCount,
      article: this.article,
      price: this.price
    };
  }

  public populate(guitar: Guitar) {
      this.id = guitar.id;
      this.title = guitar.title;
      this.description = guitar.description;
      this.date = guitar.date;
      this.image = guitar.image;
      this.type = guitar.type;
      this.stringCount = guitar.stringCount;
      this.article = guitar.article;
      this.price = guitar.price;
  }
}
