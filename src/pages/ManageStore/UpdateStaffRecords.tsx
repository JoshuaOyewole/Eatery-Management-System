import React from 'react'
import DashboardLayout from '../../Layout/Dashboard/Dashboard'

type Props = {}

function UpdateStaffRecords({}: Props) {
  return (
    <>
    <DashboardLayout>
         <main className="dashboard__content">
           <div className="dashboard__content--top col ">
             <h2 className="dashboard__heading">Manage Store</h2>
             <p className="mt-s">
               The buttons below show a few things you can do right away
             </p>
           </div>
           </main>
     </DashboardLayout>
    </>
  )
}

export default UpdateStaffRecords