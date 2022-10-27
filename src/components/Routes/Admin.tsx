import React from "react";
import Dashboard from "../../pages/Admin/Dashboard";
import Doctor from "../../pages/Admin/Employee/Doctor";
import Nurse from "../../pages/Admin/Employee/Nurse";
import Overview from "../../pages/Admin/Overview";
import Customer from "../../pages/Admin/User/Customer";
import Partner from "../../pages/Admin/User/Partner";
import Patient from "../../pages/Admin/User/Patient";
import LayoutAdmin from "../Layout/LayoutAdmin";

const routerAdmin = [
  {
    path: "/admin",
    element: (
      <LayoutAdmin>
        <Overview />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/analytics",
    element: (
      <LayoutAdmin>
        <Dashboard />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/view",
    element: (
      <LayoutAdmin>
        <Dashboard />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/user/patient",
    element: (
      <LayoutAdmin>
        <Patient />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/user/customer",
    element: (
      <LayoutAdmin>
        <Customer />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/user/partner",
    element: (
      <LayoutAdmin>
        <Partner />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/employee/doctor",
    element: (
      <LayoutAdmin>
        <Doctor />
      </LayoutAdmin>
    ),
  },
  {
    path: "/admin/employee/nurse",
    element: (
      <LayoutAdmin>
        <Nurse />
      </LayoutAdmin>
    ),
  },
];

export default routerAdmin;
