// lib
import { Layout } from 'antd';
import { FC, ReactNode, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

// func
import {
  AirlinesType,
  AirportType,
  AllowAgentType,
  fetAirlines,
  fetAirports,
  fetUserInfoAsync,
  visiblecollaps,
} from '~/features/systems/systemSlice';
import { isAuthenticate, isEmpty } from '~/utils/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';

// component
import HeaderContainer from '~/components/Layout/HeaderContainer';
import LeftSideBar from '~/components/Layout/LeftSideBar';
import Loading from '~/components/loading/Loading';
import Dashboard from '~/features/example/Dashboard';
import Login from '~/features/login/login';
import { IS_COLLAPSIBLE, routes, some, TOKEN } from '~/utils/constants/constant';

import '~/components/Layout/layout.scss';
import Sample from '~/features/example/Sample';

import FlightOnline from '~/features/flight/online/Flight';
import FlightDetail from '~/features/flight/online/detail/FlightDetail';
import FlightOffline from '~/features/flight/offline/FilghtOffline';
import Reconciliation from '~/features/flight/reconciliation/Reconciliation';
import ErrorDetailPage from '~/features/flight/reconciliation/ErrorDetailPage';
import HotelOnline from '~/features/hotel/online/HotelOnline';
import HotelOffline from '~/features/hotel/offline/HotelOffline';
import HotelOnlineDetail from '~/features/hotel/online/detail/HotelOnlineDetail';
import FlightApproval from './features/approval/flight/FlightApproval';
import HotelApproval from './features/approval/hotel/HotelApproval';
import TransferSupport from './features/payment_support/transfer/BankTransfer';
import BankTransfer from './features/payment_support/transfer/BankTransfer';
import PaymentSupportTools from './features/tools/payment_tools/PaymentSupportTools';
import PageNotFound from './components/404Page/PageNotFound';
import CreditHoldTransaction from './features/payment_support/credit_hold_transaction/CreditHoldTransaction';
import BankAccountList from './features/tools/payment_tools/components/BankAccountList';
import AccountListDA from './features/tools/payment_tools/components/AccountListDA';
import Cookies from 'js-cookie';
import FlightExtractor from './features/flight/extractor/FlightExtractor';

const { Content } = Layout;

interface UserInfo {
  roles?: Array<string>;
}

const RoutesComponent: FC = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const userInfo: UserInfo = useAppSelector((state) => state.systemReducer.userInfo);
  const allowAgents: AllowAgentType[] = useAppSelector((state) => state.systemReducer.allowAgents);
  const airlines: AirlinesType[] = useAppSelector((state) => state.systemReducer.airlines);
  const airports: AirportType[] = useAppSelector((state) => state.systemReducer.airports);
  const countries: some[] = useAppSelector((state) => state.systemReducer.countries);
  const salesList: some[] = useAppSelector((state) => state.flightReducer.salesList);

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
      // if (isEmpty(countries)) {
      //   dispatch(fetAllCountries());
      // }
    }
  }, [location]);

  useEffect(() => {
    dispatch(visiblecollaps(localStorage.getItem(IS_COLLAPSIBLE) === 'true'));
  }, []);

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
              <Route path={routes.FLIGHT_USER} element={<AccountListDA />} />
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
  const collapsible: boolean = useAppSelector((state) => state.systemReducer.collapsible);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <Layout>
      <Loading />
      <HeaderContainer />
      <Layout hasSider className='container'>
        <LeftSideBar />
        <Layout className={`site-layout ${collapsible ? 'site-layout-collap' : ''}`}>
          <Content className='main-content'>{children ? children : <Outlet />}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RoutesComponent;
