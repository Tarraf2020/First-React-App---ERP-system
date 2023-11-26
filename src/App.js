import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Card_employee from "./pages/employee/employees";
import Employee_edit from "./pages/employee/edit_employee";
import Add_Employee from "./pages/employee/add_employee";
import admins from "./pages/admins/admins";
import admins_add from "./pages/admins/add_admins";
import Admins_edit from "./pages/admins/edit_admins";
import SignIn from "./pages/SignIn/SignIn";
import Teams from "./pages/Teams/teams";
import Team_details_cards from "./pages/Teams/Team_details_card";
import kpis from "./pages/kpis/kpis";
import kpis_details from "./pages/kpis/kpis_details";
import Kpis_add_evaluation from "./pages/kpis/Kpi_add_evaluation.jsx"
import Assign from "./pages/Teams/Assign_newEmpPrjct";
import Teamemp from"./pages/Teams/teamempdata";
import Projects from "./pages/projects/projects";
import Teams_of_projects from "./components/project_card/Teams_of_Projects";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/employees/add" exact component={Add_Employee} ></Route>
          <Route path="/employees" exact component={Card_employee}></Route>
          <Route path="/employees/:id" exact component={Employee_edit}></Route>

          <Route path="/admins" exact component={admins}></Route>
          <Route path="/admins/add" exact component={admins_add}></Route>
          <Route path="/admins/:id" exact component={Admins_edit}></Route>

          <Route path="/teams" exact component={Teams}></Route>
          <Route path="/teams/addEmpRolePrjct/:id" exact component={Assign}></Route>
          <Route path="/teams/:id" exact component={Team_details_cards}></Route>
          <Route path="/teamemp/:id/:teamid" exact component={Teamemp}></Route>
          <Route path="/kpisempEv/add" exact component={Kpis_add_evaluation}></Route>
         
          <Route path="/teamsprojects/:id" exact component={Teams_of_projects}></Route>
          
          

          <Route path="/projects" exact component={Projects}></Route>
          <Route path="/kpis" exact component={kpis}></Route>
          <Route path="/kpisemp/:id" exact component={kpis_details}></Route>
       
          
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
