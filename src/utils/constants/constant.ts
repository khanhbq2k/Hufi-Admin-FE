import { ItemListOptionFilterFlight } from '~/components/popover/Modal';

export const TOKEN = 'token';
export const VERSION_HOTEL_SERVICE = '1.0';

/// link ảnh google api ///
export const PRE_URL_GOOGLE_APIS_IMG = 'https://storage.googleapis.com/tripi-assets/crm_premium';

export const listImg = {
  bannerLoginUrl: `${PRE_URL_GOOGLE_APIS_IMG}/img_banner_loogin.png`,
  imgEmptyInvoiceFlight: `${PRE_URL_GOOGLE_APIS_IMG}/img_empty_invoice_flight.png`,
};
/// data save local storage ///
export const DEVICE_ID = 'device-id';
export const LAST_LINK_PREVIEW = 'last-link-preview';
export const LAST_FILTERS_FLIGHT_ONLINE = 'last-filters-flight-online';
export const LAST_FILTERS_HOTEL_ONLINE = 'last-filters-hotel-online';
export const IS_COLLAPSIBLE = 'isCollapsible';
export const IS_OPTIMIZE = 'isOptimize';

export const TIME_OUT_QUERY_API_FLIGHT_SEARCH = 800;
export const TIME_OUT_QUERY_API_FLIGHT_REMOVE_FIELD = 300;

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

// list data option cho ô search flight
//trạng thái thanh toán
export const paymentStatusFlight: ItemListOptionFilterFlight[] = [
  { name: 'Thành công', id: 'success' },
  { name: 'Hoàn thành', id: 'completed' },
  { name: 'Hoàn trả', id: 'refunded' },
  { name: 'Chờ thanh toán', id: 'pending' },
  { name: 'Thất bại', id: 'failed' },
];

// trạng thái xử lý
export const handlingStatusesFlight: ItemListOptionFilterFlight[] = [
  { name: 'Chưa xử lý', id: 'waiting' },
  { name: 'Đang xử lý', id: 'handling' },
  { name: 'Đã xử lý', id: 'finish' },
];
// Phương thức thanh toán
export const paymentMethodsFlight: ItemListOptionFilterFlight[] = [
  { name: 'Visa, Master Card', id: 'VM' },
  { name: 'Thẻ JCB', id: 'JCB' },
  { name: 'ATM nội địa', id: 'ATM' },
  { name: 'Chuyển khoản', id: 'BT' },
  { name: 'Tiền mặt', id: 'CA' },
  { name: 'Giữ chỗ', id: 'PL' },
  { name: 'Credit', id: 'CD' },
  { name: 'QR-PAY', id: 'QR' },
  { name: 'Thanh toán Ví VNPAY', id: 'VNPAYWALLET' },
  { name: 'Kredivo', id: 'KREDIVO' },
];
// Nhà cung cấp
export const agentList: ItemListOptionFilterFlight[] = [
  { name: 'VN', id: 'VN' },
  { name: 'QH', id: 'QH' },
  { name: 'VJ', id: 'VJ' },
  { name: '1G', id: '1G' },
  { name: '1A', id: '1A' },
  { name: 'VJR', id: 'VJR' },
  { name: 'QHR', id: 'QHR' },
  { name: 'VUR', id: 'VUR' },
  { name: 'KWR', id: 'KWR' },
];
export interface ItemListOptionFilterStatusFlight {
  name: string;
  id: 'success' | 'pending';
}
// Trạng thái đặt vé
export const confirmStatusList: ItemListOptionFilterStatusFlight[] = [
  { name: 'Đã xác nhận', id: 'success' },
  { name: 'Chưa xác nhận', id: 'pending' },
];
