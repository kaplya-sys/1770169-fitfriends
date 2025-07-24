import { Link } from 'react-router-dom';

import { UserCardProps } from './user-card-props.type';
import { Picture } from '../../ui/picture';

export const UserCard = ({ className, user }: UserCardProps) => (
  <li className={ className }>
    <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
      { user.avatar &&
        <div className="thumbnail-user__image">
          <Picture
            width={ 82 }
            height={ 82 }
            image={ user.avatar }
            alt=''
          />
        </div> }
      {/*<div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
        <svg width="12" height="12" aria-hidden="true">
          <use xlinkHref="#icon-crown"></use>
        </svg>
      </div>*/}
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{ user.name }</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{ user.location }</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {
          user.specializations
            .map((specialization) => ({
              id: crypto.randomUUID(),
              specialization
            }))
            .map((item) => (
              <li className="thumbnail-user__hashtags-item" key={ item.id }>
                <div className="hashtag thumbnail-user__hashtag">
                  <span>{ `#${ item.specialization }` }</span>
                </div>
              </li>
            ))
        }
      </ul>
      <Link className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" to={ `/users/${ user.id }` }>Подробнее</Link>
    </div>
  </li>
);
