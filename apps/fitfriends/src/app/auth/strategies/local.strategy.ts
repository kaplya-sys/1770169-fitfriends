import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {Strategy} from 'passport-local';

import {AuthService} from '../auth.service';
import {USERNAME_FIELD} from './strategy.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({usernameField: USERNAME_FIELD})
  }

  public async validate(email: string, password: string) {
    return this.authService.verifyUser({email, password});
  }
}
