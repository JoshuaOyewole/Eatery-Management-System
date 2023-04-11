import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Index";
import EOD from "./pages/EOD/Index";
import EODDate from "./pages/EOD/EOD";
import ViewRecord from "./pages/ViewRecords/Index";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ManageOrders from "./pages/ManageOrder/Index";
import Register from "./pages/Signup/Index";
import EODSummary from "./pages/Receipt/EODSummary";
import EODReport from "./pages/Receipt/EODReport";
import Receipt from "./pages/Receipt/index";
import Error from "./pages/404/Index";
import OrderMeal from "./pages/OrderMeal/Index";
import OrderDetail from "./pages/ViewRecords/Order";
import ViewOrderLayout from "./pages/ViewRecords/viewOrderLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/eod" element={<EOD />} />
      <Route path="/eod/filter" element={<EODDate />} />
      <Route path="/records" element={<ViewOrderLayout />}>
        <Route path="orders/:orderId" element={<OrderDetail />} />
        <Route path="orders" element={<ViewRecord />} />
        <Route path="orders/search?date=eodDate" element={<ViewRecord />} />
      </Route>
      <Route path="/order-meal" element={<OrderMeal />} />
      <Route path="/manage-orders" element={<ManageOrders />} />
      <Route path="/printReceipt/:id" element={<Receipt />} />
      <Route path="/printEODSummary" element={<EODSummary />} /> 
      <Route path="/printEODReport" element={<EODReport />} /> 
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
