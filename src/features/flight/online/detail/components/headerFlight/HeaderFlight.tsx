import { useIntl } from 'react-intl';
import BreadcrumbDetailFlight from '~/features/flight/online/detail/components/headerFlight/BreadcrumbDetailFlight';
import { some } from '~/utils/constants/constant';
import { useAppSelector } from '~/utils/hook/redux';

const HeaderFlight = () => {
  const intl = useIntl();
  const booking = useAppSelector((state: some) => state?.flightReducer.flightOnlineDetail);

  return (
    <div>
      <BreadcrumbDetailFlight />
      <div className='wrapper-header-title'>
        <div className='bookedInfo'>
          <h2 style={{ marginBottom: 5 }}>
            {intl.formatMessage({ id: 'IDS_TEXT_ORDER_DETAILS' })}: {booking?.booking?.bookingId}
          </h2>
          <div className='text-grey'>
            {booking?.booking?.bookingId && <span> {`Order: ${booking?.booking?.bookingId}`}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderFlight;
