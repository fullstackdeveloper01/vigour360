import { useEffect, useState } from 'react';

import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

import { useMoney } from '@/settings';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import { tagColor } from '@/utils/statusTagColor';

import RecentTable from './components/RecentTable';

// import SummaryCard from './components/SummaryCard';
// import PreviewCard from './components/PreviewCard';
// import CustomerPreviewCard from './components/CustomerPreviewCard';

import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

export default function DashboardModule() { 
  var money_format_settings =1;
  if (money_format_settings) {
    return (
      <>
        <Row gutter={[32, 32]}>
          <div className="space30"></div>
          
          <div className="space30"></div>
          </Row>
      </>
    );
  } else {
    return <></>;
  }
}
