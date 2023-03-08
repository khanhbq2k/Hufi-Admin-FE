import { Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

import { BannerLoginImg, LogoLogin } from '~/assets';

import '~/features/login/login.scss';
import LoginForm from './component/LoginForm';

const Login = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <div className='via-login-content'>
            <img style={{width: 350}} src={LogoLogin} alt='anh logo login' />
            <span className='title-login'>
              <FormattedMessage id='IDS_TEXT_WELCOME_BACK' />
            </span>
            <LoginForm />
          </div>
        </Col>
        <Col span={12}>
          <img className='via-login-img' src={BannerLoginImg} alt='anh banner login' />
        </Col>
      </Row>
    </>
  );
};

export default Login;
