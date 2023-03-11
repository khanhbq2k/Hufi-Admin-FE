import { ItemListOptionFilterFlight } from '~/components/popover/Modal';

export const TOKEN = 'token';
export const VERSION_HOTEL_SERVICE = '1.0';

/// data save local storage ///
export const DEVICE_ID = 'device-id';

export const TIME_OUT_QUERY_API_FLIGHT_SEARCH = 800;

export type some = { [key: string]: any };

// routes
export const routes = {
  LOGIN: '/login',
  DASHBOARD: '/',
  LANDING: '/landing',
  SALE: 'sale',
  FLIGHT: 'flight',
  FLIGHT_EXTRACTOR: 'extractors',
  FLIGHT_ONLINE: 'online',
  FLIGHT_USER: 'user',
};

export const paymentStatusFlight: ItemListOptionFilterFlight[] = [
  { name: 'Thành công', id: 'success' },
  { name: 'Chờ thanh toán', id: 'pending' },
  { name: 'Thất bại', id: 'failed' },
];

export interface ItemListOptionFilterStatusFlight {
  name: string;
  id: 'success' | 'pending';
}

export const confirmStatusList: ItemListOptionFilterStatusFlight[] = [
  { name: 'Đã xác nhận', id: 'success' },
  { name: 'Chưa xác nhận', id: 'pending' },
];
