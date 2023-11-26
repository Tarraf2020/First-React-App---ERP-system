import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginStatus from '../../services/Login_status'
import Teams_cards from '../../components/Team_card/Team_card';
import Nav from "../../components/navbar/nav";
import Team_pop from "../../components/Team_card/Teams_pop_up";
import "./teams.css";

export default function Teams() {

    const [Teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = () => {
        axios
        .get(`http://127.0.0.1:8000/api/teams`)
        .then((res) => {

            setTeams(res.data);

        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (

        <>
            <Nav />
            <div className="main">
                <div className="main_flex">
                    <h1>Teams</h1>
                    <input type="text" placeholder="Search.." />
                    <button type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <Teams_cards />
                <LoginStatus />
            </div>

        </>

    )

}
