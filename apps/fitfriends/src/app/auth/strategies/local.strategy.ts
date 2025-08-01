import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {Strategy} from 'passport-local';

import {AuthService} from '../auth.service';
import {FIELD_NAME} from './strategy.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({usernameField: FIELD_NAME});
  }

  public async validate(email: string, password: string) {
    return this.authService.verifyUser({email, password});
  }
}
