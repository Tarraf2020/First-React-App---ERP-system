import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../../components/navbar/nav";
// import "./emp.css";

export default function Add_evaluation() {

    const [Employees, setEmployee] = useState([]);
    const [Kpis, setKpis] = useState([]);

    const getEmpl = () => {
        axios
            .get(`http://127.0.0.1:8000/api/employeeAll`)
            .then((res) => {
                setEmployee(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getKpis = () => {
        axios
            .get(`http://127.0.0.1:8000/api/kpis`)
            .then((res) => {
                setKpis(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    // const postKpis = () => {

    //     let kpis_ev = {
     
    //     };

    //     console.log(empl);

    //     axios
    //         .post(`http://127.0.0.1:8000/api/kpis`)
    //         .then((res) => {
    //             setKpis(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    useEffect(() => {
        getEmpl();
        getKpis();
    }, []);

    return (
        <div>
            <Nav />
            <div className="main eval ">
                <div id="title1" >
                    <h1 style={{color:'#1C73A5'}}>Add New Evaluation</h1>
                </div>
                <div className="middle">
                    <div id="DIV">
                        <div className="DIV1">
                            <h2 style={{color:'#fff'}} >Add new evaluation</h2>
                            <label className="prjct_lbl_slct"  htmlFor="select">Select Employee</label>
                            <select className="assign_select" id="select">
                                {Employees.map((employee) => { return (<option value="" key={employee.id}>{employee.name}</option>); })}
                            </select>
                            <label className="prjct_lbl_slct" htmlFor="select">Select KPI</label>
                            <select  className="assign_select" id="select">
                                {Kpis.map((Kpis_data) => { return (<option value="" key={Kpis_data.id}>{Kpis_data.kpi_name}</option>); })}
                            </select>

                          <label className="prjct_lbl_slct" htmlFor="">Value</label>
                          <select className="assign_select" name="" id="">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>

                          </select>
                          <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-around",marginTop: "1rem" }}>
                                <button className="btn_assign">Save</button>
                                <button className="btn_assign">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}