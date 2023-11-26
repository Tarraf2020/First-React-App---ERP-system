import React from "react";
import Nav from "../../components/navbar/nav";
import Card_Kpis from "../../components/kpis_card/kpis_card";

import LoginStatus from '../../services/Login_status'

function Kpis() {
  return (
    <>
      <Nav/>
      <div className="main">
        <div className="main_flex">
          <h1>Kpis</h1>
          <input type="text" placeholder="Search.." />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <Card_Kpis/>
        <LoginStatus/>
      </div>
    </>
  );
}

export default Kpis;
