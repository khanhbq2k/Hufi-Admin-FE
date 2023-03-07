import { Avatar, Button, Layout, Popover } from 'antd';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  IconCamera,
  IconEmail,
  IconLogout,
  IconNotiHeader,
  IconVNTravelLogo,
} from '~/assets/index';
import { routes, TOKEN } from '~/utils/constants/constant';

import { setUserInfo } from '~/features/systems/systemSlice';
import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';

import { useIntl } from 'react-intl';
import { logout } from '~/apis/system';
import '~/components/Layout/layout.scss';

const { Header } = Layout;

interface userInfo {
  name?: string;
}
interface UserInfo {
  email?: string;
  userInfo?: userInfo;
  fullName?: string;
}

const HeaderContainer = () => {
  const intl = useIntl();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo: UserInfo = useAppSelector((state) => state.systemReducer.userInfo);

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data.code === 200) {
        dispatch(setUserInfo({}));
        cookie.remove(TOKEN);
        navigate(routes.LOGIN);
      }
    } catch (error) {}
  };

  const content = (
    <>
      <div className='content-user-info'>
        <Avatar className='avatar-content'>
          <span className='avatar-letter'>{userInfo?.fullName?.split(' ').pop()?.at(0)}</span>
        </Avatar>
        <span className='name-user'>{userInfo?.userInfo?.name}</span>
        <span className='email-user'>{userInfo?.email}</span>
        <Button
          disabled
          onClick={() => {
            document?.getElementById('upload_file')?.click();
          }}
          type='text'
          className='icon-camera'
          icon={<IconCamera />}
        ></Button>
      </div>
      <div className='item-menu-user' onClick={handleLogout}>
        <IconLogout />
        <span className='name-item-menu-user'>{intl.formatMessage({ id: 'IDS_TEXT_LOGOUT' })}</span>
      </div>
    </>
  );

  return (
    <Header className='header-container'>
      <div className='badge-header'>
        <IconVNTravelLogo />
      </div>
      <div className='badge-header'>
        <IconNotiHeader />
        <IconEmail />
        <Popover
          trigger='click'
          className='avatar-info'
          placement='bottomRight'
          overlayClassName='popover-userinfo'
          content={content}
        >
          <span>{userInfo?.fullName} </span>
          <Avatar style={{ backgroundColor: 'purple', marginLeft: 8 }}>
            {userInfo?.fullName?.split(' ').pop()?.at(0)}
          </Avatar>
        </Popover>
      </div>
    </Header>
  );
};

export default HeaderContainer;
