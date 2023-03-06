import { useIntl } from 'react-intl';
import { Form, Row, Col, Input } from 'antd';

import '~/features/flight/online/FlightOnline.scss';
import { listFilterDefault } from '~/utils/constants/dataOptions';
import { useAppDispatch } from '~/utils/hook/redux';
import {
  confirmStatusList,
  some,
  TIME_OUT_QUERY_API_FLIGHT_SEARCH,
} from '~/utils/constants/constant';
import { useEffect } from 'react';
import { fetFlightBookings } from '~/features/flight/flightSlice';
import { isEmpty, removeFieldEmptyFilter } from '~/utils/helpers/helpers';
import { useSearchParams, useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import PopoverRadio from '~/components/popover/PopoverRadio';

let timeoutSearch: any = null;

const Filter = () => {
  const intl = useIntl();
  let [searchParams] = useSearchParams();
  let location = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFetDataChangeField = (formData: some = {}) => {
    handleChangeRoute(formData);
    dispatch(fetFlightBookings({ formData: formData, isFilter: true }));
  };

  const handleRemoveField = (formData: some = {}) => {
    form.setFieldsValue({ confirmStatus: undefined });
    handleChangeRoute(formData);
    dispatch(fetFlightBookings({ formData: formData, isFilter: true }));
  };

  const handleSearch = (allValues: object) => {
    handleFetData(allValues);
  };

  const handleChangeRoute = (formData: object) => {
    const searchParams = removeFieldEmptyFilter(formData);
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        ...searchParams,
      }).toString(),
    });
  };

  const handleFetData = (formData: some = {}) => {
    clearTimeout(timeoutSearch);
    timeoutSearch = setTimeout(() => {
      handleChangeRoute(formData);
      console.log(formData);
      dispatch(fetFlightBookings({ formData: formData, isFilter: true }));
    }, TIME_OUT_QUERY_API_FLIGHT_SEARCH);
  };

  const handleSetInitFilter = () => {
    if (!isEmpty(location.search)) {
      let formTemp = {};
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        if (param === 'page' || param === 'pageSize') {
        } else {
          formTemp = {
            ...formTemp,
            [param]: value,
          };
        }
      }
      form.setFieldsValue(formTemp);
    }
  };

  useEffect(() => {
    handleSetInitFilter();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutSearch);
    };
  }, []);

  return (
    <div className='filter-container'>
      <Form
        form={form}
        scrollToFirstError
        colon={false}
        hideRequiredMark
        className='filter-form-flight'
        onValuesChange={handleSearch}
      >
        <Row gutter={12} className='left-filter'>
          {listFilterDefault.map((el) => (
            <Col span={8} key={el.key}>
              <Form.Item name={el.key} rules={el.rules || undefined}>
                <Input
                  onPressEnter={(ele) => {
                    if (el.key == 'dealId' && ele?.target?.value) {
                      window.open(`${location.pathname}/${ele?.target?.value}`, '_blank');
                    }
                  }}
                  allowClear
                  placeholder={intl.formatMessage({ id: el.name })}
                />
              </Form.Item>
            </Col>
          ))}
          <Col span={4}>
            <Form.Item name='confirmStatus'>
              <PopoverRadio
                title='IDS_TEXT_CONFIRM_STATUS'
                handleRemoveField={handleRemoveField}
                defaultVisible={false}
                name='confirmStatus'
                options={confirmStatusList}
                handleFetData={handleFetDataChangeField}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Filter;
