import {Route, Routes} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getRecommendedTrainingsAction,
  selectAuthenticatedUser,
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
import {useEffect} from 'react';

export const App = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const isUserLoading = useAppSelector(selectUAuthenticatedUserIsLoading);
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const isCoach = authenticatedUser?.role === Role.Coach;
  const isUser = authenticatedUser?.role === Role.User;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecommendedTrainingsAction());
  }, [authenticatedUser, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isUserLoading) {
    return <Loader/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage/>}></Route>
      <Route path={AppRoute.Login} element={<SingInPage/>}/>
      <Route path={AppRoute.Register} element={<SingUpPage/>}/>
      <Route path={AppRoute.Home} element={
        <PrivateRoute
          roleStatus={isUser}
          appRoute={AppRoute.Intro}
        >
          <HomePage/>
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
      <Route path={AppRoute.Questionnaire} element={
        <PrivateRoute
          authorizationStatus={isAuthenticated}
          appRoute={AppRoute.Intro}
        >
          <QuestionnairePage/>
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
      >
        <Route path={AppRoute.MyOrders} element={<MyOrdersPage/>}/>
      </Route>
      <Route path={AppRoute.Trainings} element={<TrainingCatalogPage/>}/>
      <Route path={AppRoute.Training} element={<TrainingCardPage/>}/>
    </Routes>
  );
};
