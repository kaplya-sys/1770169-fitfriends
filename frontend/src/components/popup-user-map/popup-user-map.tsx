import {useEffect} from 'react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import classNames from 'classnames';

import {UserType} from '../../libs/shared/types';
import {isEscape} from '../../libs/shared/helpers';
import {STATION_NAME} from '../../libs/shared/constants';

type PopupBuyPropsType = {
  user: UserType;
  isActive: boolean;
  onCloseClick: () => void;
}

export const PopupUserMap = ({user, isActive, onCloseClick}: PopupBuyPropsType) => {
  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPressEsc);
    }

    return () => document.removeEventListener('keydown', handleKeyPressEsc);
  }, [isActive]);
  const defaultState = {
    center: [user.station.latitude, user.station.longitude],
    zoom: 15,
  };

  const handleKeyPressEsc = (evt: KeyboardEvent) => {
    if (isEscape(evt.key)) {
      onCloseClick();
    }
  };

  return(
    <div className={classNames('wrapper modal modal--map', {'is-active': isActive})}>
      <main>
        <div className="popup-form popup-form--map">
          <section className="popup">
            <div className="popup__wrapper popup__wrapper--map">
              <div className="popup-head popup-head--address">
                <h2 className="popup-head__header">{user.name}</h2>
                <p className="popup-head__address">
                  <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <span>{`м. ${STATION_NAME[user.station.station]}`}</span>
                </p>
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button" aria-label="close"
                  onClick={onCloseClick}
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content-map">
                <div className="popup__map">
                  <YMaps>
                    <Map
                      defaultState={defaultState}
                      width={1160}
                      height={623}
                    >
                      <div className="popup__pin popup__pin--user">
                        <Placemark
                          geometry={defaultState.center}
                          options={{
                            iconLayout: 'default#image',
                            iconImageSize: [40, 49],
                            iconImageHref: '/img/sprite/icon-pin-user.svg'
                          }}
                        />
                      </div>
                    </Map>
                  </YMaps>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

