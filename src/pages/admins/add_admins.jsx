import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import LoginStatus from '../../services/Login_status';
import Nav from "../../components/navbar/nav";
import "../../components/employee_card/style.css";


const useStyles = makeStyles(theme => ({

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





}))

export default function Add_admins() {

    const history = useHistory();
    const classes = useStyles();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const addData = async (e) => {

        e.preventDefault();


        let body = new FormData();

        let firstname1 = firstname;
        let lastname1 = lastname;
        let email1 = email;
        let password1 = password;

        body.append('lastname', lastname1);
        body.append('firstname', firstname1);
        body.append('email', email1);
        body.append('password', password1);


        try {

            let res = await fetch('http://127.0.0.1:8000/api/auth/register', {
                method: 'post', body,
            });
            let result = await res.json();
            console.log(result);

            if (result) {
                console.log(result);
                history.push('/admins');
            } else {
                alert('something went wrong');
            }
        }
        catch (e) {
            alert(e);
        }

    }


    return (
        <>

            <Nav />

            <form onSubmit={addData} className=" main">

                <div className={classes.Title}>
                    <h1 >Add Admins</h1>
                </div>
                <hr className={classes.hr} />

                <div className={classes.contentwrapper}>

                    <div className={classes.firstLabelDiv}>
                        <label for='firstname' className={classes.label}>First name</label>
                        <input
                            required
                            autoComplete="off"
                            className={classes.input}
                            style={{ height: '20px' }}
                            type="text"
                            name="firstName"
                            value={firstname}
                            placeholder="Firstname"
                            onChange={e => setFirstname(e.target.value)} />
                    </div>

                    <div className={classes.labeldivs}>
                        <label for='Lastname' className={classes.label}>Last name</label>
                        <input
                            required
                            autoComplete="off"
                            className={classes.input}
                            type="text"
                            placeholder="Lastname"
                            name="lastName"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)} />
                    </div>

                    <div className={classes.labeldivs}>
                        <label for='Lastname' className={classes.label}  >Email </label>
                        <input
                            required
                            autoComplete="off"
                            className={classes.input}
                            type="email"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={classes.labeldivs}>
                        <label for='password' className={classes.label}  >Password </label>
                        <input
                            required
                            autoComplete="off"
                            className={classes.input}
                            type="text"
                            placeholder="password"
                            maxLength="10"
                            value={password}
                            name="password"
                            onChange={e => setPassword(e.target.value)} />
                    </div>
{/* 
                    <div className={classes.picdiv}>
                        <label className={classes.label}  >picture </label>
                        <button className={classes.picbtn} >Upload</button>
                        <button className={classes.picbtn} >Remove</button>
                    </div> */}

                    <div className={classes.buttonDiv}>
                        <button className={classes.btn} type="submit" >Add</button>
                        <button className={classes.btn} onClick={() => { history.push('/admins') }}>Cancel</button>

                    </div>



                </div>

            </form>
            <LoginStatus />
        </>

    );
}


