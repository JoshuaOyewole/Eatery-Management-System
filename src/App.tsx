import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Index';
import EOD from './pages/EOD/Index';
import { Route, Routes } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import ManageOrders from './pages/ManageOrder/Index';
import Register from './pages/Signup/Index';
import Receipt from './pages/Receipt/index';
import Error from './pages/404/Index';
import OrderMeal from './pages/OrderMeal/Index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/eod" element={<EOD />} />
      <Route path="/order-meal" element={<OrderMeal />} />
      <Route path="/manage-orders" element={<ManageOrders />} />
      {/* <Routes>
        <Route path="invoices" element={<Invoices />}>
          <Route path=":invoiceId" element={<QueryInvoice />} />
          <Route path="printReceipt" element={<PrintReceipt />} />
        </Route>
      </Routes> */}
      <Route
        path="/printReceipt/:id"
        element={<Receipt />} />
      <Route
        path="*"
        element={<Error />}
      />
    </Routes>
  );
}

export default App;



