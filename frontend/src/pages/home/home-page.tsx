import {Header} from '../../components/header';
import {SpecialOffers} from '../../components/special-offers/special-offers';
import {useAppSelector} from '../../hooks';
import {Slider} from '../../components/slider';
import {TrainingCard} from '../../components/training-card';
import {UserCard } from '../../components/user-card';
import {PreviewCard } from '../../components/preview-card';
import {
  selectPopularTrainings,
  selectRecommendedTrainings,
  selectSpecialTrainings,
  selectUsers
} from '../../store';
import {StubGum} from '../../components/stub-gym';


export const HomePage = () => {
  const popularTrainings = useAppSelector(selectPopularTrainings);
  const specialTrainings = useAppSelector(selectSpecialTrainings);
  const recommendedTrainings = useAppSelector(selectRecommendedTrainings);
  const users = useAppSelector(selectUsers);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        {
          recommendedTrainings.length ?
            <section className="special-for-you">
              <div className="container">
                <Slider blockClassName='special-for-you' title='Специально подобрано для вас'>
                  {
                    recommendedTrainings.map((recommendedTraining) => (
                      <PreviewCard
                        className='special-for-you__item swiper-slide'
                        training={recommendedTraining}
                        key={recommendedTraining.id}
                      />
                    ))
                  }
                </Slider>
              </div>
            </section> :
            <StubGum/>
        }
        {
          specialTrainings.length ?
            <SpecialOffers specialOffers={specialTrainings}/> :
            <StubGum/>
        }
        {
          popularTrainings?.length ?
            <section className="popular-trainings">
              <div className="container">
                <Slider blockClassName='popular-trainings' title='Популярные тренировки'>
                  {
                    (popularTrainings).map((popularTraining) => (
                      <TrainingCard
                        training={popularTraining}
                        className='popular-trainings__item swiper-slide'
                        key={popularTraining.id}
                      />
                    ))
                  }
                </Slider>
              </div>
            </section> :
            <StubGum/>
        }
        <section className="look-for-company">
          <div className="container">
            <Slider blockClassName='look-for-company' title='Ищут компанию для тренировки'>
              {
                users.map((user) => (
                  <UserCard
                    className='look-for-company__item swiper-slide'
                    user={user}
                    key={user.id}
                  />
                ))
              }
            </Slider>
          </div>
        </section>
      </main>
    </div>
  );
};
