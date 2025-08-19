import {BackButton} from '../../components/back-button';
import {Layout} from '../../components/layout';
import {Filters} from '../../components/filters';
import {TrainingList} from '../../components/training-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainingsAction, selectTrainings} from '../../store';
import {getCalorieRange, getPriceRange} from '../../libs/shared/helpers';

export const TrainingCatalogPage = () => {
  const dispatch = useAppDispatch();
  const trainingsWithPagination = useAppSelector(selectTrainings);

  if (!trainingsWithPagination) {
    return null;
  }

  const handleShowMoreClick = () => {
    dispatch(getTrainingsAction({}));
  };
  const handleBackBeginningClick = () => {
    dispatch(getTrainingsAction({query: {page: 1}}));
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
                  priceRange={getPriceRange(trainingsWithPagination.entities)}
                  caloryRange={getCalorieRange(trainingsWithPagination.entities)}
                />
              </div>
            </div>
            <div className="training-catalog">
              <TrainingList trainings={trainingsWithPagination.entities} />
              <div className="show-more training-catalog__show-more">
                {
                  trainingsWithPagination.totalPages !== trainingsWithPagination.currentPage ?
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={handleShowMoreClick}
                    >
                      Показать еще
                    </button> :
                    <button
                      className="btn show-more__button"
                      type="button"
                      onClick={handleBackBeginningClick}
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
