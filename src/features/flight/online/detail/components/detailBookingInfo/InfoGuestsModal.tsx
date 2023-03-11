import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { updateFlightGuestInfo } from '~/apis/flight';
import { IconCalendar, IconChevronDown, IconCloseNoneCycle, IconEditBlue } from '~/assets';
import { fetFlightBookingsDetail } from '~/features/flight/flightSlice';
import '~/features/flight/online/detail/FlightDetail.scss';
import { some } from '~/utils/constants/constant';
import { LIST_GENDER } from '~/utils/constants/dataOptions';
import { isEmpty } from '~/utils/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';

let needReload = false;

const InfoGuestsModal = (props: any) => {
  const { visibleModal, setVisibleModal } = props;
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);
  const [data, setData] = useState(booking?.passengers || []);

  const handleCloseModal = () => {
    if (needReload) {
      dispatch(fetFlightBookingsDetail({ id: booking?.booking?.bookingId }));
    }
    setVisibleModal(false);
  };

  useEffect(() => {
    if (visibleModal) {
      needReload = false;
      setData(booking?.passengers);
    }
  }, [visibleModal]);

  return (
    <Modal
      className='model-info-guest-border modal-info-guests'
      visible={visibleModal}
      onCancel={handleCloseModal}
      footer={false}
      closeIcon={<IconCloseNoneCycle />}
      centered
      width={1000}
    >
      <div className='title'>Thông tin hành khách</div>
      <div className='content'>
        {data.map((el: some, idx: number) => (
          <GuestDetail key={el.id} idx={idx} item={el} />
        ))}
      </div>
    </Modal>
  );
};
export default InfoGuestsModal;

const GuestDetail = (props: some) => {
  const { item, idx } = props;
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const booking = useAppSelector((state) => state.flightReducer.flightOnlineDetail);
  const countries = useAppSelector((state) => state.systemReducer.countries);

  const onFinish = async (values: any) => {
    confirm({
      title: 'Bạn có chắc chắn muốn lưu lại thông tin đã sửa?',
      content: 'Vui lòng xác nhận kỹ thông tin',
      onOk() {
        handleSubmitForm(values);
      },
      onCancel() {},
    });
  };

  const handleSubmitForm = async (values: any) => {
    try {
      console.log(values);
      const itemUpdate: some = {
        ...item,
        ...values,
        passengerId: item.id,
        dob: !isEmpty(values.dob) ? values.dob.format('DD-MM-YYYY') : null,
        passportExpiry: !isEmpty(values.passportExpiry)
          ? values.passportExpiry.format('DD-MM-YYYY')
          : null,
        eticketNumber: values.eticketNumber,
        nationalityCode: values.nationalityCode,
        passportCountryCode: values.passportCountryCode,
        firstName: values.firstName ? values.firstName : item.firstName,
        lastName: values.lastName ? values.lastName : item.lastName,
      };

      const { data } = await updateFlightGuestInfo(booking?.booking?.bookingId, [itemUpdate]);
      if (data.code === 200) {
        message.success('Cập nhật thông tin thành công!');
        form.setFieldsValue({
          isEdit: false,
          fullName: `${itemUpdate.lastName} ${itemUpdate.firstName}`,
        });
        needReload = true;
      } else {
        message.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      form={form}
      scrollToFirstError
      colon={false}
      className='form-add-invoice form-edit-guest'
      initialValues={{
        isEdit: false,
        lastName: item.lastName,
        firstName: item.firstName,
        fullName: item.lastName + ' ' + item.firstName,
        passport: item.passport,
        gender: item.gender,
        passportExpiry: !isEmpty(item.passportExpiry)
          ? moment(item.passportExpiry, 'DD-MM-YYYY')
          : null,
        dob: !isEmpty(item.dob) ? moment(item.dob, 'DD-MM-YYYY') : null,
        eticketNumber: item.eticketNumber,
        passportCountryCode: item.passportCountryCode,
        nationalityCode: item.nationalityCode,
      }}
      requiredMark={false}
      onFinish={onFinish}
      onValuesChange={(changedValues) => {}}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <div className='guest-item'>
        <div className='left-content'>{idx + 1}</div>
        <div className='right-content'>
          <Form.Item
            shouldUpdate={(prevValues, curValues) => prevValues.isEdit !== curValues.isEdit}
            style={{ marginBottom: 0 }}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
          >
            {() => {
              return (
                <>
                  <div className='header-content'>
                    <span style={{ fontWeight: 500 }}>{`${form.getFieldValue('fullName')}`}</span>
                    <span className='sub-text'>{`${
                      item.ageCategory == 'ADT'
                        ? ' - Người lớn'
                        : item.ageCategory == 'CHD'
                        ? ' - Trẻ em'
                        : ' - Em bé'
                    }`}</span>
                    {form.getFieldValue('isEdit') ? (
                      <>
                        <Button
                          type='text'
                          style={{ color: '#004EBC', padding: '0px 8px' }}
                          htmlType='submit'
                        >
                          Lưu
                        </Button>
                        <Button
                          type='text'
                          style={{ color: '#677072', padding: '0px 8px' }}
                          onClick={() =>
                            form.setFieldsValue({
                              isEdit: false,
                            })
                          }
                        >
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <IconEditBlue
                        className='icon-edit'
                        onClick={() => form.setFieldsValue({ isEdit: true })}
                      />
                    )}
                  </div>
                  <Row gutter={12}>
                    <Col span={10}>
                      <Row gutter={12}>
                        <Col span={6}>Họ và tên</Col>
                        <Col span={18}>
                          {form.getFieldValue('isEdit') ? (
                            <Row gutter={8}>
                              <Col span={8}>
                                <Form.Item
                                  name='lastName'
                                  label=''
                                  rules={[{ required: true, message: `Vui lòng nhập họ` }]}
                                  labelCol={{ span: 0 }}
                                >
                                  <Input allowClear placeholder='Họ' />
                                </Form.Item>
                              </Col>
                              <Col span={16}>
                                <Form.Item
                                  name='firstName'
                                  label=''
                                  rules={[{ required: true, message: `Vui lòng nhập tên` }]}
                                  labelCol={{ span: 0 }}
                                >
                                  <Input allowClear placeholder='Tên đệm và tên' />
                                </Form.Item>
                              </Col>
                            </Row>
                          ) : (
                            <div
                              style={{
                                paddingLeft: form.getFieldValue('isEdit') ? 0 : 6,
                              }}
                              className='value-text'
                            >
                              {form.getFieldValue('fullName')}
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={8}>
                      <Form.Item name='passport' label='Số hộ chiếu' labelCol={{ span: 12 }}>
                        <Input
                          allowClear
                          disabled={!form.getFieldValue('isEdit')}
                          placeholder={form.getFieldValue('isEdit') ? '' : 'Không có'}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12} style={{ marginTop: '-14px' }}>
                    <Col span={10}>
                      <Form.Item
                        name='gender'
                        label='Giới tính'
                        labelCol={{ span: 6 }}
                        className='value-text'
                      >
                        <Select
                          disabled={!form.getFieldValue('isEdit')}
                          suffixIcon={!form.getFieldValue('isEdit') ? null : <IconChevronDown />}
                          style={{ width: '50%' }}
                        >
                          {LIST_GENDER.map((el: some) => (
                            <Select.Option value={el.code} key={el.code}>
                              {el.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name='passportExpiry'
                        label='Thời hạn hộ chiếu'
                        labelCol={{ span: 12 }}
                      >
                        <DatePicker
                          format='DD/MM/YYYY'
                          placeholder={form.getFieldValue('isEdit') ? '' : 'Không có'}
                          allowClear={false}
                          suffixIcon={<IconCalendar />}
                          disabled={!form.getFieldValue('isEdit')}
                          style={{ paddingLeft: '6px' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12} style={{ marginTop: '-14px' }}>
                    <Col span={10}>
                      <Form.Item name='dob' label='Ngày sinh' labelCol={{ span: 6 }}>
                        <DatePicker
                          format='DD/MM/YYYY'
                          allowClear={false}
                          suffixIcon={<IconCalendar />}
                          placeholder={form.getFieldValue('isEdit') ? '' : 'Không có'}
                          disabled={!form.getFieldValue('isEdit')}
                          style={{ width: '50%', paddingLeft: '6px' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name='passportCountryCode'
                        label='Nước cấp hộ chiếu'
                        labelCol={{ span: 12 }}
                      >
                        <Select
                          disabled={!form.getFieldValue('isEdit')}
                          suffixIcon={!form.getFieldValue('isEdit') ? null : <IconChevronDown />}
                          showSearch
                          filterOption={(input, option) =>
                            (option!.children as unknown as string)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          placeholder={form.getFieldValue('isEdit') ? '' : 'Không có'}
                        >
                          {countries.map((el: some, idx: number) => (
                            <Select.Option value={el.code} key={`passportCountryCode-${idx}`}>
                              {el.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12} style={{ marginTop: '-14px' }}>
                    <Col span={10}>
                      <Form.Item name='eticketNumber' label='Số vé' labelCol={{ span: 6 }}>
                        <Input
                          allowClear
                          placeholder={form.getFieldValue('isEdit') ? '' : 'Không có'}
                          disabled={!form.getFieldValue('isEdit')}
                          title={form.getFieldValue('eticketNumber')}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name='nationalityCode' label='Quốc tịch' labelCol={{ span: 8 }}>
                        <Select
                          disabled={!form.getFieldValue('isEdit')}
                          suffixIcon={!form.getFieldValue('isEdit') ? null : <IconChevronDown />}
                          showSearch
                          filterOption={(input, option) =>
                            (option!.children as unknown as string)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          placeholder={form.getFieldValue('isEdit') ? '' : 'Không có'}
                        >
                          {countries.map((el: some, idx: number) => (
                            <Select.Option value={el.code} key={`nationalityCode-${idx}`}>
                              {el.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              );
            }}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
