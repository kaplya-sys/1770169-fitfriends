import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {Layout} from '../../components/layout';
import {getOrdersByUserAction, selectOrders} from '../../store';
import {OrderType, ParamsType, QueryType, SortDirection} from '../../libs/shared/types';
import {BackButton} from '../../components/back-button';
import {OrderList} from '../../components/order-list';
import {ShowMore} from '../../components/show-more';
import {StubGum} from '../../components/stub-gym';
import {DEFAULT_PAGE} from '../../libs/shared/constants';

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [filters, setFilters] = useState<QueryType>({
    orderByAmount: null,
    orderByCount: null
  });
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();
  const ordersWithPagination = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrdersByUserAction({query: {...filters, page, userId: id}}));
  }, [filters, id, page, dispatch]);

  useEffect(() => {
    if (ordersWithPagination) {
      if (ordersWithPagination.currentPage === 1) {
        setOrders(ordersWithPagination.entities);
      } else {
        setOrders((prevState) => ({...prevState, orders: prevState.concat(ordersWithPagination.entities)}));
      }
    }
  }, [ordersWithPagination]);

  const handleShowMoreClick = () => {
    if (currentPage < totalPages) {
      setPage((prevState) => prevState + DEFAULT_PAGE);
    }
  };
  const handleSortClick = (sortType: 'amount' | 'count') => {
    if (sortType === 'amount') {
      return setFilters((prevState) => ({...prevState, orderByAmount: SortDirection.Down, orderByDate: null}));
    }
    setFilters((prevState) => ({...prevState, orderByDate: SortDirection.Up, orderByAmount: null}));
  };

  if (!ordersWithPagination) {
    return null;
  }
  const {currentPage, totalPages, entities} = ordersWithPagination;

  return (
    <Layout>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            <BackButton className='btn-flat--underlined my-orders__back'/>
            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <div className="sort-for">
                <p>Сортировать по:</p>
                <div className="sort-for__btn-container">
                  <button
                    className="btn-filter-sort"
                    type="button"
                    onClick={() => handleSortClick('amount')}
                  >
                    <span>Сумме</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref="#icon-sort-up"></use>
                    </svg>
                  </button>
                  <button
                    className="btn-filter-sort"
                    type="button"
                    onClick={() => handleSortClick('count')}
                  >
                    <span>Количеству</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref="#icon-sort-down"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {
              entities.length ?
                <>
                  <OrderList
                    orders={orders}
                    className='my-orders'
                  />
                  {
                    totalPages > DEFAULT_PAGE &&
                      <ShowMore
                        className='my-orders'
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
