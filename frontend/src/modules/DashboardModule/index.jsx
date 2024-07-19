import { useEffect, useState } from 'react';
import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';
import RecentStudentTable from './components/RecentStudentTable';
import RecentSchoolTable from './components/RecentSchoolTable';
import RecentDoctorTable from './components/RecentDoctorTable';
import SummaryCard from './components/SummaryCard';


export default function DashboardModule() {
  const translate = useLanguage();


  return (
    <>
      <SummaryCard />
      <div className="space30"></div>

      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              {translate('Recently Added Student')}
            </h3>
            <RecentStudentTable /> 
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              {translate('Recently Added School')}
            </h3>
            <RecentSchoolTable />
          </div>
        </Col>
      </Row>

      <div className="space30"></div>

      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              {translate('Recently Added Doctor')}
            </h3>
            <RecentDoctorTable  />
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <div className="panel-heading chart-heading">
              <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
                <a href="#" style={{ width: '100%', color: '#22075e' }}>
                  {translate('Doctor')}
                </a>
                <a href="#" style={{ color: '#22075e' }}>
                  <span class="pull-right">34 </span>
                </a>
              </h3>
            </div>
            <table class="table table-hover personal-task">
              <tbody>
                <tr>
                  <td>
                    <i class="fa fa-thumbs-up"></i>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                      Active Doctor
                    </a>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                      34
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>

      <div className="space30"></div>
      <div className='row'>
      <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
        <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <div className="panel-heading chart-heading">
              <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
                <a href="#" style={{ width: '100%', color: '#22075e' }}>
                  {translate('School')}
                </a>
                <a href="#" style={{ color: '#22075e' }}>
                  <span class="pull-right">47</span>
                </a>
              </h3>
            </div>
            <table class="table table-hover personal-task">
              <tbody>
                <tr>
                  <td>
                    <i class="fa fa-thumbs-up"></i>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                    Active school
                    </a>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                      47
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
      </div>
    </div>

    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
        <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <div className="panel-heading chart-heading">
              <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
                <a href="#" style={{ width: '100%', color: '#22075e' }}>
                  {translate('Student')}
                </a>
                <a href="#" style={{ color: '#22075e' }}>
                  <span class="pull-right">12200 </span>
                </a>
              </h3>
            </div>
            <table class="table table-hover personal-task">
              <tbody>
                <tr>
                  <td>
                    <i class="fa fa-thumbs-up"></i>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                    Active Student
                    </a>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                    12200
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
      </div>
    </div>

    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
        <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <div className="panel-heading chart-heading">
              <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
                <a href="#" style={{ width: '100%', color: '#22075e' }}>
                  {translate('Student')}
                </a>
                <a href="#" style={{ color: '#22075e' }}>
                  <span class="pull-right">	14183 </span>
                </a>
              </h3>
            </div>
            <table class="table table-hover personal-task">
              <tbody>
                <tr>
                  <td>
                    <i class="fa fa-thumbs-up"></i>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                    Test Completed
                    </a>
                  </td>
                  <td>
                    <a href="#" style={{ color: '#000' }}>
                    14183
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
      </div>
    </div>
    </div>
    </>
  );
}
