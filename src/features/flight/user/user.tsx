import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUserInfo, blockUser, unblockUser } from '~/apis/system';
import { IconChevronDown } from '~/assets';
import { some } from '~/utils/constants/constant';
import { listGender } from '~/utils/constants/dataOptions';

const UserList: React.FunctionComponent = () => {
  const [listUser, setListUser] = useState<some[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [createModal, setCreateModel] = useState<some>({
    open: false,
    item: null,
  });
  const [editModel, setEditModel] = useState<some>({
    open: false,
    item: null,
  });

  const handleBlockUser = async (userId: number) => {
    setLoading(true);
    try {
      const { data } = await blockUser(userId);
      if (data.code === 200) {
        message.success(data.message);
        getUserList();
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {}
  };

  const handleUnblockUser = async (userId: number) => {
    setLoading(true);
    try {
      const { data } = await unblockUser(userId);
      if (data.code === 200) {
        message.success(data.message);
        getUserList();
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {}
  };

  const getUserList = async () => {
    setLoading(true);
    try {
      const { data } = await getAllUsers();
      if (data?.code === 200) {
        setListUser(data?.data?.items);
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {}
  };

  const confirmBlockUserModal = (record: some) => {
    Modal.confirm({
      title: `Bạn có muốn ${!record.active ? 'bỏ ' : ''}chặn user ${record.fullName}`,
      content: 'Vui lòng xác nhận kỹ thông tin trước khi thao tác!',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        if (record.active) {
          handleBlockUser(record.id);
        } else {
          handleUnblockUser(record.id);
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
      title: 'Họ và Tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => {
        return <div>{listGender.find((g) => g.code === text)?.name}</div>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Số điện thoai',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (text) => {
        return (
          <span>
            {<Tag color={text ? 'success' : 'error'}>{text ? 'Hoạt động' : 'Không hoạt động'}</Tag>}
          </span>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (text, record) => {
        return (
          <Space>
            <Button
              type='primary'
              onClick={() => {
                setEditModel({
                  open: true,
                  item: record,
                });
              }}
            >
              Sửa
            </Button>
            <h4 style={{ display: 'flex', alignItems: 'center', padding: 8, margin: 0 }}>Chặn</h4>
            <Switch
              onChange={(value, e) => {
                e.stopPropagation();
                confirmBlockUserModal(record);
              }}
              checked={text}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <Row justify='space-between' style={{ marginBottom: 15 }}>
        <h3 className='title'>Danh sách người dùng</h3>
        <Button
          type='primary'
          onClick={() => {
            setCreateModel({
              item: {},
              open: true,
            });
          }}
        >
          Thêm user
        </Button>
      </Row>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={listUser}
        loading={loading}
        pagination={false}
      />
      <CreateUserDrawer modal={createModal} setModal={setCreateModel} />
      <EditUserDrawer modal={editModel} setModal={setEditModel} />
    </div>
  );
};
export default UserList;

const CreateUserDrawer = (props: any) => {
  const { modal, setModal } = props;
  const { item } = modal;
  const [form] = Form.useForm();

  const onFinish = async (value: some) => {
    try {
      const dataDTO = {
        firstName: value.firstName,
        lastName: value.lastName,
        password: value.password,
        gender: value.gender,
        email: value.email,
        phone: value.phone,
        active: value.active,
      };
      const { data } = await createUser(dataDTO);
      if (data?.code === 200) {
        handleClose();
      } else {
        message.error(data.message);
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setModal({
      item: null,
      open: false,
    });
  };
  useEffect(() => {
    form.resetFields();
  }, [modal]);

  return (
    <Drawer
      title='Thêm người dùng'
      placement='right'
      onClose={() => {
        handleClose();
      }}
      visible={modal.open}
      width={400}
      className='drawer-arise-detail'
    >
      <>
        <Form form={form} initialValues={item} onFinish={onFinish} layout='vertical'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item name='firstName' label='Họ'>
            <Input />
          </Form.Item>
          <Form.Item name='lastName' label='Tên'>
            <Input />
          </Form.Item>
          <Form.Item name='gender' label='Giới tính'>
            <Select placeholder='Chọn' suffixIcon={<IconChevronDown />} optionFilterProp='children'>
              {listGender.map((el: some, indx: number) => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name='phone' label='Số điện thoại'>
            <Input />
          </Form.Item>
          <Form.Item name='active' label='Trạng thái' valuePropName='checked'>
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' className='send-note'>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </>
    </Drawer>
  );
};

const EditUserDrawer = (props: any) => {
  const { modal, setModal } = props;
  const { item } = modal;
  const [form] = Form.useForm();

  const onFinish = async (value: some) => {
    try {
      const dataDTO = {
        userId: modal.item.id,
        firstName: value.firstName,
        lastName: value.lastName,
        password: value.password,
        gender: value.gender,
        email: value.email,
        phone: value.phone,
      };
      const { data } = await updateUserInfo(dataDTO);
      if (data?.code === 200) {
        handleClose();
      } else {
        message.error(data.message);
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setModal({
      item: null,
      open: false,
    });
  };
  useEffect(() => {
    form.resetFields();
  }, [modal]);

  return (
    <Drawer
      title='Sửa thông tin người dùng'
      placement='right'
      onClose={() => {
        handleClose();
      }}
      visible={modal.open}
      width={400}
      className='drawer-arise-detail'
    >
      <>
        <Form form={form} initialValues={item} onFinish={onFinish} layout='vertical'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item name='lastName' label='Họ'>
            <Input />
          </Form.Item>
          <Form.Item name='firstName' label='Tên'>
            <Input />
          </Form.Item>
          <Form.Item name='gender' label='Giới tính' initialValue={modal.gender}>
            <Select placeholder='Chọn' suffixIcon={<IconChevronDown />} optionFilterProp='children'>
              {listGender.map((el: some) => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='email' label='Email'>
            <Input />
          </Form.Item>
          <Form.Item name='password' label='Password'>
            <Input.Password />
          </Form.Item>
          <Form.Item name='phone' label='Số điện thoại'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' className='send-note'>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </>
    </Drawer>
  );
};
