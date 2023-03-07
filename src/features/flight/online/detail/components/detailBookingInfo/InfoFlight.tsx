import { Col } from 'antd';
import BookingInfo from './BookingInfo';
import ContactInfo from './ContactInfo';
import Guests from './Guests';

const InfoFlight = () => {
  return (
    <div>
      <div className='info-flight'>
        <ContactInfo />
        <Col className='booking-hub'>
          <BookingInfo />
        </Col>
        <Guests />
      </div>
    </div>
  );
};
export default InfoFlight;
