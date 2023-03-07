import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { login } from '~/apis/system';
import cookie from 'js-cookie';
import { routes, TOKEN } from '~/utils/constants/constant';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const LoginForm: React.FC = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onFinish = async () => {
    try {
      const dataDTO = { email, password };
      const { data } = await login(dataDTO);
      if (data.code === 200) {
        cookie.set(TOKEN, data.data.token, { expires: 365 });
        navigate(routes.DASHBOARD);
        message.success('Đăng nhập thành công');
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      //
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      style={{ width: '400px', margin: '0 180px' }}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
