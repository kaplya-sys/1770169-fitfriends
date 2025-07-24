import { Header } from '../../components/header';
import { PromoSlider } from '../../components/promo-slider/promo-slider';
import { promotions } from './home-page.constant';
import { useAppSelector } from '../../hooks';
import { Slider } from '../../components/slider';
import { TrainingCard } from '../../components/training-card';
import { selectTrainings } from '../../store';
import { selectUsers } from '../../store/users/users.selector';
import { UserCard } from '../../components/user-card';
import { PreviewCard } from '../../components/preview-card';

export const HomePage = () => {
  const popularTrainings = useAppSelector(selectTrainings);
  const specialTrainings = useAppSelector(selectTrainings);
  const users = useAppSelector(selectUsers);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section className="special-for-you">
          <div className="container">
            <Slider blockClassName='special-for-you' title='Специально подобрано для вас'>
              {
                specialTrainings.entities.map((specialTraining) => (
                  <PreviewCard
                    className='special-for-you__item swiper-slide'
                    training={ specialTraining }
                    key={ specialTraining.id }
                  />
                ))
              }
            </Slider>
          </div>
        </section>
        <section className="special-offers">
          <div className="container">
            <div className="special-offers__wrapper">
              <PromoSlider blockClassName='special-offers' promotions={ promotions } />
              <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                    <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                  </picture>
                </div>
                {/*<p className="thumbnail-spec-gym__type">Ближайший зал</p>*/}
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="popular-trainings">
          <div className="container">
            <Slider blockClassName='popular-trainings' title='Популярные тренировки'>
              {
                popularTrainings.entities.map((popularTraining) => (
                  <TrainingCard
                    training={ popularTraining }
                    className='popular-trainings__item swiper-slide'
                    key={ popularTraining.id }
                  />
                ))
              }
            </Slider>
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
            <Slider blockClassName='look-for-company' title='Ищут компанию для тренировки'>
              {
                users.map((user) => (
                  <UserCard
                    className='look-for-company__item swiper-slide'
                    user={ user }
                    key={ user.id }
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
