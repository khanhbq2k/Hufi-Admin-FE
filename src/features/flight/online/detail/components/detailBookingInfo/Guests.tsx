import { Col, Row, Space } from 'antd';
import { useState } from 'react';
import { IconInfomation } from '~/assets';
import { MODAL_KEY_MENU } from '~/features/flight/constant';
import { isEmpty } from '~/utils/helpers/helpers';
import { useAppSelector } from '~/utils/hook/redux';
import InfoGuestsModalNew from './InfoGuestsModalNew';

interface visibleInterface {
  type?: any;
  data?: any;
}

const Guests = () => {
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);
  const [visibleModal, setVisibleModal] = useState<visibleInterface>({
    type: null,
    data: null,
  });

  return (
    <div className='guests'>
      <Space
        align='center'
        onClick={() =>
          setVisibleModal({
            type: MODAL_KEY_MENU.UPLOAD_DETAIL_GUESTS,
          })
        }
      >
        <h3>Hành khách: </h3>
        <IconInfomation style={{ cursor: 'pointer' }} />
      </Space>
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
                  <td style={{ paddingRight: passenger?.eticketNumber ? '15px' : '0px' }}>
                    {passenger?.eticketNumber && (
                      <span className='border-eticket-no'>{passenger?.eticketNumber}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <InfoGuestsModalNew
        visibleModal={visibleModal.type == MODAL_KEY_MENU.UPLOAD_DETAIL_GUESTS}
        setVisibleModal={setVisibleModal}
      />
    </div>
  );
};
export default Guests;
