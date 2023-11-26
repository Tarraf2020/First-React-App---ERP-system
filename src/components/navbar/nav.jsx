import React from "react";
import { useHistory, Link } from "react-router-dom";
import logo from "./logo/logo.jpg";
import CookieService from "../../services/CookieService";
import "./nav.css";

function Nav() {

  let history = useHistory();

  const logout_event = async (e) => {

    e.preventDefault();

    try {

      let bearer = CookieService.get('access_token');
      let res = await fetch('http://127.0.0.1:8000/api/auth/logout', {
        method: 'post',
        headers:
          { 'Authorization': bearer, }
      });

      let result = res;

      if (result) {
        console.log(result);
        CookieService.remove('access_token');
        history.push('/SignIn');
      } else {
        alert('something went wrong');
      }
    } catch (e) {
      alert(e);
    }

  }

  return (
    <div className="nav">
      <ul>
        <img src={logo} alt="logo img" />

        <li>
          <Link to="/employees">Employees</Link>
        </li>
        <li>
          <Link to="/teams">Teams</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/kpis">Kpis</Link>
        </li>
        <li id="down">
          <Link to="/admins">Admins</Link>
        </li>
        <li>
          <Link onClick={logout_event} to="/employees">Log Out</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
