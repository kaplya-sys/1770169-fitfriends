import {useEffect, useState} from 'react';

import {UserList} from '../../components/user-list/user-list';
import {Layout} from '../../components/layout';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FilterName, QueryType, UserType} from '../../libs/shared/types';
import {getUsersAction, selectUsers} from '../../store';
import {ShowMore} from '../../components/show-more';
import {StubGum} from '../../components/stub-gym';
import {BackButton} from '../../components/back-button';
import {Filter} from '../../components/filter/filter';
import {DEFAULT_PAGE} from '../../libs/shared/constants';

export const UsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<QueryType>({
    fitnessLevel: null,
    location: [],
    type: [],
    role: null
  });
  const dispatch = useAppDispatch();
  const usersWithPagination = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsersAction({query: {...filters, page}}));
  }, [filters, page, dispatch]);

  useEffect(() => {
    if (usersWithPagination) {
      if (usersWithPagination.currentPage === DEFAULT_PAGE) {
        setUsers(usersWithPagination.entities);
      } else {
        setUsers(users.concat(usersWithPagination.entities));
      }
    }
  }, [usersWithPagination]);

  const handleFilterChange = (newFilters: QueryType) => {
    setFilters(newFilters);
  };
  const handleShowMoreClick = () => {
    if (currentPage < totalPages) {
      setPage((prevState) => prevState + DEFAULT_PAGE);
    }
  };

  if (!usersWithPagination) {
    return null;
  }
  const {currentPage, totalPages, entities} = usersWithPagination;

  return (
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог пользователей</h1>
            <div className="user-catalog-form">
              <h2 className="visually-hidden">Каталог пользователя</h2>
              <div className="user-catalog-form__wrapper">
                <BackButton className='btn-flat--underlined user-catalog-form__back'/>
                <Filter
                  className='user-catalog-form'
                  filterName={FilterName.UserFilter}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="inner-page__content">
              {
                entities.length ?
                  <div className="users-catalog">
                    <UserList
                      className='users-catalog'
                      users={users}
                    />
                    {
                      totalPages > DEFAULT_PAGE &&
                        <ShowMore
                          className='users-catalog'
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
