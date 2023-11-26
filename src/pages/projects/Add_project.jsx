import React, { useState } from 'react'
import Nav from "../../components/navbar/nav";
import { useHistory } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import LoginStatus from '../../services/Login_status'




const useStyles = makeStyles((theme) => ({

    // make the title alone  
    Title: {
        display: 'block',

    },

    // make the style to the line under the title
    hr: {
        border: ' 0',
        height: ' 1px',
        background: 'grey',

    },

    // make style to the div that wrap the majority of our content

    contentwrapper: {

        display: 'grid',
        gridTemplateRows: ' auto auto auto auto auto auto',
        gridTemplateColumns: ' auto auto auto',
        color: '#707070'

    },

    //make style to the div that contain the first label

    firstLabelDiv: {
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: '30% 25%',
        gridColumn: '1/3',
    },


    // make style to all divs that contain label

    labeldivs: {
        display: 'grid',
        gridTemplateColumns: '30% 25%  ',
        marginBottom: '1.5rem',
        gridColumn: '1/3',
    },

    // make the standards of labels

    label: {
        //style of mobile screen 
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        }
    },

    // make the standard of inputs field 

    input: {
        width: '100%',
        height: '1.5rem',
        border: '1px hidden',
        borderRadius: '20px',
        paddingLeft: '25px',
        '&:focus': {
            outline: '0',
        }
    },


    // make the style of div pic
    picdiv: {
        display: 'grid',
        gridTemplateColumns: '30% 15% 10%  ',
        marginBottom: '1.5rem',
        gridColumn: '1/3',

    },

    // make the style of pic button

    picbtn: {

        fontWeight: 'bold',
        color: '#F2F2F2 !important',
        width: '80px',
        height: '30px',
        fontSize: '0.8rem',
        borderRadius: '40px',
        border: ' 0px solid #3866A3',
        background: ' #28A0E6',
        margin: ' 2%',
        lineHeight: '0.5',
        '&:hover': {
            background: '#44BDF2',
        }


    },

    // make style to the div of buttons

    buttonDiv: {
        gridColumn: '3/4',
        display: ' flex',
        flexDirection: 'column',
        alignItems: ' center',
        justifyContent: 'flex-end',
        gridRow: '1/1',
        position: 'relative',
        top: '1.9rem',
    },

    // make style to  the first button

    btn: {

        fontWeight: 'bold',
        color: '#F2F2F2 !important',
        width: '80px',
        height: '30px',
        fontSize: '0.8rem',
        borderRadius: '40px',
        border: ' 0px solid #3866A3',
        background: ' #FF821E',
        margin: ' 2%',
        lineHeight: '0.5',
'&:hover': {
            background: '#d26d1d',
        }
    },

}));

function Add_project() {

    const history = useHistory();
    const classes = useStyles();
    const [Projectname, setProjectname] = useState('');


    const addData = async () => {


        let proj = {
            projectname: Projectname,

        };

        await axios
            .post(`http://127.0.0.1:8000/api/projects`, proj)
            .catch((err) => {
                console.log(err);
            });

        history.push('/projects');

    };

    return (
        <>
            <Nav />

            <div className=" main">

                <div className={classes.Title}>
                    <h1 >Add Project</h1>
                </div>
                <hr className={classes.hr} />

                <div className={classes.contentwrapper}>

                    <div className={classes.firstLabelDiv}>
                        <label for='projectname' className={classes.label}>Create New Project</label>
                        <input
                            className={classes.input}
                            style={{ height: '20px' }}
                            type="text"
                            name="projectName"
                            value={Projectname}
                            placeholder="New Project"
                            onChange={(e) => setProjectname(e.target.value)}
                        />
                    </div>

                    <div className={classes.buttonDiv}>
                        <button className={classes.btn} onClick={() => addData()}>Save</button>
                        <button className={classes.btn} onClick={() => { history.push("/projects") }}> Cancel</button>

                    </div>



                </div>

            </div>
            <LoginStatus />
        </>

    );
}

export default Add_project;