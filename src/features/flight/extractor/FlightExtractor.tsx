import { Image, message, Modal, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import {
  activateFlightExtractor,
  deactivateFlightExtractor,
  getFlightExtractors,
} from '~/apis/flight';
import { some } from '~/utils/constants/constant';

const FlightExtractor: React.FunctionComponent = () => {
  const [flightExtractors, setFlightExtractors] = useState<some[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleActivateExtractor = async (code: string) => {
    setLoading(true);
    try {
      const { data } = await activateFlightExtractor({ codes: [code] });
      if (data.code === 200) {
        message.success(data.message);
        getExtractors();
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {}
  };

  const handleDeactivateExtractor = async (code: string) => {
    setLoading(true);
    try {
      const { data } = await deactivateFlightExtractor({ codes: [code] });
      if (data.code === 200) {
        message.success(data.message);
        getExtractors();
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {}
  };

  const getExtractors = async () => {
    setLoading(true);
    try {
      const { data } = await getFlightExtractors();
      if (data.code === 200) {
        setFlightExtractors(
          data.data?.items?.map((el: some) => ({
            ...el,
          })),
        );
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {}
  };

  const confirmModal = (record: some) => {
    Modal.confirm({
      title: `Bạn có muốn ${record.active ? 'tắt' : 'bật'} hãng ${record.name} `,
      content: 'Vui lòng xác nhận kỹ thông tin trước khi thao tác!',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        if (record.active) {
          handleDeactivateExtractor(record.code);
        } else {
          handleActivateExtractor(record.code);
        }
      },
    });
  };

  const columns: ColumnsType<some> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (text) => {
        return (
          <div>
            <Image width={50} src={text} />
          </div>
        );
      },
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Tên hãng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (text, record) => {
        return (
          <Switch
            onChange={(value, e) => {
              e.stopPropagation();
              confirmModal(record);
            }}
            checked={text}
          />
        );
      },
    },
  ];

  useEffect(() => {
    getExtractors();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 10 }} className='title'>
        Danh sách extractors
      </h2>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={flightExtractors}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};
export default FlightExtractor;
