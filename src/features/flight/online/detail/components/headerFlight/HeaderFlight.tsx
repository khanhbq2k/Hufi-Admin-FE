import { useIntl } from 'react-intl';
import BreadcrumbDetailFlight from '~/features/flight/online/detail/components/headerFlight/BreadcrumbDetailFlight';
import { some } from '~/utils/constants/constant';
import { useAppSelector } from '~/utils/hook/redux';

const HeaderFlight = () => {
  const intl = useIntl();
  const { flightOnlineDetail } = useAppSelector((state: some) => state?.flightReducer);

  return (
    <div>
      <BreadcrumbDetailFlight />
      <div className='wrapper-header-title'>
        <div className='bookedInfo'>
          <h2 style={{ marginBottom: 5 }}>
            {intl.formatMessage({ id: 'IDS_TEXT_ORDER_DETAILS' })}: {flightOnlineDetail?.orderCode}
          </h2>
          <div className='text-grey'>
            {flightOnlineDetail?.orderId && <span> {`Order: ${flightOnlineDetail?.orderId}`}</span>}
            {flightOnlineDetail?.parentId && (
              <span>
                Tách từ{' '}
                <a
                  className='text-blue'
                  target={'_blank'}
                  href={`/sale/flight/online/${flightOnlineDetail?.parentId}`}
                >
                  {flightOnlineDetail?.parentId}
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderFlight;
