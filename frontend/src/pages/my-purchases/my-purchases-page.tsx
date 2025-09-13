import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {TrainingList} from '../../components/training-list';
import {BackButton} from '../../components/back-button';
import {Layout} from '../../components/layout';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ShowMore} from '../../components/show-more';
import {ParamsType, QueryType, UserBalanceType} from '../../libs/shared/types';
import {getUserBalanceAction, selectMyPurchasedTrainings, selectUserBalance} from '../../store';
import {StubGum} from '../../components/stub-gym';
import {DEFAULT_PAGE} from '../../libs/shared/constants';

export const MyPurchasesPage = () => {
  const [userBalance, setUserBalance] = useState<UserBalanceType[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [filters, setFilters] = useState<QueryType>({active: false});
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();
  const userBalanceWithPagination = useAppSelector(selectUserBalance);
  const trainings = useAppSelector(selectMyPurchasedTrainings);

  useEffect(() => {
    dispatch(getUserBalanceAction({id, query: {...filters, page}}));
  }, [filters, id, page, dispatch]);

  useEffect(() => {
    if (userBalanceWithPagination) {
      if (userBalanceWithPagination.currentPage === DEFAULT_PAGE) {
        setUserBalance(userBalanceWithPagination.entities);
      } else {
        setUserBalance(userBalance.concat(userBalanceWithPagination.entities));
      }
    }
  }, [userBalanceWithPagination]);

  const handleShowMoreClick = () => {
    if (currentPage < totalPages) {
      setPage((prevState) => prevState + DEFAULT_PAGE);
    }
  };
  const handleOnlyActiveClick = () => {
    setFilters((prevState) => ({...prevState, active: !prevState.active}));
  };

  if (!userBalanceWithPagination) {
    return null;
  }
  const {currentPage, totalPages, entities} = userBalanceWithPagination;

  return (
    <Layout>
      <section className="my-purchases">
        <div className="container">
          <div className="my-purchases__wrapper">
            <BackButton className='my-purchases__back'/>
            <div className="my-purchases__title-wrapper">
              <h1 className="my-purchases__title">Мои покупки</h1>
              <div className="my-purchases__controls">
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="user-agreement-1"
                      checked={filters.active}
                      name="user-agreement"
                      onChange={handleOnlyActiveClick}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">Только активные</span>
                  </label>
                </div>
              </div>
            </div>
            {
              entities.length ?
                <>
                  <TrainingList className='my-purchases' trainings={trainings} />
                  {
                    totalPages > DEFAULT_PAGE &&
                    <ShowMore
                      className='my-purchases'
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onClickShowMore={handleShowMoreClick}
                    />
                  }
                </> :
                <StubGum/>
            }
          </div>
        </div>
      </section>
    </Layout>
  );
};
