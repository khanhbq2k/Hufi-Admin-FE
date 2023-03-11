import { Rule } from 'antd/lib/form';
import { ItemListOptionFilterStatusFlight, routes } from '~/utils/constants/constant';

export const LIST_GENDER = [
  {
    code: 'M',
    name: 'Nam',
  },
  {
    code: 'F',
    name: 'Nữ',
  },
];

interface ListFilterDefault {
  name: string;
  key: string;
  type: 'text' | 'radio';
  options?: ItemListOptionFilterStatusFlight[];
  rules?: Rule[];
}
export const listFilterDefault: ListFilterDefault[] = [
  {
    name: 'IDS_TEXT_ORDER_CODE',
    key: 'dealId',
    type: 'text',
  },
  {
    name: 'IDS_TEXT_ID_BOOKER',
    key: 'userId',
    type: 'text',
  },
];

export const subRouteSelected = [
  {
    pathname: `/${routes.SALE}/${routes.FLIGHT}/${routes.FLIGHT_ONLINE}`,
  },
];

export const TICKET_CLASS_CODE = [
  {
    code: 'economy',
    v_name: 'Phổ Thông',
  },
  {
    code: 'premium_economy',
    v_name: 'Phổ Thông Đặc Biệt',
  },
  {
    code: 'business',
    v_name: 'Thương Gia',
  },
  {
    code: 'first',
    v_name: 'Hạng Nhất',
  },
];
