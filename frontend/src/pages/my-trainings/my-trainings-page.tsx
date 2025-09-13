import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Layout} from '../../components/layout';
import {BackButton} from '../../components/back-button';
import {FilterName, ParamsType, QueryType, TrainingType} from '../../libs/shared/types';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainingsAction, selectRangeFilters, selectTrainings} from '../../store';
import {TrainingList} from '../../components/training-list';
import {ShowMore} from '../../components/show-more';
import {Filter} from '../../components/filter';
import {StubGum} from '../../components/stub-gym';
import {DEFAULT_PAGE} from '../../libs/shared/constants';

export const MyTrainingsPage = () => {
  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [filters, setFilters] = useState<QueryType>({
    priceMin: null,
    priceMax: null,
    caloriesMin: null,
    caloriesMax: null,
    ratingMin: null,
    ratingMax: null,
    trainingTime: []
  });
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();
  const trainingsWithPagination = useAppSelector(selectTrainings);
  const rangeFilters = useAppSelector(selectRangeFilters);

  useEffect(() => {
    dispatch(getTrainingsAction({query: {...filters, page, coach: id}}));
  }, [filters, id, page, dispatch]);

  useEffect(() => {
    if (trainingsWithPagination) {
      if (trainingsWithPagination.currentPage === DEFAULT_PAGE) {
        setTrainings(trainingsWithPagination.entities);
      } else {
        setTrainings(trainings.concat(trainingsWithPagination.entities));
      }
    }
  }, [trainingsWithPagination]);

  const handleFilterChange = (newFilters: QueryType) => {
    setFilters(newFilters);
  };
  const handleShowMoreClick = () => {
    if (currentPage < totalPages) {
      setPage((prevState) => prevState + DEFAULT_PAGE);
    }
  };

  if (!trainingsWithPagination) {
    return null;
  }
  const {currentPage, totalPages, entities} = trainingsWithPagination;

  return (
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Мои тренировки</h1>
            <div className="my-training-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="my-training-form__wrapper">
                <BackButton className='btn-flat--underlined my-training-form__btnback'/>
                <Filter
                  className='my-training-form'
                  filterName={FilterName.MyTrainingFilter}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                  priceRange={rangeFilters.price}
                  caloryRange={rangeFilters.calories}
                />
              </div>
            </div>
            <div className="inner-page__content">
              {
                entities.length ?
                  <div className="my-trainings">
                    <TrainingList trainings={trainings} className='my-trainings'/>
                    {
                      totalPages > DEFAULT_PAGE &&
                      <ShowMore
                        className='my-trainings'
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onClickShowMore={handleShowMoreClick}
                      />
                    }
                  </div> :
                  <StubGum/>
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

