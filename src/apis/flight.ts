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

export const updateFlightGuestInfo = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateFlightGuestInfo',
    data,
  };
  return api(option);
};

export const updateFlightBookerInfo = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateFlightBookerInfo',
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

export const updateFlightPNRCodes = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateFlightPNRCode',
    data,
  };
  return api(option);
};

export const updateFlightBookingCodes = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateFlightBookingCode',
    data,
  };
  return api(option);
};
