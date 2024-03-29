import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/ui/Button";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Input from "../../components/forms/formInput/Index";
import axios from "axios";
import { StaffProps } from "../../utils/types";
import { SpinnerButton } from "../../components/ui/Spinner/Spinner";
const env = import.meta.env;

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  gender: "Male",
  homeAddress: "",
  dob: "",
  state: "",
  lga: "",
  passport: "",
};
function AddStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffProps>(initialState);
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({
      ...staff,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        `${env.VITE_API_URL}/register`,
        staff,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }
      );

      if (response.data.success) {
        setStaff(initialState);
        toast.success(`${response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoading(false)
    } catch (error: any) {
      const errMsg = error.response.data.message
        ? error.response.data.message
        : error.response.data;

      toast.error(`${errMsg}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    }
  };

  return (
    <>
      <DashboardLayout>
        <main className="dashboard__content">
          <div className="flex space-between mt-s">
            <div className="dashboard__content--top col ">
              <h2 className="dashboard__heading uppercase underline">
                Add Staff
              </h2>
              <p className="mt-s">Kindly insert Staff Details</p>
            </div>
            <div>
              <div></div>
              <Button
                text={"GO BACK"}
                handleClick={() => navigate(-1)}
                classname={"primary-btn"}
              />
            </div>
          </div>
          <form className="login-form w-80" onSubmit={handleSubmit}>
            <div className="flex space-between">
              <Input
                type="text"
                boxClass="basis-47"
                name="firstname"
                value={staff.firstname}
                placeholder="Enter firstname"
                labelName="Firstname"
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="lastname"
                boxClass="basis-47"
                value={staff.lastname}
                onChange={handleChange}
                placeholder="Lastname"
                labelName="Lastname"
                required
              />
            </div>
            <div className="flex space-between">
              <Input
                type="email"
                boxClass="basis-32"
                name="email"
                value={staff.email}
                placeholder="Enter Email"
                labelName="Email"
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                boxClass="basis-32"
                value={staff.password}
                onChange={handleChange}
                placeholder="Password"
                labelName="Password"
                required
              />
              <Input
                type="number"
                boxClass="basis-32"
                name="phone"
                value={staff.phone}
                placeholder="Enter Phone No."
                labelName="Phone Number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex space-between">
              <div className="form-control  basis-32">
                <label className="form-label">Gender</label> <br />
                <select
                  name="gender"
                  required
                  id="gender"
                  className="form-input"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setStaff({
                      ...staff,
                      gender: event.currentTarget.value,
                    });
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <Input
                type="date"
                name="dob"
                boxClass="basis-32"
                value={staff.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                labelName="Date of Birth"
                required
              />
              <Input
                type="text"
                name="state"
                boxClass="basis-32"
                value={staff.state}
                onChange={handleChange}
                placeholder="State of Origin"
                labelName="State of Origin"
                required
              />
            </div>
            <div className="flex space-between">
              <Input
                type="text"
                boxClass="basis-47"
                name="lga"
                value={staff.lga}
                placeholder="Local Govt. Origin"
                labelName="Local Govt. Origin"
                onChange={handleChange}
                required
              />
              <Input
                type="textarea"
                boxClass="basis-47"
                name="homeAddress"
                value={staff.homeAddress}
                placeholder="Enter Home Address"
                labelName="Enter Home Address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex ">
              <Input
                type="file"
                name="passport"
                boxClass="w-100 mb-s"
                value={staff.passport}
                onChange={handleChange}
                placeholder="Passport"
                labelName="Choose a File"
                accept="jpg,png"
              />
            </div>
            <button className="btn primary-btn">
              {loading ? <SpinnerButton /> : "Add Staff"}
            </button>
          </form>
        </main>
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
      </DashboardLayout>
    </>
  );
}

export default AddStaff;
