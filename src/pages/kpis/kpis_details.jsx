import React from "react";
import Nav from "../../components/navbar/nav";
import { makeStyles } from '@material-ui/core';
import LoginStatus from '../../services/Login_status'
import Kpis_add from "../../components/kpis_card/kpis_add";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({


    Wrapper: {

        display: "flex",
        flexFlow: "wrap",
        justifyContent: "space-evenly",


    },

    Title: {
        color: '#1C73A5',
    },

    addCard: {
        backgroundColor: "#F1F1F1",
        textAlign: 'center',
        padding: '25px',
        borderRadius: "25px",
        textDecoration: "none",

    },

    empKpi: {
        display: "flex",
        flexDirection: "column",
    }


}))

export default function Kpis_details({ match }) {


    const [Empkpis, setEmpKpis] = useState([]);
    const [EmpEval, setEmpEval] = useState([]);
    var i = [];


    useEffect(() => {
        getData();
    }, []);



    const getData = async () => {
        const id = match.params.id;
        await axios
            .get(`http://127.0.0.1:8000/api/kpisofEmp/${id}`)
            .then((res) => {
                setEmpKpis(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getEval = async (kpi_id) => {


        await axios
            .get(`http://127.0.0.1:8000/api/Evaluationkpis/${kpi_id}`)
            .then((res) => {
                setEmpEval(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    console.log("hi : " + i);


    const classes = useStyles();

    return (
        <>
            <Nav />



            <div className="main">

                <div className={classes.Title}>
                    <h1 >View Employee Kpi </h1>
                </div>
                <hr className={classes.hr} />

                <div className={classes.Wrapper}>

                    <Link to="/kpisempEv/add" className={classes.addCard}>
                        <Kpis_add title="Add Evaluations" />
                    </Link>

                    <div className={classes.empKpi}>



                        {Empkpis.map((Empkpis_data) => {

                            { i.push(Empkpis_data.id) }

                            return (

                                <div key={Empkpis_data.kpi_name} >

                                 <p> {Empkpis_data.kpi_name}</p>



                                </div>

                            );


                        })}


                        {
                            /* 
                            {
                                getEval(1),
    
                                EmpEval.map((Emp_eval_data) => {
    
                                    <div>
                                        <p>{Emp_eval_data.Date}</p>
                                    </div>
    
    
    
                                })
                            } */
                        }

                    </div>
                </div>

            </div>
            <LoginStatus />
        </>
    )
}
