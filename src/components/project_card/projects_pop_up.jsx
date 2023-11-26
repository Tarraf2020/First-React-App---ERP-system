import React, { useState, Fragment } from 'react';
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

export default function Project_up(props) {

    const classes = useStyles();
    const [Project_, setProject] = useState([]);
  



    const addData = async (e) => {


        e.preventDefault();

        let project = {
            project_name: Project_,
        };
        console.log(project);

        try {

            await axios

                .post(`http://127.0.0.1:8000/api/projects`, project)
                .then(res => {
                    console.log(res);
                    if (res.data === 1) {
                        props.setTriger(false);
                        props.setBlr(false);
                        window.location.reload();
                    } else {
                        alert('Make Sure You Are Not Using Duplicate Projects');
                        props.setTriger(false);
                        props.setBlr(false);
                    }
                });

        } catch (error) {

            alert(
                "Make Sure You Are Not Using Duplicate Projects"
            );
            props.setTriger(false);
            props.setBlr(false);
        }


    }

    return (props.Trigger) ? (


        <Fragment>

            <Container className={classes.ContainerStyle}>

                <div style={{ backgroundColor: '#0073A5', maxWidth: '100%', position: "relative", }}>



                    <div action="" >
                        <form onSubmit={addData} >

                            <div>
                                <label className={classes.input_label} htmlFor="Team">
                                    Add New Project
                                    <br />
                                    <br />
                                    <input
                                        required
                                        className={classes.input_place}
                                        type="text"
                                        name="Project"
                                        placeholder="  New Project"
                                        onChange={e => setProject(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div>
                                <Button className={classes.btns} type="submit" >Add</Button>
                                <span style={{ display: "inline-block", width: "5rem" }}>  </span>
                                <Button className={classes.btns} onClick={() => { props.setTriger(false); props.setBlr(false); }} >Cancel</Button>
                            </div>

                        </form>
                    </div>
                </div>
            </Container>

            <LoginStatus />

        </Fragment>

    ) : "";
}
