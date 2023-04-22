import React from "react";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";



function Index() {
  return (
    <>
    <DashboardLayout>
        <main className="dashboard__content">
          <div className="dashboard__content--eod-top">
            <h2 className="dashboard__heading">
              Profile
            </h2>
          </div>
        </main>
    </DashboardLayout>
    </>
  )
}

export default Index