import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/utils/hook/redux';

import { FormattedMessage } from 'react-intl';
import { IconAirline, IconChevronDown, IconSubmenu, IconAirlineSelected } from '~/assets';
import '~/components/Layout/layout.scss';
import { visiblecollaps } from '~/features/systems/systemSlice';
import { IS_COLLAPSIBLE, LAST_LINK_PREVIEW, routes } from '~/utils/constants/constant';
import { subRouteSelected } from '~/utils/constants/dataOptions';
import { isEmpty } from '~/utils/helpers/helpers';

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
  const dispatch = useAppDispatch();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const collapsible: boolean = useAppSelector((state) => state.systemReducer.collapsible);
  const userInfo: UserInfo = useAppSelector((state) => state.systemReducer.userInfo);

  const onClick: MenuProps['onClick'] = (e) => {
    localStorage.setItem(LAST_LINK_PREVIEW, e.key);
    navigate(e.key);
  };

  const getDefaultOpenKeys = (subKey: string) => {
    let listKey = subKey.split('/');
    listKey = listKey.slice(1, listKey.length - 1);
    let result: string[] = [];
    let parentKey = '';
    listKey.forEach((el) => {
      result.push(`${parentKey}/${el}`);
      parentKey = `${parentKey}/${el}`;
    });
    setOpenKeys(result);
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
    if (!collapsible) {
      getDefaultOpenKeys(location.pathname);
    }
  }, [collapsible]);

  useEffect(() => {
    return () => {
      isChangeCollapsible = false;
    };
  }, []);

  useEffect(() => {
    if (isEmpty(openKeys) && isChangeCollapsible) {
      isChangeCollapsible = false;
      dispatch(visiblecollaps(!collapsible));
      localStorage.setItem(IS_COLLAPSIBLE, String(!collapsible));
    }
  }, [openKeys]);

  const genGroupTitle = (title: React.ReactNode, keyGroup: string) => {
    return collapsible ? (
      <span className='group-item-collapsible'>
        <IconSubmenu />
      </span>
    ) : (
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
      genGroupTitle(<FormattedMessage id='IDS_TEXT_SALE' />, 'sale'),
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
      collapsed={collapsible}
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
