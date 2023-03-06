import { some } from '~/utils/constants/constant';

export interface BookingsOnlineType {
  booking: some;
  payment: some;
  user: some;
  tickets: some;
  contact: some;
  passengers: some;
}

export interface PagingOnline {
  page: number;
  size: number;
}

export interface InvoiceFlightType {
  id: number;
  status: string;
  items: [];
}
