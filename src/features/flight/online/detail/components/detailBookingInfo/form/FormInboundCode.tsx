import { Button, Col, Divider, Form, Input, message, Popconfirm, Row, Select, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { updateFlightBookingPnr } from '~/apis/flight';
import { IconEdit } from '~/assets';
import { fetFlightBookingsDetail } from '~/features/flight/flightSlice';
import { some } from '~/utils/constants/constant';
import { formatMoney, PNR_STATUS } from '~/utils/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';

const { Option } = Select;

const FormInboundCode: any = () => {
  const dispatch = useAppDispatch();
  const [editForm, setEditForm] = useState<boolean>(false);

  const airlines = useAppSelector((state) => state.systemReducer.airlines);
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);

  const [form] = Form.useForm();
  const inboundPnrStatus = PNR_STATUS.find((el) => el.stt == booking?.booking?.bookingStatus);

  const updateFlightBookingCode = async (queryParams: any) => {
    try {
      const { data } = await updateFlightBookingPnr(booking?.booking?.bookingId, queryParams);
      if (data.code === 200) {
        message.success(' Cập nhật mã vé chiều về thành công!');
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
      inboundCode: booking?.tickets[1]?.reservationCode,
      inboundStatus: booking?.booking.bookingStatus,
      inboundAirline: booking?.tickets[1]?.marketingAirline,
    });
  }, [booking]);

  return (
    <Row className='info-airline'>
      <Col className='air-box'>
        <span className='text-name'>Chiều về</span>
      </Col>
      <Col className='air-box'>
        {!editForm ? (
          <>
            <span>
              <b>{booking?.tickets[1].marketingAirline}</b>
            </span>
            <Tag color='success'>{booking?.tickets[1]?.reservationCode || 'Chưa có'}</Tag>
            <span style={{ color: inboundPnrStatus?.color }}>{inboundPnrStatus?.title}</span>
            <IconEdit className='pointer' onClick={() => setEditForm(true)} />
          </>
        ) : (
          <Form form={form} className='form-code'>
            <Form.Item name='inboundAirline'>
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
            <Form.Item name='inboundCode'>
              <Input size='small' value='WP3D23' />
            </Form.Item>
            <Form.Item name='inboundStatus'>
              <Select size='small' style={{ width: 120 }} onChange={() => {}}>
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
                const { inboundStatus, inboundCode, inboundAirline } = form?.getFieldsValue(true);
                updateFlightBookingCode({
                  ticketId: booking?.tickets[1]?.id,
                  pnr: inboundCode,
                  status: inboundStatus,
                  airline: inboundAirline,
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
        <span>{`Giá fare ${formatMoney(booking?.tickets[1]?.farePrice)}`} </span>
      </Col>
    </Row>
  );
};

export default FormInboundCode;
