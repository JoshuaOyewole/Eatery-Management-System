import Login from "./pages/Auth/login";
import Dashboard from "./pages/Dashboard/Index";
import EOD from "./pages/EOD/Index";
import EODDate from "./pages/EOD/EOD";
import ViewRecord from "./pages/ViewRecords/Index";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ManageStore from "./pages/ManageStore/Index";
import Register from "./pages/Auth/register";
import EODSummary from "./pages/Receipt/EODSummary";
import EODReport from "./pages/Receipt/EODReport";
import Receipt from "./pages/Receipt/index";
import Error from "./pages/404/Index";
import OrderMeal from "./pages/OrderMeal/Index";
import OrderDetail from "./pages/ViewRecords/Order";
import ViewOrderLayout from "./pages/ViewRecords/viewOrderLayout";
import Profile from "./pages/Profile/Index";
import AddMeal from "./pages/ManageStore/AddMeal";
import UpdateMeal from "./pages/ManageStore/UpdateMeal";
import DeleteMeal from "./pages/ManageStore/DeleteMeal";
import ViewMeals from "./pages/ManageStore/ViewMeals";
import AddStaff from "./pages/ManageStore/AddStaff";
import ViewStaffs from "./pages/ManageStore/ViewStaffs";
import Update from "./pages/ManageStore/Update"
import DeleteStaff from "./pages/ManageStore/DeleteStaff";

import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import MySelect from "./pages/select";

export const Home = () => {
  return (
    <div>Home</div>
  )
}

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/select" element={<MySelect />} />
        <Route path="/admin/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/eod" element={<EOD />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/eod/filter" element={<EODDate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/records/orders" element={<EODDate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/records" element={<ViewOrderLayout />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="orders/:orderId" element={<OrderDetail />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="orders" element={<ViewRecord />} />
        </Route>
    
        <Route element={<ProtectedRoute />}>
          <Route path="orders/search?date=eodDate" element={<ViewRecord />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order-meal" element={<OrderMeal />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store" element={<ManageStore />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/add-meal" element={<AddMeal />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/update-meal" element={<UpdateMeal />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/update-meal/:id" element={<Update />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/delete-meal" element={<DeleteMeal />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/update-meal/:id" element={<Update />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/view-meals" element={<ViewMeals />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/add-staff" element={<AddStaff />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/delete-staff" element={<DeleteStaff />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/view-staffs" element={<ViewStaffs />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-store/update-staff" element={<UpdateMeal />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/printReceipt/:id" element={<Receipt />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/printEODSummary" element={<EODSummary />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/printEODReport" element={<EODReport />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>

  );
}

export default App;
