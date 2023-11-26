import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from "axios";
import LoginStatus from '../../services/Login_status';


const useStyles = makeStyles(theme => ({

    /* 
     set the wrapper container rules.
    */

    ContainerStyle: {

        position: 'fixed',
        top: '50%',
        left: '59%',
        transform: 'translate(-50%,-50%)',
        width: "30%",
        color: '#FFF',
        backgroundColor: '#1C73A5',
        textAlign: 'center',
        borderRadius: '33px',
        zIndex: '1',
        padding: '1.5rem',
        paddingBottom: '1.5rem',
        [theme.breakpoints.down('xs')]: {
            width: '10rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
        },


    },

    header: {

        backgroundColor: '#F1F1F1',
        height: '130px',
        position: 'relative',
        width: '100%',

    },

    // set the rule for labeles

    input_label: {
        display: 'block',
        margin: '1.5rem',
        fontFamily: 'ubuntu',
    },

    // set the rules for inputs

    input_place: {
        width: '100%',
        height: '1.5rem',
        border: '1px hidden',
        borderRadius: '20px',
        '&:focus': {
            outline: '0',
        }

    },



    // set the rules for button

    btns: {
        fontWeight: 'bold',
        color: '#F2F2F2 !important',
        fontSize: '0.8rem',
        padding: '10px 25px',
        borderRadius: '40px',
        border: ' 0px solid #3866A3',
        background: ' #FF821E',
        margin: ' 1%',
        lineHeight: '1',
        '&:hover': {
            background: '#D26D1D',

        }
    },

    // set the rule for the link

    fg_a: {
        color: '#707070',
        textDecoration: 'none',
        fontSize: '0.8rem',
    }


}))

export default function Pop_up(props) {

    const classes = useStyles();
    const [Kpi_, setKPI] = useState([]);
    const [Employees, setEmployee] = useState([]);
    const [empid, setEmpid] = useState(0);




    const getEmpData = () => {
        axios
            .get(`http://127.0.0.1:8000/api/employeeAll`)
            .then((res) => {
                setEmployee(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };




    useEffect(() => {
        getEmpData();
    }, []);

    const addData = async (e) => {


        e.preventDefault();

        let kpi = {
            kpi_name: Kpi_,
            employee_id: empid,
        };
        console.log(kpi);

        try {

            await axios

                .post(`http://127.0.0.1:8000/api/kpis`, kpi)
                .then(res => {
                    console.log(res);
                    if (res.data === 1) {
                        props.setTrigger(false);
                        props.setBlur(false);
                    } else {
                        alert('Make Sure You Are Not Using Duplicate Kpi');
                    }
                });

        } catch (error) {

            alert(
                "Make Sure You Are Not Using Duplicate Kpi \n" +
                "Else Programming Error!"
            );
            props.setTrigger(false);
            props.setBlur(false);
        }


    }

    return (props.trigger) ? (


        <Fragment>

            <Container className={classes.ContainerStyle}>

                <div style={{ backgroundColor: '#0073A5', maxWidth: '100%', position: "relative", }}>



                    <div action="" >
                        <form onSubmit={addData} >

                            <div>
                                <label className={classes.input_label} htmlFor="KPI">
                                    Create New Kpi
                                    <br />
                                    <br />
                                    <input
                                        required
                                        className={classes.input_place}
                                        type="text"
                                        name="Kpi"
                                        placeholder="  New Kpi"
                                        onChange={e => setKPI(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className={classes.input_label} htmlFor="EmployeeSelect" >
                                    Select Employee
                                    <br />
                                    <br />
                                    <select
                                        required
                                        name="EmployeeSelect"
                                        className={classes.input_place}
                                        onChange={e => setEmpid(e.target.value)}
                                    >
                                        <option value="">None</option>

                                        {Employees.map((emp_data) => {
                                            return (
                                                <option
                                                    value={emp_data.id}
                                                >{emp_data.firstname}
                                                </option>
                                            )
                                        })}
                                    </select>

                                </label>
                            </div>


                            <div>
                                <Button className={classes.btns} type="submit" >Save</Button>
                                <span style={{ display: "inline-block", width: "5rem" }}>      </span>

                                <Button className={classes.btns} onClick={() => { props.setTrigger(false); props.setBlur(false); }} >Cancel</Button>
                            </div>

                        </form>
                    </div>
                </div>
            </Container>

            <LoginStatus />

        </Fragment>

    ) : "";
}
