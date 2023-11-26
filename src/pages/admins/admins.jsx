import React from "react";
import LoginStatus from '../../services/Login_status'
import Nav from "../../components/navbar/nav";
import Admin_card from "../../components/admin_card/card_admin";

function Employees() {
  return (
    <>
      <Nav />
      <div className="main">
        <div className="main_flex">
          <h1>Admins</h1>
          <input type="text" placeholder="Search.." />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <Admin_card/>
      </div>
      <LoginStatus/>
    </>
  );
}

export default Employees;
