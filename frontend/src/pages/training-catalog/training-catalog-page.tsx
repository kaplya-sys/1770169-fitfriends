import { BackButton } from '../../components/back-button';
import { Layout } from '../../components/layout';
import { Filters } from '../../components/filters';
import { TrainingList } from '../../components/training-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTrainingsAction, selectTrainings } from '../../store';
import { getCalorieRange, getPriceRange } from '../../lib/shared/helpers';

export const TrainingCatalogPage = () => {
  const training = useAppSelector(selectTrainings);
  const dispatch = useAppDispatch();

  const handleShowMoreClick = () => {
    dispatch(getTrainingsAction({ query: { page: training.currentPage + 1 }}));
  };
  const handleBackBeginningClick = () => {
    dispatch(getTrainingsAction({ query: { page: 1 } }));
  };

  return (
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <div className="gym-catalog-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="gym-catalog-form__wrapper">
                <BackButton blockClassName='gym-catalog-form__btnback' />
                <Filters
                  priceRange={ getPriceRange(training.entities) }
                  caloryRange={ getCalorieRange(training.entities) }
                />
              </div>
            </div>
            <div className="training-catalog">
              <TrainingList trainings={ training.entities } />
              <div className="show-more training-catalog__show-more">
                {
                  training.totalPages !== training.currentPage ?
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={ handleShowMoreClick }
                    >
                      Показать еще
                    </button> :
                    <button
                      className="btn show-more__button"
                      type="button"
                      onClick={ handleBackBeginningClick }
                    >
                      Вернуться в начало
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
