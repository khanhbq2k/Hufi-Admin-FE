import Cookie from 'js-cookie';
import * as constants from '~/utils/constants/constant';
import { some } from '~/utils/constants/constant';

export function isAuthenticate() {
  return !!Cookie.get(constants.TOKEN);
}

const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const removeAccent = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};

export const getAbsoluteMonths = (momentDate: any) => {
  const months = Number(momentDate.format('MM'));
  const years = Number(momentDate.format('YYYY'));
  return months + years * 12;
};

export const getMonthDifference = (startDate: any, endDate: any) => {
  const startMonths = getAbsoluteMonths(startDate);
  const endMonths = !isEmpty(endDate) ? getAbsoluteMonths(endDate) : startMonths;
  return endMonths - startMonths;
};

export const adapterQueryFlight = (formData: some = {}, paging: some = {}) => {
  return {
    bookingId: formData.dealId,
    userId: formData.userId,
    status: formData.confirmStatus,
    page: paging.page,
    size: paging.size,
  };
};

export const formatMoney = (amount: any = 0, decimalLength = 0, decimal = '.', thousands = ',') => {
  try {
    let decimalCount = Math.abs(decimalLength);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '') +
      '₫'
    );
  } catch (e) {
    throw e;
  }
};

export const getBookStatusFlight = (bookStatus: any) => {
  switch (bookStatus) {
    case 'pending':
      return {
        title: 'Chưa xuất vé',
        color: '#FFB30F',
        backGround: '#FFFAEE',
        detailTitle: 'Chưa xuất vé',
      };
    case 'holding':
      return {
        title: 'Đang giữ chỗ',
        color: '#FFB30F',
        backGround: '#FFFAEE',
        detailTitle: 'Đang giữ chỗ',
      };
    case 'in_progress':
      return {
        title: 'Đang xử lý',
        color: '#FFB30F',
        backGround: '#FFFAEE',
        detailTitle: 'Đang xử lý',
      };
    case 'failed':
      return {
        title: 'Xuất vé thất bại',
        color: '#FF2C00',
        backGround: '#FFF0ED',
        detailTitle: 'Xuất vé thất bại',
      };
    case 'voided':
      return {
        title: 'Đã hủy vé',
        color: '#FF2C00',
        backGround: '#FFF0ED',
        detailTitle: 'Đã hủy vé',
      };
    case 'success':
      return {
        title: 'Thành công',
        color: '#007864',
        backGround: '#E9FCEE',
        detailTitle: 'Đặt vé thành công',
      };
    case 'confirmed':
      return {
        title: 'Đã xuất vé',
        color: '#007864',
        backGround: '#E9FCEE',
        detailTitle: 'Đã xuất vé',
      };
    default:
      return {
        title: 'Chưa đặt vé',
        color: '#FFB30F',
        backGround: '#FFFAEE',
        detailTitle: 'Chưa đặt vé',
      };
  }
};

export const getStatusFlight = (status: any) => {
  switch (status) {
    case 'pending':
      return {
        title: 'Chưa thanh toán',
        color: '#FFB30F',
        backGround: '#FFFAEE',
        detailTitle: 'Chưa thanh toán',
      };
    case 'failed':
      return {
        title: 'Xuất vé thất bại',
        color: '#FF2C00',
        backGround: '#FFF0ED',
        detailTitle: 'Xuất vé thất bại',
      };
    case 'success':
      return {
        title: 'Đặt vé thành công',
        color: '#007864',
        backGround: '#E9FCEE',
        detailTitle: 'Đặt vé thành công',
      };
    default:
      return {
        title: 'Chưa đặt vé',
        color: '#FFB30F',
        backGround: '#FFFAEE',
        detailTitle: 'Chưa đặt vé',
      };
  }
};

export const PNR_STATUS = [
  {
    title: 'Chưa có',
    stt: 'pending',
    color: '#FFB30F',
  },
  {
    title: 'Đã xuất',
    stt: 'success',
    color: '#007864',
  },
  {
    title: 'Thất bại',
    stt: 'failed',
    color: '#FF2C00',
  },
];

export const getPaymentStatusFlight = (paymentStatus: any) => {
  switch (paymentStatus) {
    case 'pending':
      return {
        title: 'Chưa thanh toán',
        color: '#FFB30F',
        detailTitle: 'Chưa thanh toán',
        backGround: '#FFFAEE',
      };
    case 'failed':
      return {
        title: 'Thanh toán thất bại',
        color: '#FF2C00',
        detailTitle: 'Thanh toán thất bại',
        backGround: '#FFF0ED',
      };
    case 'awaiting':
      return {
        title: 'Chờ thanh toán',
        color: '#FFB30F',
        detailTitle: 'Chờ thanh toán',
        backGround: '#FFFAEE',
      };
    case 'cancelling_holding':
      return {
        title: 'Yêu cầu hủy giữ vé',
        color: '#FFB30F',
        detailTitle: 'Yêu cầu hủy giữ vé',
        backGround: '#FFFAEE',
      };
    case 'holding':
      return {
        title: 'Đang giữ tiền',
        color: '#FFB30F',
        detailTitle: 'Đang giữ tiền',
        backGround: '#FFFAEE',
      };
    case 'success':
    case 'completed':
      return {
        title: 'Thành công',
        color: '#007864',
        detailTitle: 'Thanh toán thành công',
        backGround: '#E9FCEE',
      };
    case 'refunded':
      return {
        title: 'Đã hoàn tiền',
        color: '#004ebc',
        detailTitle: 'Đã hoàn tiền',
        backGround: '#FFFAEE',
      };
    default:
      return {
        title: 'Chưa đặt vé',
        color: '#FFB30F',
        detailTitle: 'Chưa đặt vé',
        backGround: '#FFFAEE',
      };
  }
};

export const removeFieldEmptyFilter = (formData: some = {}) => {
  let result: some = {};
  if (!isEmpty(formData?.createdDate)) {
    formData = {
      ...formData,
      createdFromDate: formData.createdDate.createdFromDate,
      createdToDate: formData.createdDate.createdToDate,
    };
    delete formData.createdDate;
  }
  if (!isEmpty(formData?.departureDate)) {
    formData = {
      ...formData,
      departureFromDate: formData.departureDate.departureFromDate,
      departureToDate: formData.departureDate.departureToDate,
    };
    delete formData.departureDate;
  }
  const keyNames = Object.keys(formData);
  keyNames.forEach((el) => {
    if (!isEmpty(formData[el])) {
      result = {
        ...result,
        [el]: Array.isArray(formData[el]) ? formData[el].join(',') : formData[el],
      };
    }
  });
  return result;
};

export const getPaymentHistoryStatus = (historyStatus: string) => {
  switch (historyStatus) {
    case 'success': {
      return {
        title: 'Thành công',
        color: '#158C32',
      };
    }
    case 'failed': {
      return {
        title: 'Thất bại',
        color: '#FF2C00',
      };
    }
    default: {
      return {
        title: 'Chờ thanh toán',
        color: '#004EBC',
      };
    }
  }
};

export const stringSlug = (string = '') => {
  const separator = '-';
  const includeDot = false;
  let text = string;
  if (!text) text = '';
  text = text.toString().toLowerCase().trim();
  const sets = [
    { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
    { to: 'c', from: '[ÇĆĈČ]' },
    { to: 'd', from: '[ÐĎĐÞ]' },
    { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
    { to: 'g', from: '[ĜĞĢǴ]' },
    { to: 'h', from: '[ĤḦ]' },
    { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
    { to: 'j', from: '[Ĵ]' },
    { to: 'ij', from: '[Ĳ]' },
    { to: 'k', from: '[Ķ]' },
    { to: 'l', from: '[ĹĻĽŁ]' },
    { to: 'm', from: '[Ḿ]' },
    { to: 'n', from: '[ÑŃŅŇ]' },
    { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
    { to: 'oe', from: '[Œ]' },
    { to: 'p', from: '[ṕ]' },
    { to: 'r', from: '[ŔŖŘ]' },
    { to: 's', from: '[ßŚŜŞŠ]' },
    { to: 't', from: '[ŢŤ]' },
    { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
    { to: 'w', from: '[ẂŴẀẄ]' },
    { to: 'x', from: '[ẍ]' },
    { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
    { to: 'z', from: '[ŹŻŽ]' },
  ];

  if (includeDot) sets.push({ to: '-', from: "[·/_.,:;']" });
  else sets.push({ to: '-', from: "[·/_,:;']" });

  sets.forEach((set) => {
    text = text.replace(new RegExp(set.from, 'gi'), set.to);
  });

  text = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

  if (typeof separator !== 'undefined' && separator !== '-') {
    text = text.replace(/-/g, separator);
  }

  return text ? text : 'a';
};
