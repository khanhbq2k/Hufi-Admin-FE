import { Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import { IconArrow } from '~/assets';
import { FORMAT_DAYS } from '~/features/flight/constant';
import { AirlinesType } from '~/features/systems/systemSlice';
import { TICKET_CLASS_CODE } from '~/utils/constants/dataOptions';
import {
  C_DATE_FORMAT,
  DATE_FORMAT_BACK_END,
  DATE_FORMAT_DAY,
  DATE_FORMAT_FRONT_END,
} from '~/utils/constants/moment';
import { useAppSelector } from '~/utils/hook/redux';
import FormInboundCode from './form/FormInboundCode';
import FormOutboundCode from './form/FormOutboundCode';

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
                <span className='text-airline-code'>
                  {
                    TICKET_CLASS_CODE.find((el) => el?.code === booking?.tickets[0]?.ticketClass)
                      ?.v_name
                  }
                </span>
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
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default BookingInfo;
