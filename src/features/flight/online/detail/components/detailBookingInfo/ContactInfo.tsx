import { Col, Divider, Modal, Row } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { IconCallDark, IconCloseOutline, IconEdit, IconEmail } from '~/assets';
import EditContact from '~/features/flight/online/detail/components/modalDetailFlight/EditContact';
import { some } from '~/utils/constants/constant';
import { DATE_TIME_FORMAT } from '~/utils/constants/moment';
import {
  formatMoney,
  getBookStatusFlight,
  getPaymentStatusFlight,
  getStatusFlight,
  isEmpty,
} from '~/utils/helpers/helpers';
import { useAppSelector } from '~/utils/hook/redux';

const ContactInfo = () => {
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);

  const [modal, setModal] = useState<some>({
    open: false,
    title: null,
  });

  const paymentData = [
    {
      name: 'Trạng thái đơn hàng',
      value: () => {
        return (
          <span
            className='border-status'
            style={{ backgroundColor: status?.backGround, color: status?.color }}
          >
            {status?.detailTitle}
          </span>
        );
      },
    },
    {
      name: 'Trạng thái đặt vé',
      value: () => {
        return (
          <span
            className='border-status'
            style={{ backgroundColor: bookStatus?.backGround, color: bookStatus?.color }}
          >
            {bookStatus?.detailTitle}
          </span>
        );
      },
    },
    {
      name: 'Trạng thái thanh toán ',
      value: () => {
        return (
          <span
            className='border-status'
            style={{ backgroundColor: paymentStatus?.backGround, color: paymentStatus?.color }}
          >
            {paymentStatus?.detailTitle}
          </span>
        );
      },
    },
    {
      name: 'Đơn vị tiền tệ',
      value: () => {
        return <span>VNĐ</span>;
      },
    },
    {
      name: 'Ngày thanh toán',
      value: () => {
        return (
          <span>{moment(booking?.transaction?.transactionDate).format(DATE_TIME_FORMAT)} </span>
        );
      },
      hide: !booking?.transaction?.transactionDate,
    },
  ];
  const priceBox = [
    {
      name: 'Ngày đặt',
      value: () => {
        return <span>{moment(booking.booking?.createdTime).format(DATE_TIME_FORMAT)} </span>;
      },
      hide: !booking.booking?.createdTime,
    },
    {
      name: 'Số chỗ',
      value: () => {
        return (
          <span>
            {booking?.passengers.filter((p: any) => p.ageCategory === 'ADT').length} người lớn
            {booking?.passengers.filter((p: any) => p.ageCategory === 'CHD').length > 0 && (
              <span>
                , {booking?.passengers.filter((p: any) => p.ageCategory === 'CHD').length} trẻ em
              </span>
            )}
            {booking?.passengers.filter((p: any) => p.ageCategory === 'INF').length > 0 && (
              <span>
                , {booking?.passengers.filter((p: any) => p.ageCategory === 'INF').length} em bé
              </span>
            )}
          </span>
        );
      },
      hide: !booking.booking?.createdTime,
      isDivider: true,
    },
    {
      name: 'Giá trả hãng',
      value: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              <span style={{ fontWeight: 500 }}>
                {`${formatMoney(
                  (booking?.tickets[0]?.totalFarePrice || 0) +
                    (booking?.tickets[1]?.totalFarePrice || 0),
                )} `}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Tổng tiền',
      value: () => {
        return (
          <span className='text-blue' style={{ fontWeight: 'bold' }}>
            {formatMoney(booking?.payment?.totalAmount)}
          </span>
        );
      },
    },
    {
      name: 'Tiền thanh toán',
      value: () => {
        return (
          <span className='text-danger' style={{ fontWeight: 'bold' }}>
            {booking?.payment?.paymentStatus === 'success'
              ? formatMoney(booking?.payment?.totalAmount)
              : 0}
          </span>
        );
      },
    },
  ];
  const paymentStatus = getPaymentStatusFlight(booking?.payment?.paymentStatus);
  const bookStatus = getBookStatusFlight(booking?.booking.bookingStatus);
  const status = getStatusFlight(booking?.booking.bookingStatus);

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: !modal?.open,
    });
  };

  return (
    <div className='contact-info'>
      <Row gutter={20} className='contact-info-box'>
        <Col xxl={8} xl={12}>
          {!isEmpty(booking?.user) && (
            <>
              <div className='main-contact-info'>
                <span className='text-bold'>Người đặt:</span>
                <span>{`${booking?.user?.fullName} (${booking?.user?.id})`}</span>
              </div>
              <div className='main-contact-info' style={{ gap: 8, padding: 8 }}>
                <div className='gap-4-center'>
                  <IconCallDark />
                  {booking?.user?.phone}
                </div>
                <div className='gap-4-center'>
                  <IconEmail className='fix-width' />
                  {booking?.user?.email}
                </div>
              </div>
            </>
          )}
          <div className='main-contact-info'>
            <span className='text-bold'>Người liên hệ:</span>
            <span>{`${booking?.contact?.name} `}</span>
            <IconEdit
              onClick={() => {
                setModal({
                  open: true,
                  title: 'Sửa thông tin liên hệ',
                });
              }}
              style={{ cursor: 'pointer', marginLeft: 4 }}
            />
          </div>
          <div className='main-contact-info' style={{ gap: 8, padding: 8 }}>
            <div className='gap-4-center'>
              <IconCallDark /> {booking?.contact?.phone}
            </div>
            <div className='gap-4-center'>
              <IconEmail className='fix-width' />
              {booking?.contact?.email}
            </div>
          </div>
        </Col>
        <Col xxl={8} xl={12}>
          {paymentData?.map(
            (el: any, indx: number) =>
              !el.hide && (
                <Row key={indx} className='payment-data-ct-content'>
                  <span className='name'>{el.name}:</span>
                  <el.value />
                </Row>
              ),
          )}
        </Col>
        <Col xxl={8} xl={12} style={{ marginTop: 20 }}>
          <div className='booker-box'>
            {priceBox.map(
              (el: any, indx: number) =>
                !el.hide && (
                  <Row key={indx} className={`${el.class} booker-box-info`}>
                    <span className='name'>{el.name}:</span>
                    <el.value />
                    {el.isDivider && <Divider style={{ margin: '0px' }} />}
                  </Row>
                ),
            )}
          </div>
        </Col>
      </Row>
      <Modal
        className='wrapper-modal'
        title={<div className='title-modal'>{modal?.title}</div>}
        visible={modal?.open}
        footer={false}
        closeIcon={<IconCloseOutline />}
        onCancel={handleCloseModal}
        width={undefined}
      >
        <EditContact handleClose={handleCloseModal} booking={booking} />;
      </Modal>
    </div>
  );
};
export default ContactInfo;
