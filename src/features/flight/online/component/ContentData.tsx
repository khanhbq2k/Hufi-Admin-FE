import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { IconRefreshGrayrice } from '~/assets';
import PaginationTable from '~/components/pagination/PaginationTable';
import SmsEmailModal from '~/features/flight/components/modal/SmsEmailModal';
import { MODAL_KEY_EMAIL, MODAL_KEY_SMS } from '~/features/flight/constant';
import { fetFlightBookings } from '~/features/flight/flightSlice';
import InOutBound from '~/features/flight/online/component/InOutBound';
import LastSale from '~/features/flight/online/component/LastSale';
import '~/features/flight/online/FlightOnline.scss';
import { BookingsOnlineType, PagingOnline } from '~/features/flight/online/Modal';
import UnholdCreditModal from '~/features/payment_support/credit_hold_transaction/components/UnholdCreditModal';
import { AirlinesType, AirportType } from '~/features/systems/systemSlice';
import { some } from '~/utils/constants/constant';
import { DATE_TIME_FORMAT } from '~/utils/constants/moment';

import {
  formatMoney,
  getBookStatusFlight,
  isEmpty,
  removeFieldEmptyFilter,
} from '~/utils/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';
import HoldingLimitationModal from '../../components/modal/spTools/HoldingLimitationModal';

const ContentData = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const bookingsOnline: BookingsOnlineType[] = useAppSelector(
    (state) => state.flightReducer.bookingsOnline,
  );
  const isLoading: boolean = useAppSelector((state) => state.flightReducer.isLoading);
  const pagingOnline: PagingOnline = useAppSelector((state) => state.flightReducer.pagingOnline);
  const filterOnline: some = useAppSelector((state) => state.flightReducer.filterOnline);
  const totalBookingsOnline: number = useAppSelector(
    (state) => state.flightReducer.totalBookingsOnline,
  );
  // const [dataTable, setDataTable] = useState<any[]>(bookingsOnline);

  const onChangePagination = (page: number, size: number) => {
    handleChangeRoute(filterOnline, { page: page - 1, size: size });
    dispatch(
      fetFlightBookings({
        formData: filterOnline,
        isFilter: false,
        paging: { page: page - 1, size: size },
      }),
    );
  };

  const handleChangeRoute = (formData: object, paging: some = {}) => {
    const searchParams = removeFieldEmptyFilter(formData);
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        ...searchParams,
        ...paging,
      }).toString(),
    });
  };

  const handelRefresh = () => {
    dispatch(
      fetFlightBookings({
        formData: filterOnline,
        isFilter: false,
        paging: pagingOnline,
      }),
    );
  };

  const columns: ColumnsType<BookingsOnlineType> = [
    {
      title: 'Booking ID',
      key: 'orderCode',
      width: 80,
      align: 'center',
      render: (_, record) => {
        return (
          <div
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              window.open(`${location.pathname}/${record?.booking?.bookingId}`, '_blank');
            }}
            style={{ padding: '12px auto' }}
          >
            {record?.booking?.bookingId}
          </div>
        );
      },
    },
    {
      title: 'Hành trình',
      key: 'in-out-bound',
      width: 140,
      render: (_, record) => {
        return <InOutBound record={record} />;
      },
    },
    {
      title: 'Khởi hành',
      key: 'start-out-bound',
      width: 140,
      render: (_, record) => {
        return <>{`${record?.tickets[0]?.departureDate} ${record?.tickets[0]?.departureTime}`}</>;
      },
    },
    {
      title: 'Ngày đặt',
      key: 'bookedDate',
      width: 140,
      render: (_, record) => {
        return <>{`${moment(record?.booking?.createdTime).format(DATE_TIME_FORMAT)}`}</>;
      },
    },
    {
      title: 'Người đăt',
      key: 'bookedUser',
      align: 'center',
      render: (_, record) => {
        return <>{record.user?.fullName}</>;
      },
      width: 120,
    },
    {
      title: 'Tổng tiền',
      key: 'totalSellingPrice',
      align: 'right',
      render: (_, record) => {
        return <>{`${formatMoney(record?.payment?.totalAmount)}`}</>;
      },
      width: 120,
      className: 'column-total-price',
    },
    {
      title: 'Trạng thái đặt vé',
      key: 'bookStatus',
      render: (_, record) => {
        const status = getBookStatusFlight(record?.booking?.bookingStatus);
        return <Tag color={status.color}>{`${status?.title}`}</Tag>;
      },
      width: 140,
    },
  ];

  return (
    <>
      <Row className='title-total-items' justify='space-between'>
        <Col>
          <Space>
            <span>Tìm thấy tất cả {totalBookingsOnline} đơn hàng</span>
            <div className='icon-refresh' onClick={handelRefresh}>
              <IconRefreshGrayrice />
            </div>
          </Space>
        </Col>
      </Row>
      <Table
        rowKey={(record) => record.booking.bookingId}
        columns={columns}
        dataSource={bookingsOnline}
        loading={isLoading}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              window.open(`${location.pathname}/${record?.booking.bookingId}`, '_self');
            },
          };
        }}
      />
      {!isEmpty(bookingsOnline) &&
        !(pagingOnline.page === 1 && bookingsOnline.length < pagingOnline.size) && (
          <PaginationTable
            page={pagingOnline.page}
            size={pagingOnline.size}
            onChange={onChangePagination}
            totalElements={totalBookingsOnline}
          />
        )}
      {/* <SmsEmailModal modal={modal} setModal={setModal} /> */}
      {/* <HoldingLimitationModal modal={modal} setModal={setModal} /> */}
    </>
  );
};
export default ContentData;
