import React from "react";
import { Switch, Route } from "react-router-dom";
import "assets/css/material-dashboard-react.css";
import AdminLayout from "./layouts/AdminLayout.js";

const AdminPage = () => {
  return (
    <Switch>
      <Route path="/" component={AdminLayout} />
    </Switch>
  );
};

export default AdminPage;
