import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Doctors = lazy(() => import('@/pages/Doctors'));
// const Invoice = lazy(() => import('@/pages/Invoice'));
// const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));

// const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
// const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
// const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));
// const Quote = lazy(() => import('@/pages/Quote/index'));
// const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
// const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
// const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));
// const Payment = lazy(() => import('@/pages/Payment/index'));
// const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
// const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
// const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
// const Taxes = lazy(() => import('@/pages/Taxes'));
// const AdvancedSettings = lazy(() => import('@/pages/AdvancedSettings'));
const Profile = lazy(() => import('@/pages/Profile'));
const Lead = lazy(() => import('@/pages/Lead/index'));
// const Offer = lazy(() => import('@/pages/Offer/index'));
// const OfferCreate = lazy(() => import('@/pages/Offer/OfferCreate'));
// const OfferRead = lazy(() => import('@/pages/Offer/OfferRead'));
// const OfferUpdate = lazy(() => import('@/pages/Offer/OfferUpdate'));

// const ExpenseCategory = lazy(() => import('@/pages/ExpenseCategory'));
// const Expense = lazy(() => import('@/pages/Expense'));
// const ProductCategory = lazy(() => import('@/pages/ProductCategory'));
// const Product = lazy(() => import('@/pages/Product'));

const People = lazy(() => import('@/pages/People'));
const Company = lazy(() => import('@/pages/Company'));

// const About = lazy(() => import('@/pages/About'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/verify/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/resetpassword/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
 
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/doctors',
      element: <Doctors />,
    },
    {
      path: '/people',
      element: <People />,
    },
    {
      path: '/company',
      element: <Company />,
    },


 

    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },



    {
      path: '/lead',
      element: <Lead />,
    },

    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
