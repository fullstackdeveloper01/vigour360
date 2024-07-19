import { useNavigate } from 'react-router-dom';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { Dropdown, Table } from 'antd';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import React from 'react';


export default function RecentStudentTable() {
  const { result, isLoading, isSuccess } = useFetch(async () => {
    const response = await request('/path/to/api/endpoint');
    return response.data; // Adjust this based on your API response structure
  });

  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <a href="javascript:void(0)" className="text-primary-600">
          {text}
        </a>
      ),
    },
    {
      title: 'School Name',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
  ];

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Table
                columns={columns}
                dataSource={firstFiveItems()}
                pagination={false}
                rowKey={(record) => record.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
