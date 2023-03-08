import { Col, Row } from 'antd';
import { isEmpty } from '~/utils/helpers/helpers';
import { useAppSelector } from '~/utils/hook/redux';

const Guests = () => {
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);

  return (
    <div className='guests'>
      <h3>Hành khách: </h3>
      <Row className='contact-info-box'>
        <Col span={24}>
          <table className='guest-table'>
            <tbody>
              <tr>
                <th></th>
                <th colSpan={3}>Họ và tên</th>
                <th colSpan={1}>Chiều đi</th>
                <th colSpan={1}>{!isEmpty(booking.tickets[1]) && 'Chiều về'} </th>
                <td style={{ width: '100%' }}></td>
              </tr>
              {booking?.passengers?.map((passenger: any, idx: number) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td style={{ minWidth: 200 }}>
                    <b>{passenger?.fullName?.toUpperCase()} </b>
                    <br />
                    {passenger?.ageCategory == 'INF' && (
                      <span className='text-grey'>
                        Đi cùng {booking?.passengers[0].fullName?.toUpperCase()}{' '}
                      </span>
                    )}
                  </td>
                  <td style={{ minWidth: 100 }}>
                    {passenger?.ageCategory == 'ADT'
                      ? 'Người lớn'
                      : passenger?.ageCategory == 'CHD'
                      ? 'Trẻ em'
                      : 'Em bé'}{' '}
                  </td>
                  <td style={{ minWidth: 80 }}>{passenger?.gender === 'F' ? 'Nữ' : 'Nam'} </td>
                  <td style={{ paddingRight: passenger?.eticketNumber ? '15px' : '0px' }}>
                    {passenger?.eticketNumber && (
                      <span className='border-eticket-no'>{passenger?.eticketNumber}</span>
                    )}
                  </td>
                  {!isEmpty(booking.tickets[1]) && (
                    <td style={{ paddingRight: passenger?.eticketNumber ? '15px' : '0px' }}>
                      {passenger?.eticketNumber && (
                        <span className='border-eticket-no'>{passenger?.eticketNumber}</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};
export default Guests;
