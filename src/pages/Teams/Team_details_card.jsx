import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginStatus from '../../services/Login_status';
import Nav from "../../components/navbar/nav";
import avatar from "../../components/images/img_avatar.png";
import AddCard from "../../components/addCard";



function Team_details_card({ match }) {

    const [Teams, setTeams] = useState([]);
    const [Emp, setEmp] = useState([]);
    const [Proj, setProj] = useState([]);
    const [RoleOFEmp, setRoleOFEmp] = useState([]);
    const [Roles, setRoles] = useState([]);
    const id=match.params.id; 


    useEffect(() => {
        // getTeamsID();
        getTeamsEmp();
        // getTeamsEmp().then(res => {
        //     getRole(res)
        // });
        // getTeamProj();
    }, []);

    // async function getRole(emps) {
    //     let roles = [];
    //     let empid = emps.map(item => item.id);

    //     for (let i = 0; i < empid.length; i++) {
    //         roles[i] = await getRoleOFEmp(empid[i])
    //     }
        
    //     setRoles(roles)
    //     console.log({ empid, emps, roles })
    // }

    // const getTeamsID = () => {
    //     axios
    //         .get(`http://127.0.0.1:8000/api/teams/${match.params.id}`)
    //         .then((res) => {

    //             setTeams(res.data[0]);

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }


    // async function getRoleOFEmp(Id) {
    //     try {
    //         let res = await axios.get(`http://127.0.0.1:8000/api/roleEmp/${Id}`);
    //         setRoleOFEmp(res.data);
    //         return res.data[0];
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


    const getTeamsEmp = async () => {
        try {
            let res = await axios.get(`http://127.0.0.1:8000/api/empteam/${match.params.id}`);
            setEmp(res.data);
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }


    // const getTeamProj = () => {

    //     axios
    //         .get(`http://127.0.0.1:8000/api/teams_project/${match.params.id}`)
    //         .then((res) => {

    //             setProj(res.data);
    //             console.log(res.data);

    //         })

    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }


    const RemoveFromTeam = async (id) => {

        let A1 = {
            team_id: null,
        };

        await axios
            .put(`http://127.0.0.1:8000/api/employees/${id}`, A1)
            .catch((err) => {
                alert(err);
                window.location.reload();
            });
        window.location.reload();
    };




    return (
        <>
            <Nav />
            <div className="main">

                <div className="main_flex">
                    <h1>Team Details</h1>
                    <input type="text" placeholder="Search.." />
                    <button type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>

                <div className="flex_cards">

                    <AddCard title="Add Employee/Assign Role and Projects " route={`/teams/addEmpRolePrjct/${id}`} />



                    {Emp.map((Emp_data) => {


                      


                        return (
                            <div className="card" key={Emp_data.id} style={{ position: "relative" }}>

                                <Link
                                    style={{ backgroundColor: '#F27F1C', color: '#fff', padding: '4.5px', paddingLeft: '8.5px', borderTop: '0', position: 'absolute', top: '0', right: '0', borderTopRightRadius: '40% 28%', }}
                                    className="link"
                                    onClick={() => { RemoveFromTeam(Emp_data.id) }}>
                                    <i className="fas fa-trash-alt"></i>
                                </Link>
                                <Link
                                className="link"
                                TeamId={match.params.id}
                                to={`/teamemp/${Emp_data.id}/${match.params.id}`}
                                >
                                <div className="card_img" >
                                    <img
                                        className="card_emp"
                                        src={avatar}
                                        alt="logo img"
                                        height={150}
                                        width={250}
                                    />
                                </div>
                               
                                <h3>{Emp_data.firstname}</h3>
                                </Link>

                      
                            </div>
                        );
                    })}

                </div>
            </div>

            <LoginStatus />
        </>
    )
}

export default Team_details_card
