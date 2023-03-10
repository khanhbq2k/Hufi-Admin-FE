import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/utils/constants/constant';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigate({
              pathname: `/${routes.SALE}/${routes.FLIGHT}/${routes.FLIGHT_ONLINE}`,
            });
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
