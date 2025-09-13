import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Layout} from '../../components/layout';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FriendsList} from '../../components/friend-list';
import {ShowMore} from '../../components/show-more';
import {FriendType, ParamsType} from '../../libs/shared/types';
import {StubGum} from '../../components/stub-gym';
import {BackButton} from '../../components/back-button';
import {getFriendsByUserAction, selectFriends, selectMyFriends} from '../../store';
import {DEFAULT_PAGE} from '../../libs/shared/constants';

export const MyFriendsPage = () => {
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [page, setPage] = useState(0);
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();
  const friendsWithPagination = useAppSelector(selectFriends);
  const myFriends = useAppSelector(selectMyFriends);

  useEffect(() => {
    setFriends([]);
    dispatch(getFriendsByUserAction({}));
  }, [id, dispatch]);

  useEffect(() => {
    if (friendsWithPagination) {
      if (friendsWithPagination.currentPage === DEFAULT_PAGE) {
        setFriends(friendsWithPagination.entities);
      } else {
        setFriends(friends.concat(friendsWithPagination.entities));
      }
      setPage(friendsWithPagination.currentPage);
    }
  }, [friendsWithPagination]);

  useEffect(() => {
    dispatch(getFriendsByUserAction({query: {page}}));
  }, [page, dispatch]);

  const handleShowMoreClick = () => {
    if (currentPage < totalPages) {
      setPage((prevState) => prevState + DEFAULT_PAGE);
    }
  };

  if (!friendsWithPagination) {
    return null;
  }
  const {currentPage, totalPages, entities} = friendsWithPagination;

  return (
    <Layout>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <BackButton className='friends-list__back'/>
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
              {/*<div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                <label>
                  <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Только онлайн</span>
                </label>
              </div>*/}
            </div>
            {entities.length ?
              <>
                <FriendsList
                  users={myFriends}
                  joinTrainingStatus={false}
                  personalTrainingStatus={false}
                />
                {totalPages > DEFAULT_PAGE &&
                  <ShowMore
                    className='friends-list'
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onClickShowMore={handleShowMoreClick}
                  />}
              </> :
              <StubGum/>}
          </div>
        </div>
      </section>
    </Layout>
  );
};
