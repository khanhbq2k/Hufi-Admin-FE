import '~/features/flight/online/FlightOnline.scss';
import { useAppSelector } from '~/utils/hook/redux';
import { AirlinesType } from '~/features/systems/systemSlice';
import '~/features/flight/online/FlightOnline.scss';
import { isEmpty } from '~/utils/helpers/helpers';
import { some } from '~/utils/constants/constant';
import { FC } from 'react';

interface InOutBoundType {
  record: some;
}
const InOutBound: FC<InOutBoundType> = (props: some) => {
  const { record } = props;
  const airlines: AirlinesType[] = useAppSelector((state) => state.systemReducer.airlines);

  const getIcon = (code: string) => {
    const item = airlines.find((el) => el?.code === code);
    return item?.logoUrl || '';
  };

  const getLocationName = () => {
    let result = `${record?.tickets[0]?.departureAirport} -> ${record?.tickets[0]?.arrivalAirport}`;
    if (record?.tickets[1]) {
      result += ` -> ${record?.tickets[1]?.arrivalAirport}`;
    }
    return result;
  };

  return (
    <div className='in-out-container'>
      <div className='list-icon-airline'>
        {!isEmpty(getIcon(record?.tickets[0]?.marketingAirline)) && (
          <img
            src={getIcon(record?.tickets[0]?.marketingAirline)}
            alt=''
            className='icon-airline'
          />
        )}
        {record.tickets[1] && !isEmpty(getIcon(record?.tickets[1]?.marketingAirline)) && (
          <img
            src={getIcon(record?.tickets[1]?.marketingAirline)}
            alt=''
            className='icon-airline icon-airline-right'
          />
        )}
      </div>
      <span className='name-location'>{getLocationName()}</span>
    </div>
  );
};
export default InOutBound;
