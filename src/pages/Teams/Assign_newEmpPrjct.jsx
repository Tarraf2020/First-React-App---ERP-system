import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Nav from "../../components/navbar/nav";


export default function Add_evaluation({ match }) {

    const id = match.params.id;

    const [Employees, setEmployee] = useState([]);
    const [Roles, setRoles] = useState([]);
    const [Projects, setProjects] = useState([]);
    const [prId, setPrId] = useState([]);
    const [empId, setEmpId] = useState([]);
    const [roleId, setRolId] = useState([]);
    const history = useHistory();

    useEffect(() => {

        getEmpl();
        getprojects();
        getroles();
     
    }, []);


    const getEmpl = () => {
        const id =match.params.id;

        axios
            .get(`http://127.0.0.1:8000/api/empteam/${id}`)
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };



    const getprojects = () => {
        axios
            .get(`http://127.0.0.1:8000/api/projectsAll`)
            .then((res) => {
                setProjects(res.data);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getroles = () => {
        axios
            .get(`http://127.0.0.1:8000/api/roles`)
            .then((res) => {
                setRoles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };




    const postEmpRole = (e) => {

        e.preventDefault();

        let Emprole = {

            project_id: prId,
            emp_id: empId,
            role_id: roleId,
        };

        console.log(Emprole);


        axios
            .post(`http://127.0.0.1:8000/api/emprole`, Emprole)
            .then((res) => {
                console.log(res.data);
                history.push(`/teams/${id}`);
            })
            .catch((err) => {
                console.log(err);
                history.push(`/teams/${id}`)

            });
    };



    return (
        <div>
            <Nav />

            <div className="main eval ">
                <form onSubmit={postEmpRole}>
                    <div id="title1">
                        <h1 style={{ color: "#1C73A5" }}>Assign New Role and Project</h1>
                        <hr className="hrofassign" />
                    </div>
                    <div className="middle">
                        <div id="DIV">
                            <div className="DIV1">
                                <h3 style={{ color: "#fff" }}>Assign New Role and Project</h3>
                              
                           
                                <label className="prjct_lbl_slct" htmlFor="select_emp">Select Employee</label>
                                <select required className="assign_select" onChange={e => setEmpId(e.target.value)} id="select_emp">
                                    <option value="">None</option>
                                    {Employees.map((emp_data) => { return (<option value={emp_data.id} key={emp_data.id}>{emp_data.firstname}</option>); })}
                                </select>
                                <label className="prjct_lbl_slct" htmlFor="select_role"> Select Role</label>
                                <select required className="assign_select" onChange={e => setRolId(e.target.value)} id="select_role">
                                    <option value="">None</option>
                                    {Roles.map((Roles_data) => { return (<option value={Roles_data.id} key={Roles_data.id}>{Roles_data.role_name}</option>); })}
                                </select>



                                <label htmlFor="select" className="prjct_lbl_slct"> Select Project</label>
                                <select required className="assign_select" onChange={e => setPrId(e.target.value)} id="select">
                                    <option value="">None</option>
                                    {Projects.map((project_data) => { return (<option value={project_data.id} key={project_data.id}>{project_data.project_name}</option>); })}
                                </select>

                                <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
                                    <button className="btn_assign" type="submit" >Save</button>
                                    <span style={{ display: "inline-block", width: "1rem" }}>      </span>
                                    <button className="btn_assign" onClick={e => {  history.push(`/teams/${id}`) }} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}