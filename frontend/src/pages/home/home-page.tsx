import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {Header} from '../../components/header';
import {SpecialOffers} from '../../components/special-offers/special-offers';
import {StubGum} from '../../components/stub-gym';
import {UserList} from '../../components/user-list/user-list';
import {TrainingList} from '../../components/training-list';
import {SliderControls} from '../../components/slider-controls';
import {useSlider, useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute} from '../../libs/shared/types';
import {
  getRangeFiltersAction,
  getRecommendedTrainingsAction,
  getTrainingsAction,
  getUsersAction,
  selectPopularTrainings,
  selectReadyUsers,
  selectRecommendedTrainings,
  selectSpecialTrainings,
  selectUsers
} from '../../store';
import {Picture} from '../../components/picture';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {MAX_READY_USERS_LENGTH} from '../../libs/shared/constants';

export const HomePage = () => {
  const popularTrainings = useAppSelector(selectPopularTrainings);
  const specialTrainings = useAppSelector(selectSpecialTrainings);
  const recommendedTrainings = useAppSelector(selectRecommendedTrainings);
  const readyUsers = useAppSelector(selectReadyUsers);
  const users = useAppSelector(selectUsers);
  const usersSlider = useSlider(users?.entities.length ?? 0, 4, 4);
  const recommendedTrainingsSlider = useSlider(recommendedTrainings.length, 3, 3);
  const popularTrainingsSlider = useSlider(popularTrainings?.length ?? 0, 4, 4);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecommendedTrainingsAction());
    dispatch(getRangeFiltersAction());
    dispatch(getTrainingsAction({}));
    dispatch(getUsersAction({}));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section className="special-for-you">
          <div className="container">
            {
              recommendedTrainings.length ?
                <div className="special-for-you__wrapper" ref={recommendedTrainingsSlider.sliderRef}>
                  <div className="special-for-you__title-wrapper">
                    <h2 className="special-for-you__title">Специально подобрано для вас</h2>
                    <SliderControls
                      className='special-for-you'
                      prevRef={recommendedTrainingsSlider.buttonPrevRef}
                      nextRef={recommendedTrainingsSlider.buttonNextRef}
                    />
                  </div>
                  <ul className="special-for-you__list">
                    {
                      recommendedTrainings.map((recommendedTraining) => (
                        <li className="special-for-you__item" key={recommendedTraining.id}>
                          <div className="thumbnail-preview">
                            <div className="thumbnail-preview__image">
                              <Picture
                                width={452}
                                height={191}
                                alt={recommendedTraining.title}
                                image={recommendedTraining.background}
                              />
                            </div>
                            <div className="thumbnail-preview__inner">
                              <h3 className="thumbnail-preview__title">crossfit</h3>
                              <div className="thumbnail-preview__button-wrapper">
                                <Link
                                  className="btn btn--small thumbnail-preview__button"
                                  to={getRouteWithParam(AppRoute.Training, {id: recommendedTraining.id})}
                                >
                                  <span>Подробнее</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div> :
                <StubGum/>
            }
          </div>
        </section>
        {
          specialTrainings.length ?
            <SpecialOffers specialOffers={specialTrainings}/> :
            <StubGum/>
        }
        <section className="popular-trainings">
          <div className="container">
            {
              popularTrainings?.length ?
                <div className="popular-trainings__wrapper" ref={popularTrainingsSlider.sliderRef}>
                  <div className="popular-trainings__title-wrapper">
                    <h2 className="popular-trainings__title">Популярные тренировки</h2>
                    <button className="btn-flat popular-trainings__button" type="button"onClick={() => navigate(AppRoute.Trainings)}>
                      <span>Смотреть все</span>
                      <svg width="14" height="10" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                    <SliderControls
                      className='popular-trainings'
                      prevRef={popularTrainingsSlider.buttonPrevRef}
                      nextRef={popularTrainingsSlider.buttonNextRef}
                    />
                  </div>
                  <TrainingList className='popular-trainings' trainings={popularTrainings}/>
                </div> :
                <StubGum/>
            }
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
            {
              users?.entities.length ?
                <div className="look-for-company__wrapper" ref={usersSlider.sliderRef}>
                  <div className="look-for-company__title-wrapper">
                    <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
                    <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={() => navigate(AppRoute.Users)}>
                      <span>Смотреть все</span>
                      <svg width="14" height="10" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                    <SliderControls
                      className='look-for-company'
                      prevRef={usersSlider.buttonPrevRef}
                      nextRef={usersSlider.buttonNextRef}
                      isOutlined
                    />
                  </div>
                  <UserList className='look-for-company' users={readyUsers.slice(0, MAX_READY_USERS_LENGTH)} isDark/>
                </div> :
                <StubGum/>
            }
          </div>
        </section>
      </main>
    </div>
  );
};
