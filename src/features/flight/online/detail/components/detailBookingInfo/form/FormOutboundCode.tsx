import { Button, Col, Divider, Form, Input, message, Popconfirm, Row, Select, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { updateFlightBookingPnr } from '~/apis/flight';
import { IconEdit } from '~/assets';
import { fetFlightBookingsDetail } from '~/features/flight/flightSlice';
import { some } from '~/utils/constants/constant';
import { formatMoney, PNR_STATUS } from '~/utils/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';

const { Option } = Select;
const FormOutboundCode: any = () => {
  const dispatch = useAppDispatch();
  const [editForm, setEditForm] = useState<boolean>(false);

  const airlines = useAppSelector((state) => state.systemReducer.airlines);
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);

  const [form] = Form.useForm();
  const outboundPnrStatus = PNR_STATUS.find((el) => el.stt == booking?.booking?.bookingStatus);

  const updateFlightBookingCode = async (queryParams: any) => {
    try {
      const { data } = await updateFlightBookingPnr(booking?.booking?.bookingId, queryParams);
      if (data.code === 200) {
        message.success(' Cập nhật mã vé chiều đi thành công!');
        setEditForm(false);
        dispatch(fetFlightBookingsDetail({ id: booking?.booking?.bookingId }));
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      outboundAirline: booking?.tickets[0].marketingAirline,
      outboundCode: booking?.tickets[0].reservationCode,
      outboundStatus: booking?.booking.bookingStatus,
    });
  }, [booking, editForm]);

  return (
    <Row className='info-airline'>
      <Col className='air-box'>
        <span className='text-name'>Chiều đi</span>
      </Col>
      <Col className='air-box'>
        {!editForm ? (
          <>
            <span>
              <b>{booking?.tickets[0].marketingAirline}</b>
            </span>
            <Tag color='success'>{booking?.tickets[0].reservationCode || 'Chưa có'}</Tag>
            <span style={{ color: outboundPnrStatus?.color }}>{outboundPnrStatus?.title}</span>
            {<IconEdit className='pointer' onClick={() => setEditForm(true)} />}
          </>
        ) : (
          <Form form={form} className='form-code'>
            <Form.Item name='outboundAirline'>
              <Select size='small' style={{ width: 200 }}>
                {airlines.map((value: some) => {
                  return (
                    <Option key={value.code} value={value.code}>
                      {`${value.code} - ${value.name}`}{' '}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name='outboundCode'>
              <Input size='small' />
            </Form.Item>
            <Form.Item name='outboundStatus'>
              <Select size='small' style={{ width: 120 }}>
                {PNR_STATUS?.map((value: some) => {
                  return (
                    <Option key={value.stt} disabled={value?.disable} value={value.stt}>
                      {value.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Popconfirm
              placement='top'
              title='Bạn có chắc chắn muốn sửa mã đặt vé?'
              onConfirm={() => {
                const { outboundStatus, outboundCode, outboundAirline } =
                  form?.getFieldsValue(true);
                updateFlightBookingCode({
                  ticketId: booking?.tickets[0]?.id,
                  pnr: outboundCode,
                  status: outboundStatus,
                  airline: outboundAirline,
                });
              }}
              okText='Ok'
              cancelText='Hủy'
            >
              <Button htmlType='submit' type='primary'>
                Lưu
              </Button>
            </Popconfirm>
            <Button onClick={() => setEditForm(false)}>Hủy</Button>
          </Form>
        )}
      </Col>
      <Col style={{ flex: 1 }}>
        <Divider />
      </Col>
      <Col>
        <span>{`Giá fare ${formatMoney(booking?.tickets[0]?.farePrice)}`} </span>
      </Col>
    </Row>
  );
};

export default FormOutboundCode;
