import Login from "./pages/Login/index";
import Dashboard from "./pages/Dashboard/Index";
import EOD from "./pages/EOD/Index";
import EODDate from "./pages/EOD/EOD";
import ViewRecord from "./pages/ViewRecords/Index";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ManageStore from "./pages/ManageStore/Index";
import Register from "./pages/Signup/Index";
import EODSummary from "./pages/Receipt/EODSummary";
import EODReport from "./pages/Receipt/EODReport";
import Receipt from "./pages/Receipt/index";
import Error from "./pages/404/Index";
import OrderMeal from "./pages/OrderMeal/Index";
import OrderDetail from "./pages/ViewRecords/Order";
import ViewOrderLayout from "./pages/ViewRecords/viewOrderLayout";
import Profile from "./pages/Profile/Index";
//import { RequireAuth } from "react-auth-kit";
import AddMeal from "./pages/ManageStore/AddMeal";
import UpdateMeal from "./pages/ManageStore/UpdateMeal";
import DeleteMeal from "./pages/ManageStore/DeleteMeal";
import ViewMeals from "./pages/ManageStore/ViewMeals";
import AddStaff from "./pages/ManageStore/AddStaff";
import ViewStaffs from "./pages/ManageStore/ViewStaffs";
import Update from "./pages/ManageStore/Update"
import DeleteStaff from "./pages/ManageStore/DeleteStaff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard />
        }
      />
      <Route path="/eod" element={<EOD />} />
      <Route
        path="/eod/filter" element={<EODDate />} />
      <Route path="/records" element={<ViewOrderLayout />}>
        <Route
          path="orders/:orderId"
          element={
            <OrderDetail />
          }
        />
        <Route
          path="orders"
          element={
            <ViewRecord />
          }
        />
        <Route
          path="orders/search?date=eodDate"
          element={
            <ViewRecord />
          }
        />
      </Route>
      <Route
        path="/order-meal"
        element={
          <OrderMeal />
        }
      />
      <Route
        path="/profile"
        element={
          <Profile />
        }
      />
      <Route
        path="/manage-store"
        element={
          <ManageStore />
        }
      />
      <Route
        path="/manage-store/add-meal"
        element={
          <AddMeal />
        }
      />
      <Route
        path="/manage-store/update-meal"
        element={
          <UpdateMeal />
        }
      />
      <Route
        path="/manage-store/update-meal/:id"
        element={
          <Update />
        }
      />
      <Route
        path="/manage-store/delete-meal"
        element={
          <DeleteMeal />
        }
      />
      <Route
        path="/manage-store/view-meals"
        element={
          <ViewMeals />
        }
      />
      <Route
        path="/manage-store/add-staff"
        element={
          <AddStaff />
        }
      />
      <Route
        path="/manage-store/delete-staff"
        element={
          <DeleteStaff />
        }
      />
      <Route
        path="/manage-store/view-staffs"
        element={
          <ViewStaffs />
        }
      />
      <Route
        path="/manage-store/update-staff"
        element={
          <UpdateMeal />

        }
      />
      <Route
        path="/printReceipt/:id"
        element={
          <Receipt />

        }
      />
      <Route
        path="/printEODSummary"
        element={
          <EODSummary />

        }
      />
      <Route
        path="/printEODReport"
        element={
          <EODReport />

        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
