import api from '~/utils/helpers/api';
import { some } from './../utils/constants/constant';

export const getFlightBookings = (params = {}) => {
  const option = {
    method: 'get',
    url: '/crm/flight/booking',
    params,
  };
  return api(option);
};

export const getFlightBookingsDetail = (data: some = {}) => {
  const option = {
    method: 'get',
    url: '/crm/flight/booking/' + data?.id,
  };
  return api(option);
};

export const getFlightExtractors = (params = {}) => {
  const option = {
    method: 'get',
    url: '/crm/flight/extractor',
    params,
  };
  return api(option);
};

export const activateFlightExtractor = (data: some = {}) => {
  const option = {
    method: 'post',
    url: '/crm/flight/extractor/activate',
    data,
  };
  return api(option);
};

export const deactivateFlightExtractor = (data: some = {}) => {
  const option = {
    method: 'post',
    url: '/crm/flight/extractor/deactivate',
    data,
  };
  return api(option);
};

export const updateFlightGuestInfo = (bookingId: number, data = {}) => {
  const option = {
    method: 'post',
    url: '/crm/booking/' + bookingId + '/guest',
    data,
  };
  return api(option);
};

export const updateFlightContactInfo = (bookingId: number, data: some = {}) => {
  const option = {
    method: 'post',
    url: '/crm/booking/' + bookingId + '/contact',
    data,
  };
  return api(option);
};

export const updateItineraryInfo = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateItineraryInfo',
    data,
  };
  return api(option);
};

export const updateFlightBookingPnr = (bookingId: number, data: some = {}) => {
  const option = {
    method: 'post',
    url: '/crm/booking/' + bookingId + '/ticket',
    data,
  };
  return api(option);
};
