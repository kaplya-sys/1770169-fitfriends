import {Entity} from '@1770169-guitar/core';
import {JwtToken} from '@1770169-guitar/types';


export class RefreshTokenEntity implements JwtToken, Entity<string> {
  public id?: string;
  public tokenId!: string;
  public userId!: string;
  public expiresIn!: Date;
  public createdAt!: Date;

  constructor(refreshToken: JwtToken) {
    this.populate(refreshToken);
  }

  public populate(refreshToken: JwtToken) {
    this.id = refreshToken.id,
    this.tokenId = refreshToken.tokenId,
    this.userId = refreshToken.userId,
    this.expiresIn = refreshToken.expiresIn,
    this.createdAt = refreshToken.createdAt
  }

  public toObject() {
    return {
      id: this.id,
      tokenId: this.tokenId,
      userId: this.userId,
      expiresIn: this.expiresIn,
      createdAt: this.createdAt
    }
  }

  static fromObject(refreshToken: JwtToken) {
    return new RefreshTokenEntity(refreshToken);
  }
}
