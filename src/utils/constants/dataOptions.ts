import { Rule } from 'antd/lib/form';
import { ItemListOptionFilterFlight } from '~/components/popover/Modal';
import { ItemListOptionFilterStatusFlight, routes, some } from '~/utils/constants/constant';

export const listOpenClose = [
  {
    id: 'OPEN',
    name: 'Mở cửa',
  },
  {
    id: 'CLOSE',
    name: 'Đóng cửa',
  },
];

export const listGender = [
  {
    code: 'M',
    name: 'Nam',
  },
  {
    code: 'F',
    name: 'Nữ',
  },
];

export const listAgeCategory = [
  {
    code: 'adult',
    name: 'Người lớn',
  },
  {
    code: 'children',
    name: 'Trẻ em',
  },
  {
    code: 'baby',
    name: 'Em bé',
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

export interface ItemFilterAddFlight {
  name: string;
  key: string;
  type:
    | 'text'
    | 'date'
    | 'select'
    | 'radio'
    | 'addFileds'
    | 'selectSingle'
    | 'selectSubGroup'
    | 'autoSearch';
  keys?: string[];
  listOptions?: ItemListOptionFilterFlight[];
  isListOptionsDefault?: boolean;
  options?: ItemListOptionFilterStatusFlight[];
  listFields?: some;
}

export const subRouteSelected = [
  {
    pathname: `/${routes.SALE}/${routes.FLIGHT}/${routes.FLIGHT_ONLINE}`,
  },
];

export const listPostProcessingEdit = [
  {
    id: 'Đổi vé',
    name: 'Đổi vé',
  },
  {
    id: 'Đổi tên',
    name: 'Đổi tên',
  },
  {
    id: 'Tách code',
    name: 'Tách code',
  },
  {
    id: 'Thêm hành lý',
    name: 'Thêm hành lý',
  },
  {
    id: 'Thêm suất ăn',
    name: 'Thêm suất ăn',
  },
  {
    id: 'Thêm chỗ ngồi',
    name: 'Thêm chỗ ngồi',
  },
  {
    id: 'Thêm em bé',
    name: 'Thêm em bé',
  },
  {
    id: 'Thêm bảo hiểm',
    name: 'Thêm bảo hiểm',
  },
  {
    id: 'Thu chênh lệch giá vé',
    name: 'Thu chênh lệch giá vé',
  },
  {
    id: 'EMD - Bảo Lưu',
    name: 'EMD - Bảo Lưu',
  },
];

export const listPostProcessingFly = [
  {
    id: 1,
    name: 'Chiều đi',
  },
  {
    id: 0,
    name: 'Chiều về',
  },
  {
    id: 2,
    name: 'Cả đơn hàng',
  },
];

export const listTicketClassCode = [
  {
    id: 'business',
    name: 'Business',
  },
  {
    id: 'economy',
    name: 'Economy',
  },
];

export const listGenderContact = [
  {
    id: 'Mr',
    name: 'Ông',
  },
  {
    id: 'Mrs',
    name: 'Bà',
  },
];

export const listVoidPostProcessingEdit = [
  {
    id: 'Void vé',
    name: 'Void vé',
  },
  {
    id: 'Hoàn vé',
    name: 'Hoàn vé',
  },
  {
    id: 'Đơn lỗi',
    name: 'Đơn lỗi',
  },
];

export const listTypeVoidPostProcessingEdit = [
  {
    id: 'Hoàn theo điều kiện từ yêu cầu của khách',
    name: 'Hoàn theo điều kiện từ yêu cầu của khách',
  },
  {
    id: 'Theo điều kiện',
    name: 'Theo điều kiện',
  },
  {
    id: 'Bảo lưu',
    name: 'Bảo lưu',
  },
  {
    id: 'SC',
    name: 'SC',
  },
  {
    id: 'Khác',
    name: 'Khác',
  },
];
