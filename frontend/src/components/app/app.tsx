import { Route, Routes } from 'react-router-dom';

import { Role } from '@fitfriends/lib/shared/types';

import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectIsLoading, selectUser } from '../../store';
import { PrivateRoute } from '../../lib/private-route';
import { AppRoute, AuthorizationStatus } from '../../lib/shared/types';
import { IntroPage } from '../../pages/intro';
import { SingInPage } from '../../pages/sing-in';
import { SingUpPage } from '../../pages/sing-up';
import { QuestionnairePage } from '../../pages/questionnaire';
import { HomePage } from '../../pages/home';
import { PersonalAccountPage } from '../../pages/personal-account';
import { MyOrdersPage } from '../../pages/my-orders';
import { TrainingCatalogPage } from '../../pages/training-catalog';
import { TrainingCardPage } from '../../pages/training-card';
import { CreateTraining } from '../../pages/create-training/create-training';
import { Loader } from '../loader';

export const App = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsLoading);
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const isCoach = user?.role === Role.Coach;
  const isSportsman = user?.role === Role.Sportsman;

  if (isUserLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path={ AppRoute.Intro } element={ <IntroPage /> } />
      <Route path={ AppRoute.Home } element={
        <PrivateRoute
          roleStatus={ isSportsman }
          appRoute={ AppRoute.Intro }
        >
          <HomePage />
        </PrivateRoute>
      }
      />
      <Route path={ AppRoute.Login } element={ <SingInPage /> } />
      <Route path={ AppRoute.Register } element={ <SingUpPage /> } />
      <Route path={ AppRoute.CreateTraining } element={
        <PrivateRoute
          authorizationStatus={ isAuthenticated }
          roleStatus={ isCoach }
          appRoute={ AppRoute.Intro }
        >
          <CreateTraining />
        </PrivateRoute>
      }
      />
      <Route path={ AppRoute.Questionnaire } element={
        <PrivateRoute
          authorizationStatus={ isAuthenticated }
          appRoute={ AppRoute.Intro }
        >
          <QuestionnairePage />
        </PrivateRoute>
      }
      />
      <Route path={ AppRoute.PersonalAccount } element={
        <PrivateRoute
          authorizationStatus={ isAuthenticated }
          appRoute={ AppRoute.Intro }
        >
          <PersonalAccountPage />
        </PrivateRoute>
      }
      >
        <Route path={ AppRoute.MyOrders } element={ <MyOrdersPage /> } />
      </Route>
      <Route path={ AppRoute.TrainingCatalog } element={ <TrainingCatalogPage/> } />
      <Route path={ AppRoute.TrainingCard } element={ <TrainingCardPage /> } />
    </Routes>
  );
};
