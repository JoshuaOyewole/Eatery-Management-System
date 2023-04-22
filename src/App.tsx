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
import { RequireAuth } from "react-auth-kit";
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
          <RequireAuth loginPath="/">
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/eod" element={<EOD />} />
      <Route
        path="/eod/filter"
        element={
          <RequireAuth loginPath="/">
            <EODDate />
          </RequireAuth>
        }
      />
      <Route
        path="/records"
        element={
          <RequireAuth loginPath="/">
            <ViewOrderLayout />
          </RequireAuth>
        }
      >
        <Route
          path="orders/:orderId"
          element={
            <RequireAuth loginPath="/">
              <OrderDetail />
            </RequireAuth>
          }
        />
        <Route
          path="orders"
          element={
            <RequireAuth loginPath="/">
              <ViewRecord />
            </RequireAuth>
          }
        />
        <Route
          path="orders/search?date=eodDate"
          element={
            <RequireAuth loginPath="/">
              <ViewRecord />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/order-meal"
        element={
          <RequireAuth loginPath="/">
            <OrderMeal />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth loginPath="/">
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store"
        element={
          <RequireAuth loginPath="/">
            <ManageStore />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/add-meal"
        element={
          <RequireAuth loginPath="/">
            <AddMeal />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/update-meal"
        element={
          <RequireAuth loginPath="/">
            <UpdateMeal />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/update-meal/:id"
        element={
          <RequireAuth loginPath="/">
            <Update />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/delete-meal"
        element={
          <RequireAuth loginPath="/">
            <DeleteMeal />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/view-meals"
        element={
          <RequireAuth loginPath="/">
            <ViewMeals />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/add-staff"
        element={
          <RequireAuth loginPath="/">
            <AddStaff />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/delete-staff"
        element={
          <RequireAuth loginPath="/">
            <DeleteStaff />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/view-staffs"
        element={
          <RequireAuth loginPath="/">
            <ViewStaffs />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-store/update-staff"
        element={
          <RequireAuth loginPath="/">
            <UpdateMeal />
          </RequireAuth>
        }
      />
      <Route
        path="/printReceipt/:id"
        element={
          <RequireAuth loginPath="/">
            <Receipt />
          </RequireAuth>
        }
      />
      <Route
        path="/printEODSummary"
        element={
          <RequireAuth loginPath="/">
            <EODSummary />
          </RequireAuth>
        }
      />
      <Route
        path="/printEODReport"
        element={
          <RequireAuth loginPath="/">
            <EODReport />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
