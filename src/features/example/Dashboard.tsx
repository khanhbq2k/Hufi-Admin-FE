import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/utils/constants/constant';

const Dashboard = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(routes.DASHBOARD);
  }, []);
  return <h2></h2>;
};
export default Dashboard;
