import { Layout } from 'antd';
import { FC, ReactNode, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import {
  AirlinesType,
  AirportType,
  fetAirlines,
  fetAirports,
  fetCountries,
  fetUserInfoAsync,
} from '~/features/systems/systemSlice';
import { isAuthenticate, isEmpty } from '~/utils/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';
import HeaderContainer from '~/components/Layout/HeaderContainer';
import LeftSideBar from '~/components/Layout/LeftSideBar';
import Loading from '~/components/loading/Loading';
import Dashboard from '~/features/example/Dashboard';
import Login from '~/features/login/login';
import { routes, some, TOKEN } from '~/utils/constants/constant';
import '~/components/Layout/layout.scss';
import FlightOnline from '~/features/flight/online/Flight';
import FlightDetail from '~/features/flight/online/detail/FlightDetail';
import PageNotFound from './components/404Page/PageNotFound';
import FlightExtractor from './features/flight/extractor/FlightExtractor';
import UserList from './features/flight/user/user';

const { Content } = Layout;

interface UserInfo {
  roles?: Array<string>;
}

const RoutesComponent: FC = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const userInfo: UserInfo = useAppSelector((state) => state.systemReducer.userInfo);
  const airlines: AirlinesType[] = useAppSelector((state) => state.systemReducer.airlines);
  const airports: AirportType[] = useAppSelector((state) => state.systemReducer.airports);
  const countries: some[] = useAppSelector((state) => state.systemReducer.countries);

  useEffect(() => {
    if (isAuthenticate()) {
      if (isEmpty(userInfo)) {
        getUserInfo();
      }
      if (isEmpty(airlines)) {
        dispatch(fetAirlines());
      }
      if (isEmpty(airports)) {
        dispatch(fetAirports());
      }
      if (isEmpty(countries)) {
        dispatch(fetCountries());
      }
    }
  }, [location]);

  const getUserInfo = async () => {
    try {
      const data = await dispatch(fetUserInfoAsync());
    } catch (rejectedValueOrSerializedError) {
      console.log('rejectedValueOrSerializedError', rejectedValueOrSerializedError);
    }
  };
  return (
    <>
      <Loading />
      <Routes>
        <Route
          path={routes.DASHBOARD}
          element={<ProtectedRoute redirectPath={routes.LOGIN} isAllowed={isAuthenticate()} />}
        >
          <Route path={routes.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path={routes.LOGIN} element={<Login />} />

        {/* SALE */}
        <Route
          element={<ProtectedRoute redirectPath={routes.LOGIN} isAllowed={isAuthenticate()} />}
        >
          <Route path={routes.SALE}>
            {/* flight */}
            <Route path={routes.FLIGHT}>
              {/* FLIGHT LIST */}
              <Route path={routes.FLIGHT_ONLINE} element={<FlightOnline />} />
              <Route path={routes.FLIGHT_ONLINE}>
                <Route path=':id' element={<FlightDetail />} />
              </Route>
              {/* FLIGHT AIRLINE */}
              <Route path={routes.FLIGHT_EXTRACTOR} element={<FlightExtractor />} />
              {/* FLIGHT USER */}
              <Route path={routes.FLIGHT_USER} element={<UserList />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

interface SomeComponentProps {
  redirectPath?: string;
  children?: ReactNode;
  isAllowed: boolean;
}

const ProtectedRoute: FC<SomeComponentProps> = ({
  redirectPath = '/login',
  children = null,
  isAllowed,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Layout>
      <Loading />
      <HeaderContainer />
      <Layout hasSider className='container'>
        <LeftSideBar />
        <Layout className={`site-layout`}>
          <Content className='main-content'>{children ? children : <Outlet />}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RoutesComponent;
