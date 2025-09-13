import {Link} from 'react-router-dom';

import {formatNumber, getRouteWithParam, getWeekCalculation} from '../../libs/shared/helpers';
import {AppRoute, UserType} from '../../libs/shared/types';
import {StubGum} from '../stub-gym';

type UserPersonalAccountProps = {
  user: UserType;
}

export const UserPersonalAccount = ({user}: UserPersonalAccountProps) => (
  <div className="personal-account-user">
    <div className="personal-account-user__schedule">
      <form action="#" method="get">
        <div className="personal-account-user__form">
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на день, ккал</span>
              <input type="text" name="schedule-for-the-day" value={formatNumber(user.questionnaire.caloriesWaste)}/>
            </label>
          </div>
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на неделю, ккал</span>
              <input type="text" name="schedule-for-the-week" value={formatNumber(getWeekCalculation(user.questionnaire.caloriesWaste))}/>
            </label>
          </div>
        </div>
      </form>
    </div>
    <div className="personal-account-user__additional-info">
      <Link className="thumbnail-link thumbnail-link--theme-light" to={getRouteWithParam(AppRoute.MyFriends, {id: user.id})}>
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-friends"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои друзья</span>
      </Link>
      <Link className="thumbnail-link thumbnail-link--theme-light" to={getRouteWithParam(AppRoute.MyPurchases, {id: user.id})}>
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-shopping-cart"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои покупки</span>
      </Link>
      <StubGum/>
    </div>
  </div>
);
