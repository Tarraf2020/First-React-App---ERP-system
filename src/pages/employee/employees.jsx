import React, {useState} from "react";
import Nav from "../../components/navbar/nav";
import Card_employee from "../../components/employee_card/card_employee";

import LoginStatus from '../../services/Login_status'

function Employees() {
  const [Search, setSearch] = useState("");
  return (
    <>
      <Nav/>
      <div className="main">
        <div className="main_flex">
          <h1>Employees</h1>
          <input type="text" placeholder="Search.."  value={Search}
          onChange={e=>setSearch(e.target.value)}
          />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <Card_employee search={Search} />
        <LoginStatus/>
      </div>
    </>
  );
}

export default Employees;
