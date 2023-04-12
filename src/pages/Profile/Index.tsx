import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../../Layout/Dashboard/Dashboard";

type Props = {}

function Index({}: Props) {
  return (
    <>
    <DashboardLayout>
        <main className="dashboard__content">
          <div className="dashboard__content--eod-top">
            <h2 className="dashboard__heading">
              EOD (End of Day Transactions History)
            </h2>
          </div>
        </main>
    </DashboardLayout>
    </>
  )
}

export default Index