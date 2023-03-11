import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { IconAirline, IconChevronDown, IconSubmenu, IconAirlineSelected } from '~/assets';
import '~/components/Layout/layout.scss';
import { routes } from '~/utils/constants/constant';
import { subRouteSelected } from '~/utils/constants/dataOptions';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  className?: string,
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    className,
  } as MenuItem;
}
export interface UserInfo {
  roles?: Array<string>;
  id?: number;
}

let isChangeCollapsible = false;

const LeftSideBar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const handleVisibleLeftSideBar = () => {
    isChangeCollapsible = true;
    setOpenKeys([]);
  };

  useEffect(() => {
    const selected: any = subRouteSelected.find((el) => location.pathname.includes(el.pathname));
    setSelectedKeys([selected?.pathname || location.pathname]);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      isChangeCollapsible = false;
    };
  }, []);

  const genGroupTitle = (title: React.ReactNode) => {
    return (
      <div className='group-item'>
        {title}
        <IconSubmenu />
      </div>
    );
  };

  const checkIconSelected = (keyGroup: string) => {
    return location.pathname.includes(keyGroup);
  };

  const items: MenuProps['items'] = [
    getItem(
      genGroupTitle(<FormattedMessage id='IDS_TEXT_SALE' />),
      `/${routes.SALE}`,
      null,
      [
        getItem(
          <FormattedMessage id='IDS_TEXT_FLIGHT' />,
          `/${routes.SALE}/${routes.FLIGHT}`,
          checkIconSelected(`/${routes.SALE}/${routes.FLIGHT}`) ? (
            <IconAirlineSelected />
          ) : (
            <IconAirline />
          ),
          [
            getItem(
              <a href='#'>Danh sách đơn hàng</a>,
              `/${routes.SALE}/${routes.FLIGHT}/${routes.FLIGHT_ONLINE}`,
              null,
            ),
            getItem(
              <a href='#'>Danh sách extractors</a>,
              `/${routes.SALE}/${routes.FLIGHT}/${routes.FLIGHT_EXTRACTOR}`,
              null,
            ),
            getItem(
              <a href='#'>Danh sách người dùng</a>,
              `/${routes.SALE}/${routes.FLIGHT}/${routes.FLIGHT_USER}`,
              null,
            ),
          ],
        ),
      ],
      '',
      'group',
    ),
  ];

  return (
    <Sider
      className='sider-container'
      width={240}
      collapsedWidth={56}
      collapsed={false}
      collapsible
      onCollapse={handleVisibleLeftSideBar}
    >
      <Menu
        onClick={onClick}
        mode='inline'
        items={items}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={(keys) => {
          setOpenKeys(keys);
        }}
        expandIcon={(props) => {
          return (
            <IconChevronDown className={`expand-icon ${props.isOpen ? 'expand-icon-open' : ''}`} />
          );
        }}
      />
    </Sider>
  );
};

export default LeftSideBar;
