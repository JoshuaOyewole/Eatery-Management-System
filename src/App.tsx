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

import ProtectedRoute from "./utils/ProtectedRoute";

export const Home = () => {
  return (
    <div>Home</div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute >
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/eod" element={
        <ProtectedRoute >
          <EOD />
        </ProtectedRoute>} />
      <Route
        path="/eod/filter"
        element={
          <ProtectedRoute >
            <EODDate />
          </ProtectedRoute>

        } />
      <Route path="/records"
        element={
          <ProtectedRoute >
            <ViewOrderLayout />
          </ProtectedRoute>}>
        <Route
          path="orders/:orderId"
          element={
            <ProtectedRoute >
              <OrderDetail />
            </ProtectedRoute>

          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute >
              <ViewRecord />
            </ProtectedRoute>

          }
        />
        <Route
          path="orders/search?date=eodDate"
          element={
            <ProtectedRoute >
              <ViewRecord />
            </ProtectedRoute>

          }
        />
      </Route>
      <Route
        path="/order-meal"
        element={
          <ProtectedRoute >
            <OrderMeal />
          </ProtectedRoute>

        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute >
            <Profile />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store"
        element={
          <ProtectedRoute >
            <ManageStore />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/add-meal"
        element={
          <ProtectedRoute >
            <AddMeal />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/update-meal"
        element={
          <ProtectedRoute >
            <UpdateMeal />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/update-meal/:id"
        element={
          <ProtectedRoute >
            <Update />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/delete-meal"
        element={
          <ProtectedRoute >
            <DeleteMeal />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/view-meals"
        element={
          <ProtectedRoute >
            <ViewMeals />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/add-staff"
        element={
          <ProtectedRoute >
            <AddStaff />
          </ProtectedRoute>

        }
      />
      <Route
        path="/manage-store/delete-staff"
        element={
          <ProtectedRoute >

            <DeleteStaff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-store/view-staffs"
        element={
          <ProtectedRoute >
            <ViewStaffs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-store/update-staff"
        element={
          <ProtectedRoute >
            <UpdateMeal />
          </ProtectedRoute>

        }
      />
      <Route
        path="/printReceipt/:id"
        element={
          <ProtectedRoute >
            <Receipt />
          </ProtectedRoute>

        }
      />
      <Route
        path="/printEODSummary"
        element={
          <ProtectedRoute >
            <EODSummary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/printEODReport"
        element={
          <ProtectedRoute >
            <EODReport />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
