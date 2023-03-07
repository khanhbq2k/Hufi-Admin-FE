import { Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import { useState } from 'react';
import { IconArrow } from '~/assets';
import { FORMAT_DAYS, TYPE_TICKET_INFO } from '~/features/flight/constant';
import FromUpdateCode from '~/features/flight/online/detail/components/detailBookingInfo/form/FromUpdateCode';
import { AirlinesType } from '~/features/systems/systemSlice';
import {
  C_DATE_FORMAT,
  DATE_FORMAT_BACK_END,
  DATE_FORMAT_DAY,
  DATE_FORMAT_FRONT_END,
} from '~/utils/constants/moment';
import { useAppSelector } from '~/utils/hook/redux';
import FormInboundCode from './form/FormInboundCode';
import FormOutboundCode from './form/FormOutboundCode';
import ModalUpdateFlightPNRCode from './modal/ModalUpdateFlightPNRCode';

const getFormatDay = (date: string) => FORMAT_DAYS[new Date(date).getDay()];
const getExtraTime = (arrivalDate: string, departureDate: string) => {
  const extraTime =
    Number(moment(arrivalDate, DATE_FORMAT_BACK_END)?.format('DD')) -
    Number(moment(departureDate, DATE_FORMAT_BACK_END)?.format(DATE_FORMAT_DAY));
  return extraTime !== 0 ? `(+${extraTime}d)` : null;
};

const BookingInfo = () => {
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);
  const airlines: AirlinesType[] = useAppSelector((state) => state.systemReducer.airlines);

  const [updateFlightPNRCode, setUpdateFlightPNRCode] = useState<string>('');

  const getIcon = (airlineCode: string) => {
    const item = airlines.find((el) => el?.code === airlineCode);
    return item?.logoUrl || '';
  };

  return (
    <div className='booking-info'>
      <Row gutter={12} className='contact-info-box'>
        <Col span={24}>
          {booking?.tickets[0] && <FormOutboundCode />}
          <div style={{ marginLeft: 32, marginBottom: 16 }}>
            <Row className='info-airline'>
              <Col className='air-box' style={{ width: 110 }}>
                <Tooltip title={booking?.tickets[0]?.marketingAirline}>
                  <img
                    src={getIcon(booking?.tickets[0]?.marketingAirline)}
                    className='icon-airline'
                    alt=''
                  />
                </Tooltip>
                <b>{booking?.tickets[0]?.departureAirport} </b> -{' '}
                <b>{booking?.tickets[0]?.arrivalAirport} </b>
              </Col>
              <Col className='air-box'>
                <b style={{ minWidth: 50 }} className='text-blue'>
                  {booking?.tickets[0]?.flightCode}
                </b>
                <span className='text-airline-code'>{booking?.tickets[0]?.ticketClass}</span>
                <span>
                  {`${getFormatDay(
                    moment(booking?.tickets[0]?.departureDate, DATE_FORMAT_BACK_END).format(
                      C_DATE_FORMAT,
                    ),
                  )}, ${moment(booking?.tickets[0]?.departureDate, DATE_FORMAT_FRONT_END).format(
                    DATE_FORMAT_FRONT_END,
                  )}`}
                </span>
                <span>{booking?.tickets[0]?.departureTime}</span> <IconArrow />
                <span>{booking?.tickets[0]?.arrivalTime}</span>
                <span className='text-success'>
                  {getExtraTime(
                    booking?.tickets[0]?.arrivalDate,
                    booking?.tickets[0]?.departureDate,
                  )}{' '}
                </span>
              </Col>
              <Col className='air-box no-gap'>
                <FromUpdateCode
                  type={TYPE_TICKET_INFO?.DEPARTURE}
                  flightPNR={booking?.tickets[0]?.reservationCode}
                />
              </Col>
            </Row>
          </div>
          {booking?.tickets[1] && <FormInboundCode />}
          {booking?.tickets[1] && (
            <div style={{ marginLeft: 32, marginBottom: 16 }}>
              <Row className='info-airline'>
                <Col className='air-box' style={{ width: 110 }}>
                  <img
                    src={getIcon(booking?.tickets[1]?.marketingAirline)}
                    alt=''
                    className='icon-airline'
                  />
                  <b>{booking?.tickets[1]?.departureAirport} </b> -{' '}
                  <b>{booking?.tickets[1]?.arrivalAirport} </b>
                </Col>
                <Col className='air-box'>
                  <b style={{ minWidth: 50 }} className='text-blue'>
                    {booking?.tickets[1]?.flightCode}
                  </b>
                  <span className='text-airline-code'>{booking?.tickets[1]?.ticketClass}</span>
                  <span>
                    {`${getFormatDay(
                      moment(booking?.tickets[1]?.departureDate, DATE_FORMAT_BACK_END).format(
                        C_DATE_FORMAT,
                      ),
                    )}, ${moment(booking?.tickets[1]?.departureDate, DATE_FORMAT_FRONT_END).format(
                      DATE_FORMAT_FRONT_END,
                    )}`}
                  </span>
                  <span>{booking?.tickets[1]?.departureTime}</span> <IconArrow />
                  <span>{booking?.tickets[1]?.arrivalTime}</span>
                  <span className='text-grey'>
                    {getExtraTime(
                      booking?.tickets[1]?.arrivalDate,
                      booking?.tickets[1]?.departureDate,
                    )}
                  </span>
                </Col>
                <Col className='air-box'>
                  <FromUpdateCode
                    type={TYPE_TICKET_INFO?.RETURN}
                    flightPNR={booking?.tickets[1]?.reservationCode}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
      <ModalUpdateFlightPNRCode modal={updateFlightPNRCode} setModal={setUpdateFlightPNRCode} />
    </div>
  );
};
export default BookingInfo;
