import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from "axios";
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

function Edit_admins({ match }) {

  const history = useHistory();
  const classes = useStyles();
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');


  const getData = () => {
    const id = match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/admins/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setFirstname(res.data[0].firstname);
        setLastname(res.data[0].lastname);
        setEmail(res.data[0].email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = async (e) => {

    e.preventDefault();

    const id = match.params.id;

    let admins = {
      firstname: Firstname,
      lastname: Lastname,
      email: Email,
      password: Password,
    };


    await axios
      .put(`http://127.0.0.1:8000/api/admins/${id}`, admins)
      .catch((err) => {
        console.log(err);
      });
    history.push('/admins');

  }

  const DeleteData = async () => {

    const id = match.params.id;

    await axios
      .delete(`http://127.0.0.1:8000/api/admins/${id}`)
      .then(res => {
        if (res.data === 1) {
          history.push('/admins')
        } else {
          alert('Something Went Wrong');
        }
      });



  }


  return (
    <>

      <Nav />

      <form onSubmit={updateData} className=" main">


        <div className={classes.Title} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <h1>Edit Admins</h1>
          <button style={{ marginTop: "25px" }} className={classes.picbtn} onClick={() => { history.push("/employees") }}>cancle</button>
        </div>

        <hr className={classes.hr} />

        <div className={classes.contentwrapper}>

          <div className={classes.firstLabelDiv}>
            <label for='firstname' className={classes.label}>First name</label>
            <input
              required
              className={classes.input}
              style={{ height: '20px' }}
              type="text"
              name="firstName"
              value={Firstname}
              placeholder="Firstname"
              onChange={(e) => setFirstname(e.target.value)} />
          </div>

          <div className={classes.labeldivs}>
            <label for='Lastname' className={classes.label}>Last name</label>
            <input
              required
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
              className={classes.input}
              type="email"
              placeholder="email"
              name="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={classes.labeldivs}>
            <label for='password' className={classes.label}  >Password </label>
            <input
              className={classes.input}
              type="text"
              placeholder="password"
              maxLength="8"
              value={Password}
              name="password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>

{/* 
          <div className={classes.picdiv}>
            <label className={classes.label}  >picture </label>
            <button className={classes.picbtn}>Upload</button>
            <button className={classes.picbtn}>Remove</button>
          </div> */}



          <div className={classes.buttonDiv}>
            <button className={classes.btn} type="submit">Update</button>
            <button className={classes.btn} onClick={DeleteData}><i className="fas fa-trash-alt"></i> Delete</button>
          </div>



        </div>

      </form>
      <LoginStatus />
    </>

  );
}

export default Edit_admins;

