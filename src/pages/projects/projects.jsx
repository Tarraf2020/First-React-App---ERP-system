import React from "react";
import Nav from "../../components/navbar/nav";
import Card_project from "../../components/project_card/ card_project";

import LoginStatus from '../../services/Login_status'

function Projects() {
  return (
    <>
      <Nav/>
      <div className="main">
        <div className="main_flex">
          <h1>Projects</h1>
          <input type="text" placeholder="Search.." />
          <button  type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <Card_project/>
        <LoginStatus/>
      </div>
    </>
  );
}

export default Projects;