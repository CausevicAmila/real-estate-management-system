import React from "react";
import "./Admin.css";
import "../../components/Property/AdminCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminCard from "../../components/Property/AdminCard";

function Admin() {
  return (
    <Sidebar>
      <div >
        <AdminCard />
      </div>
    </Sidebar>
  );
}

export default Admin;
