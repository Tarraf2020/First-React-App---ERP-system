import React, { useState } from 'react'
import Nav from "../../components/navbar/nav";
import { useHistory } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import LoginStatus from '../../services/Login_status'
import "./emp.css";




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

function Add_employee() {

  const history = useHistory();
  const classes = useStyles();
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');

  const addData = async (e) => {

    e.preventDefault();

    let empl = {
      firstname: Firstname,
      lastname: Lastname,
      email: Email,
      phone: Phone,
    };
    console.log(empl);


    await axios
      .post(`http://127.0.0.1:8000/api/employees`, empl)
      .catch((err) => {
        console.log(err);
      });

    history.push('/employees');

  };



  return (
    <>

      <Nav />

      <form onSubmit={addData} className=" main">

        <div className={classes.Title}>
          <h1 >Add Employee</h1>
        </div>
        <hr className={classes.hr} />

        <div className={classes.contentwrapper}>

          <div className={classes.firstLabelDiv}>
            <label for='firstname' className={classes.label}>First name</label>
            <input
              required
              autocomplete="off"
              className={classes.input}
              style={{ height: '20px' }}
              type="text"
              name="firstName"
              value={Firstname}
              placeholder="Firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className={classes.labeldivs}>
            <label for='Lastname' className={classes.label}>Last name</label>
            <input
              required
              autocomplete="off"
              className={classes.input}
              type="text"
              placeholder="Lastname"
              name="lastName"
              value={Lastname}
              onChange={(e) => setLastname(e.target.value)} />
          </div>

          <div className={classes.labeldivs}>
            <label for='Lastname' className={classes.label}  >Email </label>
            <input
              required
              autocomplete="off"
              className={classes.input}
              type="email"
              placeholder="email"
              name="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={classes.labeldivs}>
            <label for='phone' className={classes.label}  >phone </label>
            <input
              required
              className={classes.input}
              autocomplete="off"
              type="tel"
              placeholder="phone"
              minLength="8"
              maxLength="8"
              value={Phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)} 
              />
          </div>

          {/* <div className={classes.picdiv}>
            <label className={classes.label}  >picture </label>
            <button className={classes.picbtn} >Upload</button>
            <button className={classes.picbtn} >Remove</button>
          </div> */}

          <div className={classes.buttonDiv}>
            <button className={classes.btn} type='submit' >Add</button>
            <button className={classes.btn} onClick={() => { history.push("/employees") }}> Cancel</button>

          </div>



        </div>

      </form>
      <LoginStatus />
    </>

  );
}

export default Add_employee;