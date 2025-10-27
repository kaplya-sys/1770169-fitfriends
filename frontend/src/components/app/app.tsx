import {Route, Routes} from 'react-router-dom';

import {useAppSelector} from '../../hooks';
import {
  selectAuthenticatedUser,
  selectAuthenticatedUserError,
  selectAuthorizationStatus,
  selectUAuthenticatedUserIsLoading
} from '../../store';
import {PrivateRoute} from '../private-route';
import {AppRoute, AuthorizationStatus, Role} from '../../libs/shared/types';
import {IntroPage} from '../../pages/intro';
import {SingInPage} from '../../pages/sing-in';
import {SingUpPage} from '../../pages/sing-up';
import {QuestionnairePage} from '../../pages/questionnaire';
import {HomePage} from '../../pages/home';
import {PersonalAccountPage} from '../../pages/personal-account';
import {MyOrdersPage} from '../../pages/my-orders';
import {TrainingCatalogPage} from '../../pages/training-catalog';
import {TrainingCardPage} from '../../pages/training-card';
import {CreateTraining} from '../../pages/create-training/create-training';
import {Loader} from '../loader';
import {MyTrainingsPage} from '../../pages/my-trainings';
import {MyFriendsPage} from '../../pages/my-friends';
import {MyPurchasesPage} from '../../pages/my-purchases';
import {UserInfoPage} from '../../pages/user-info/user-info-page';
import {UsersPage} from '../../pages/users';
import {getRouteWithParam} from '../../libs/shared/helpers';

export const App = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const authenticatedUserError = useAppSelector(selectAuthenticatedUserError);
  const isUserLoading = useAppSelector(selectUAuthenticatedUserIsLoading);
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const isCoach = authenticatedUser?.role === Role.Coach;
  const isUser = authenticatedUser?.role === Role.User;

  if (authorizationStatus === AuthorizationStatus.Unknown || isUserLoading) {
    return <Loader/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Home} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          roleStatus={isUser}
          appRoute={AppRoute.Intro}
        >
          <HomePage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Intro} element={
        <PrivateRoute
          authorizationStatus={!isAuthenticated}
          appRoute={isCoach ? getRouteWithParam(AppRoute.PersonalAccount, {id: authenticatedUser.id}) : AppRoute.Home}
        >
          <IntroPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Login} element={
        <PrivateRoute
          authorizationStatus={!isAuthenticated}
          appRoute={isCoach ? getRouteWithParam(AppRoute.PersonalAccount, {id: authenticatedUser.id}) : AppRoute.Home}
        >
          <SingInPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Register} element={
        /*<PrivateRoute
          authorizationStatus={!isAuthenticated}
          appRoute={isCoach ? getRouteWithParam(AppRoute.PersonalAccount, {id: authenticatedUser.id}) : AppRoute.Home}
        >
          <SingUpPage/>
        </PrivateRoute>*/
        <SingUpPage/>
      }
      />
      <Route path={AppRoute.Questionnaire} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <QuestionnairePage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.CreateTraining} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          roleStatus={isCoach}
          appRoute={AppRoute.Intro}
        >
          <CreateTraining/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.MyTrainings} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          roleStatus={isCoach}
          appRoute={AppRoute.Intro}
        >
          <MyTrainingsPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.MyOrders} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          roleStatus={isCoach}
          appRoute={AppRoute.Intro}
        >
          <MyOrdersPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.MyFriends} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <MyFriendsPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.MyPurchases} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <MyPurchasesPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.UserInfo} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <UserInfoPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.PersonalAccount} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <PersonalAccountPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Trainings} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          roleStatus={isUser}
          appRoute={isAuthenticated && isCoach ? getRouteWithParam(AppRoute.PersonalAccount, {id: authenticatedUser.id}) : AppRoute.Intro}
        >
          <TrainingCatalogPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Training} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <TrainingCardPage/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Users} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
          roleStatus={isUser}
        >
          <UsersPage/>
        </PrivateRoute>
      }
      />
    </Routes>
  );
};
