import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/ui/Button";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";
import Input from "../../components/forms/formInput/Index";
import axios from "axios";

type StaffProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  homeAddress?: string;
  dob: string;
  state: string;
  lga: string;
  passport?: string;
};
const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  homeAddress: "",
  dob: "",
  state: "",
  lga: "",
  passport: "",
};
function AddStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffProps>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({
      ...staff,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3100/register`,
        staff
      );

      if (response.data.success === true) {
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
                required
              />
            </div>
            <Input
              type="submit"
              value="Add Staff"
              className="btn primary-btn"
            />
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
