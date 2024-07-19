import React from "react";

export default function AnalyticSummaryCard() {

  return (
    <div className="row gy-4">  
    <div className="col-xxl-4 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-3">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center">
                    <div className="icon-color w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                        <span className="mb-0 w-40-px h-40-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                            {/* <iconify-icon icon="flowbite:users-group-solid" className="icon"></iconify-icon> */}
                            <i className='fa fa-user-md'> </i>
                        </span>
                    </div>
                    <div>
                        <span className="mb-2 fw-medium text-secondary-light text-md">New Doctor</span>
                        <h6 className="fw-semibold my-1">5000</h6>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>

    <div className="col-xxl-4 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-2">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center">
                    <div className="icon-color w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                        <span className="mb-0 w-40-px h-40-px bg-purple flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                        <i className='fa fa-user'> </i>
                        </span>
                    </div>
                  
                    <div>
                        <span className="mb-2 fw-medium text-secondary-light text-md">Total Student</span>
                        <h6 className="fw-semibold my-1">15,000</h6>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>

    <div className="col-xxl-4 col-sm-6">
        <div className="card px-24 py-16 shadow-none radius-8 border h-100 bg-gradient-start-5">
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                <div className="d-flex align-items-center">
                    <div className="icon-color w-64-px h-64-px radius-16 bg-base-50 d-flex justify-content-center align-items-center me-20">
                        <span className="mb-0 w-40-px h-40-px bg-red flex-shrink-0 text-white d-flex justify-content-center align-items-center radius-8 h6 mb-0">
                       <i className="fa fa-university"></i>
                        </span>
                    </div>
                    <div>
                        <span className="mb-2 fw-medium text-secondary-light text-md">Total School</span>
                        <h6 className="fw-semibold my-1">15,000</h6>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}
