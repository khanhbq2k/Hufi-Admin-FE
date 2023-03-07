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

export const getFlightBookingsDetailNew = (data: some = {}) => {
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

export const getActiveBankTransferList = (params = {}) => {
  const option = {
    method: 'get',
    url: '/checkout/getActiveBankTransferList',
    params,
  };
  return api(option);
};

export const getSupportPaySms = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/supportpaysms',
    params,
  };
  return api(option);
};

export const updateSupportPaySms = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/supportpaysms',
    data,
  };
  return api(option);
};

export const getConfirmationSms = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/getConfirmationSms',
    data,
  };
  return api(option);
};

export const sendSmsToCustomer = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/sendSmsToCustomer',
    data,
  };
  return api(option);
};

export const getBookerRequests = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/getBookerRequests',
    data,
  };
  return api(option);
};

export const getVatInvoiceDetail = (params = {}) => {
  const option = {
    method: 'get',
    url: '/vat-invoices/requests/detail',
    params,
  };
  return api(option);
};

export const deleteVatInvoiceDetail = (params = {}) => {
  const option = {
    method: 'put',
    url: '/vat-invoices/requests/cancel',
    params,
  };
  return api(option);
};

export const getActiveBenefitPackages = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getActiveBenefitPackages',
    params,
  };
  return api(option);
};

export const getVatInvoiceOrder = (params = {}) => {
  const option = {
    method: 'get',
    url: '/vat-invoices/orders',
    params,
  };
  return api(option);
};

export const updateBookingPriceDetails = (data = {}) => {
  const option = {
    method: 'post',
    url: '/flight/updateBookingPriceDetails',
    data,
  };
  return api(option);
};

export const supportPayMail = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/supportpaymail',
    params,
  };
  return api(option);
};

export const validateBookingInfoByReservation = (data = {}) => {
  const option = {
    method: 'post',
    url: '/flights/validateBookingInfoByReservation',
    data,
  };
  return api(option);
};

export const fetchPatchBookingInfoByReservation = (data = {}) => {
  const option = {
    method: 'post',
    url: '/flights/patchBookingInfoByReservation',
    data,
  };
  return api(option);
};

export const getPaymentGuideEmail = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getPaymentGuideEmail',
    params,
  };
  return api(option);
};

export const getConfirmationEmail = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/getConfirmationEmail',
    data,
  };
  return api(option);
};

export const sendEmail = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/sendEmail',
    data,
  };
  return api(option);
};

export const getEnterpriseInfo = (data = {}) => {
  const option = {
    method: 'post',
    url: '/utils/getEnterpriseInfo',
    data,
  };
  return api(option);
};

export const requestVatInvoices = (data = {}) => {
  const option = {
    method: 'post',
    url: '/vat-invoices/requests',
    data,
  };
  return api(option);
};

export const paymentTransactionHistory = (params = {}) => {
  const option = {
    method: 'get',
    url: '/payment/internal/transaction-history',
    params,
  };
  return api(option);
};

export const handleBooking = (data = {}) => {
  const option = {
    method: 'post',
    url: 'helpDesk/handleBooking',
    data,
  };
  return api(option);
};

export const assignBooking = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/assignBooking',
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

export const purchasingFlight = (data = {}, id: number) => {
  const option = {
    method: 'post',
    url: '/helpdesk/flight/purchasing?booking_id=' + id,
    data,
  };
  return api(option);
};

export const editHoldingTimeFlight = (data = {}) => {
  const option = {
    method: 'post',
    url: '/flight/editHoldingTime',
    data,
  };
  return api(option);
};

export const adminBookInsurance = (data = {}) => {
  const option = {
    method: 'post',
    url: 'insurance/adminBookInsurance',
    data,
  };
  return api(option);
};

export const rebookFlightSingleTicket = (data = {}) => {
  const option = {
    method: 'post',
    url: 'helpDesk/rebookFlightSingleTicket',
    data,
  };
  return api(option);
};

export const rebookFlightBooking = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/rebookFlightBooking',
    data,
  };
  return api(option);
};

export const findTicketsFlight = (data = {}) => {
  const option = {
    method: 'post',
    url: '/flights/helpDesk/findTickets',
    data,
  };
  return api(option);
};

export const editNoteToCustomer = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/flight/editNoteToCustomer',
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

export const getTagFlightBookingDetail = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/tag',
    params,
  };
  return api(option);
};

export const updateBookingTag = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateBookingTag',
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

export const fetchUpdateFlightTaskBookStatus = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/updateFlightTaskBookStatus',
    data,
  };
  return api(option);
};

export const getBookingTags = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getBookingTags',

    params,
  };
  return api(option);
};

export const checkDividable = (params = {}) => {
  const option = {
    method: 'get',
    url: '/flight/checkDividable',

    params,
  };
  return api(option);
};

export const divideBooking = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/divideBooking',

    data,
  };
  return api(option);
};

export const voidFlightSingleTicket = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/voidFlightSingleTicket',

    data,
  };
  return api(option);
};

export const voidedItinerary = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/voidedItinerary',

    params,
  };
  return api(option);
};

export const bankTransfer = (data = {}) => {
  const option = {
    method: 'post',
    url: '/help-desk/bank-transfer/get-bank-transfer-transactions',

    data,
  };
  return api(option);
};

export const createPayment = (data = {}) => {
  const option = {
    method: 'post',
    url: '/help-desk/create-payment',

    data,
  };
  return api(option);
};

export const paymentMethods = (params = {}) => {
  const option = {
    method: 'get',
    url: '/help-desk/payment/payment-methods',

    params,
  };
  return api(option);
};

export const confirmFlightSingleTicket = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/confirmFlightSingleTicket',

    data,
  };
  return api(option);
};

export const voidVnaTicketByPnr = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/utilities/voidVnaTicketByPnr',

    data,
  };
  return api(option);
};

export const searchUsers = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/search-users',

    params,
  };
  return api(option);
};
export const createFlightBookingNote = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/addBookingRemark',

    data,
  };
  return api(option);
};

export const getFlightBookingPostProcessing = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getFlightBookingPostProcessing',

    params,
  };
  return api(option);
};

export const getFlightBookingNote = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getBookingRemark',

    params,
  };
  return api(option);
};

export const getGeneralInfo = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/postProcessing/getGeneralInfo',

    params,
  };
  return api(option);
};

export const fetchGetByPassApproval = (params = {}) => {
  const option = {
    method: 'get',
    url: '/public/crm/user/policy',

    params,
  };
  return api(option);
};

export const fetchTripsByUser = (params = {}) => {
  const option = {
    method: 'get',
    url: '/public/crm/trips/by-user',

    params,
  };
  return api(option);
};

export const fetchCheckOverBudget = (data = {}) => {
  const option = {
    method: 'post',
    url: '/public/crm/trips/check-over-budget',

    data,
  };
  return api(option);
};

export const changeBookingVoidability = (params = {}) => {
  const option = {
    method: 'get',
    url: '/flights/changeBookingVoidability',

    params,
  };
  return api(option);
};

export const actionFlightBookingNoteImages = (method: 'get' | 'post', value: some = {}) => {
  const option = {
    method,
    url: '/help-desk/booking/assets',
  };
  return method !== 'post' ? api({ ...option, params: value }) : api({ ...option, data: value });
};

export const deleteFlightBookingNoteImages = (id: number) => {
  const option = {
    method: 'delete',
    url: `/help-desk/booking/assets/${id}`,

    data: {},
  };
  return api(option);
};
export const interpolateAdditionalPostProcessing = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/interpolateAdditionalPostProcessing',

    data,
  };
  return api(option);
};

export const getBankTransferTransactionsPostProcessing = (id: number) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getBankTransferTransactionsPostProcessing/' + id,
  };
  return api(option);
};

export const addFlightBookingPostProcessing = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/addFlightBookingPostProcessing',

    data,
  };
  return api(option);
};

export const getBookingWorkLogs = (params = {}) => {
  const option = {
    method: 'get',
    url: '/helpDesk/getWorkLogsOfBooking',

    params,
  };
  return api(option);
};

export const deleteFlightPostProcessing = (params = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/deleteFlightPostProcessing',

    params,
  };
  return api(option);
};

export const editFlightPostProcessing = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/editFlightPostProcessing',

    data,
  };
  return api(option);
};

export const getTransInfoPostProcessing = (id: number) => {
  const option = {
    method: 'get',
    url: `/helpDesk/getTransInfoPostProcessing/${id}`,
  };
  return api(option);
};

export const handleFlightBookingPostProcessing = (data = {}) => {
  const option = {
    method: 'post',
    url: `/helpDesk/handleFlightBookingPostProcessing/updateStatus`,

    data,
  };
  return api(option);
};

export const retrievePnr = (data = {}) => {
  const option = {
    method: 'post',
    url: `/flights/retrievePnr`,

    data,
  };
  return api(option);
};

export const checkCode = (data = {}) => {
  const option = {
    method: 'post',
    url: `/help-desk/check-code`,

    data,
  };
  return api(option);
};

export const createPreviewRefundRequest = (params = {}) => {
  const option = {
    method: 'post',
    url: `/helpDesk/createPreviewRefundRequest`,

    params,
  };
  return api(option);
};

export const refundPaymentMethod = (params = {}) => {
  const option = {
    method: 'get',
    url: `/refundPaymentMethod`,
    params,
  };
  return api(option);
};

export const updateRefundRequest = (data = {}) => {
  const option = {
    method: 'post',
    url: `/booking/createRefundBooking`,
    data,
  };
  return api(option);
};

export const getAllBank = (params = {}) => {
  const option = {
    method: 'get',
    url: `/helpDesk/getAllBank`,

    params,
  };
  return api(option);
};

export const getAllBankCode = (params = {}) => {
  const option = {
    method: 'get',
    url: `/management/account/getAllBankCode`,

    params,
  };
  return api(option);
};

export const fetchLookupUserBy = (params = {}) => {
  const option = {
    method: 'get',
    url: `/helpDesk/lookupUserBy`,

    params,
  };
  return api(option);
};

export const fetchEditUserOfBooking = (data = {}) => {
  const option = {
    method: 'post',
    url: `/helpDesk/editUserOfBooking`,

    data,
  };
  return api(option);
};

export const clearPromotionCode = (data = {}) => {
  const option = {
    method: 'post',
    url: '/helpDesk/clearPromotionCode',

    data,
  };
  return api(option);
};

export const getErrorTags = () => {
  const option = {
    method: 'get',
    url: '/common/error-tags',
  };
  return api(option);
};

export const getErrorTagsSolutions = () => {
  const option = {
    method: 'get',
    url: '/common/error-tags/solutions',
  };
  return api(option);
};

export const getErrorTagsStatus = (data = {}) => {
  const option = {
    method: 'put',
    url: '/reconcile/schedules/error-tags/status',

    data,
  };
  return api(option);
};

export const getErrorTagsHandling = (data = {}) => {
  const option = {
    method: 'put',
    url: '/reconcile/schedules/error-tags/handling',

    data,
  };
  return api(option);
};

export const getErrorTagsReconcile = (params = {}) => {
  const option = {
    method: 'get',
    url: '/reconcile/schedules/error-tags',

    params,
  };
  return api(option);
};

export const updateErrorTagsReconcile = (data = {}) => {
  const option = {
    method: 'put',
    url: '/reconcile/schedules/error-tags',

    data,
  };
  return api(option);
};
export const getReconlitionDetail = (params = {}) => {
  const option = {
    method: 'get',
    url: '/reconcile/schedules/error-tags/detail',

    params,
  };
  return api(option);
};

export const getNotes = (params = {}) => {
  const option = {
    method: 'get',
    url: '/bo-notes',

    params,
  };
  return api(option);
};

export const addNotes = (data = {}) => {
  const option = {
    method: 'post',
    url: '/bo-notes/add',

    data,
  };
  return api(option);
};

export const getHistoryLog = (data = {}) => {
  const option = {
    method: 'post',
    url: '/bo/common/user-update-logs',

    data,
  };
  return api(option);
};
