import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Layout} from '../../components/layout';
import {BackButton} from '../../components/back-button';
import {ParamsType, TrainingType} from '../../libs/shared/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainingsAction, selectRangeFilters, selectTrainings} from '../../store';
import {TrainingList} from '../../components/training-list';
import {ShowMore} from '../../components/show-more';
import {Filters} from '../../components/filters';
import {StubGum} from '../../components/stub-gym';

export const MyTrainingsPage = () => {
  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();
  const trainingsWithPagination = useAppSelector(selectTrainings);
  const rangeFilters = useAppSelector(selectRangeFilters);

  useEffect(() => {
    setTrainings([]);
    dispatch(getTrainingsAction({query: {coach: id}}));
  }, [id, dispatch]);

  useEffect(() => {
    if (trainingsWithPagination) {
      if (trainingsWithPagination.currentPage === 1) {
        setTrainings(trainingsWithPagination.entities);
      } else {
        setTrainings(trainings.concat(trainingsWithPagination.entities));
      }
    }
  }, [trainingsWithPagination]);

  if (!trainingsWithPagination) {
    return null;
  }
  const {currentPage, totalPages, entities} = trainingsWithPagination;

  const handleShowMoreClick = () => {
    if (currentPage < totalPages) {
      dispatch(getTrainingsAction({query: {page: currentPage + 1}}));
    }
  };
  const handleBackBeginningClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Мои тренировки</h1>
            <div className="my-training-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="my-training-form__wrapper">
                <BackButton blockClassName='my-training-form__btnback'/>
                <Filters
                  priceRange={rangeFilters.price}
                  caloryRange={rangeFilters.calories}
                  className='my-training-form'
                  isCustom
                />
              </div>
            </div>
            <div className="inner-page__content">
              {entities.length ?
                <div className="my-trainings">
                  <TrainingList trainings={trainings} className='my-trainings'/>
                  <ShowMore
                    className='my-trainings'
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onClickShowMore={handleShowMoreClick}
                    onClickBackBeginning={handleBackBeginningClick}
                  />
                </div> :
                <StubGum/>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

