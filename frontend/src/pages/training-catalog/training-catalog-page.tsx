import {useEffect, useState} from 'react';

import {BackButton} from '../../components/back-button';
import {Layout} from '../../components/layout';
import {Filter} from '../../components/filter';
import {TrainingList} from '../../components/training-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainingsAction, selectRangeFilters, selectTrainings} from '../../store';
import {ShowMore} from '../../components/show-more';
import {FilterName, QueryType, TrainingType} from '../../libs/shared/types';
import {StubGum} from '../../components/stub-gym';
import {DEFAULT_PAGE} from '../../libs/shared/constants';

export const TrainingCatalogPage = () => {
  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [filters, setFilters] = useState<QueryType>({
    priceMin: null,
    priceMax: null,
    caloriesMin: null,
    caloriesMax: null,
    ratingMin: null,
    ratingMax: null,
    type: [],
    orderByPrice: null
  });
  const dispatch = useAppDispatch();
  const trainingsWithPagination = useAppSelector(selectTrainings);
  const rangeFilters = useAppSelector(selectRangeFilters);

  useEffect(() => {
    dispatch(getTrainingsAction({query: {...filters, page}}));
  }, [filters, page, dispatch]);

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
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <div className="gym-catalog-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="gym-catalog-form__wrapper">
                <BackButton className='btn-flat--underlined gym-catalog-form__btnback'/>
                <Filter
                  className='gym-catalog-form'
                  filterName={FilterName.TrainingFilter}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  priceRange={rangeFilters.price}
                  caloryRange={rangeFilters.calories}
                />
              </div>
            </div>
            <div className="training-catalog">
              {
                entities.length ?
                  <div className="my-trainings">
                    <TrainingList
                      className='training-catalog'
                      trainings={trainings}
                    />
                    {
                      totalPages > DEFAULT_PAGE &&
                        <ShowMore
                          className='training-catalog'
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
