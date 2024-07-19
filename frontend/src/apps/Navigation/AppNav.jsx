import { Link } from 'react-router-dom';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const AppNav = ({ translate }) => [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to={'/'}>{translate('dashboard')}</Link>,
  },
  {
    key: 'doctors',
    icon: <CustomerServiceOutlined />,
    label: <Link to={'/doctors'}>{translate('doctors')}</Link>,
  },
  {
    key: 'people',
    icon: <UserOutlined />,
    label: <Link to={'/people'}>{translate('people')}</Link>,
  },
  {
    key: 'company',
    icon: <ShopOutlined />,
    label: <Link to={'/company'}>{translate('company')}</Link>,
  },
  {
    key: 'lead',
    icon: <FilterOutlined />,
    label: <Link to={'/lead'}>{translate('lead')}</Link>,
  },

];

export default AppNav;
