import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { DATE_TIME } from '~/features/flight/constant';
import { some, listImg } from '~/utils/constants/constant';
import { useAppSelector } from '~/utils/hook/redux';
import { formatMoney, getPaymentHistoryStatus } from '~/utils/helpers/helpers';
import { IconRefreshGrayrice } from '~/assets';
import { fetFlightBookingsDetail } from '~/features/flight/flightSlice';

interface DataType {
  id: number;
  userId: number;
  transactionCode: string;
  cardType: string;
  transactionDate: string;
  amount: number;
  paymentFee: number;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Phương thức thanh toán',
    dataIndex: 'cardType',
    fixed: 'left',
    width: 200,
  },
  {
    title: 'Thời gian giao dịch',
    dataIndex: 'transactionDate',
    render: (text) => {
      return <div>{moment(text).format(DATE_TIME)}</div>;
    },
    fixed: 'left',
  },
  {
    title: 'Tổng thanh toán',
    dataIndex: 'amount',
    render: (text) => {
      return <div>{formatMoney(text)}</div>;
    },
    fixed: 'left',
  },
  {
    title: 'Mã giao dịch',
    dataIndex: 'transactionNumber',
  },
  {
    title: 'Transaction ID',
    dataIndex: 'id',
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
  },
  {
    title: 'Phí',
    render: () => {
      return <div>0</div>;
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (text) => {
      const status = getPaymentHistoryStatus(text);
      return <div style={{ color: status?.color }}>{status?.title}</div>;
    },
    fixed: 'right',
  },
];

const PaymentHistory = () => {
  const booking = useAppSelector((state: some) => state?.flightReducer.flightOnlineDetail);

  const handleRefresh = () => {
    fetFlightBookingsDetail({
      id: booking?.booking?.bookingId,
    });
  };

  return (
    <>
      {!booking?.transaction ? (
        <div className='invoice-flight'>
          <div className='empty-invoice'>
            <img src={listImg.imgEmptyInvoiceFlight} alt='' className='img-empty' />
            <span>Bạn chưa có lịch sử thanh toán nào</span>
          </div>
        </div>
      ) : (
        <div className='payment-history-refresh'>
          <Button onClick={handleRefresh}>
            Refresh <IconRefreshGrayrice />
          </Button>
          <Table columns={columns} dataSource={[booking?.transaction]} pagination={false} />
        </div>
      )}
    </>
  );
};

export default PaymentHistory;
