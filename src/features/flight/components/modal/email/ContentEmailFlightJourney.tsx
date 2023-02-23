import { CKEditor } from 'ckeditor4-react';
import { Button, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getConfirmationEmail, sendEmail } from '~/apis/flight';
import MessageNotDataModel from '~/features/flight/components/modal/MessageNotDataModel';
import { RULES_REGEXP_EMAIL, SETTING_INIT_CKEDITOR } from '~/features/flight/constant';
import { some } from '~/utils/constants/constant';
import { isEmpty } from '~/utils/helpers/helpers';

interface Props {
  dataModal: some;
  handleClose: () => void;
}

let valueTemps = {};
const { Option } = Select;
const childrenTagEmail: React.ReactNode[] = [];
const ContentEmailFlightJourney: React.FC<Props> = (props) => {
  const { handleClose, dataModal } = props;
  const intl = useIntl();
  const [form] = Form.useForm();

  const [editor, setEditor] = useState<string | undefined>(undefined);

  const isDataForm = isEmpty(form.getFieldsValue(true));

  const fetConfirmationEmail = async (queryParams = {}) => {
    try {
      const { data } = await getConfirmationEmail(queryParams);
      if (data.code === 200) {
        if (!isEmpty(data?.data)) {
          setEditor(data?.data?.bodyHtml);

          const temps = {
            ...data?.data,
            emails: [data?.data?.emailAddress],
          };
          form.setFieldsValue(temps);
          valueTemps = temps;
        }
      } else {
        setEditor(undefined);
        form.resetFields();
        message.error(data?.message);
      }
    } catch (error) {
      setEditor(undefined);
      console.log(error);
    }
  };

  const fetSendEmail = async (queryParams = {}) => {
    try {
      const { data } = await sendEmail(queryParams);
      if (data.code === 200) {
        message.success(intl.formatMessage({ id: 'IDS_TEXT_EMAIL_SENT_SUCCESS' }));
        handleClose();
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorChange = (valEditor: string) => {
    setEditor(valEditor);
  };

  const onFinish = (values: any) => {
    editor &&
      fetSendEmail({
        emails: values?.emails,
        caId: dataModal?.item?.caInfo?.id,
        htmlContent: editor,
        subject: values?.subject,
      });
  };

  useEffect(() => {
    if (dataModal.open) {
      fetConfirmationEmail({
        bookingType: 'flight',
        bookingId: dataModal?.item?.id,
      });
    } else {
      setEditor(undefined);
    }
  }, [dataModal]);

  if (editor === undefined) return <div style={{ height: 300 }} />;
  return (
    <>
      {isEmpty(form.getFieldsValue(true)) ? (
        <div>
          <MessageNotDataModel />
          <div className='wrapperSubmitSms'>
            <Button onClick={() => handleClose()}>
              <FormattedMessage id='IDS_TEXT_SKIP' />
            </Button>
          </div>
        </div>
      ) : (
        <Form
          form={form}
          scrollToFirstError
          colon={false}
          hideRequiredMark
          className='form-modal'
          onFinish={onFinish}
        >
          <div>
            <Form.Item
              name='emails'
              label={intl.formatMessage({ id: 'IDS_TEXT_RECIPIENT' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'IDS_TEXT_REQUIRED' }),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const isEmail = value
                      ?.map((val: string) => val.match(RULES_REGEXP_EMAIL))
                      ?.includes(null);
                    if (!isEmail) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error(intl.formatMessage({ id: 'IDS_TEXT_EMAIL_INVALIDATE' })),
                      );
                    }
                  },
                }),
              ]}
            >
              <Select
                disabled={isDataForm}
                mode='tags'
                style={{ width: '100%' }}
                placeholder={intl.formatMessage({ id: 'IDS_TEXT_RECIPIENT' })}
              >
                {childrenTagEmail}
              </Select>
            </Form.Item>

            <Form.Item
              name='subject'
              label={intl.formatMessage({ id: 'IDS_TEXT_SUBJECT' })}
              rules={[{ required: true, message: intl.formatMessage({ id: 'IDS_TEXT_REQUIRED' }) }]}
            >
              <Input
                disabled={isDataForm}
                allowClear
                placeholder={intl.formatMessage({ id: 'IDS_TEXT_ENTER_SUBJECT' })}
              />
            </Form.Item>
            <div style={{ marginBottom: 24 }}>
              <CKEditor
                initData={editor}
                onChange={(evt: any) => setEditor(evt.editor.getData())}
                config={SETTING_INIT_CKEDITOR}
              />
            </div>
          </div>
          <div className='wrapperSubmitSms'>
            <Button onClick={() => handleClose()}>
              <FormattedMessage id='IDS_TEXT_SKIP' />
            </Button>
            <Form.Item shouldUpdate className='buttonSubmit'>
              {() => (
                <Button disabled={isDataForm} type='primary' htmlType='submit'>
                  <FormattedMessage id='IDS_TEXT_SEND' />
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      )}
    </>
  );
};

export default ContentEmailFlightJourney;
