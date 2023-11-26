import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import LoginStatus from '../../services/Login_status';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import Nav from '../../components/navbar/nav';



const useStyles = makeStyles(theme => ({
picbtn: {

    fontWeight: 'bold',
    color: '#F2F2F2 !important',
    width: '80px',
    height: '30px',
    fontSize: '0.8rem',
    borderRadius: '40px',
    border: ' 0px solid #3866A3',
    background: ' #F27F1C',
    margin: ' 2%',
    lineHeight: '0.5',
    '&:hover': {
      background: '#d26d1d',
      
    }


}

}))


export default function Teamempdata({ match }) {

    const history =useHistory();
    const [Projem, setProjem] = useState([]);
    const [Firstname, setFirstname] = useState([]);
    const [Lastname, setLastname] = useState([]);
    const [RoleEmp, setRoleEmp] = useState([]);
    const classes = useStyles();
    const id=match.params.id;
    
    const getprojEmp = () => {

        axios
            .get(`http://127.0.0.1:8000/api/proj_Emp/${id}`)
            .then((res) => {

                setProjem(res.data);
                // console.log(res.data);

            })

            .catch((err) => {
                console.log(err);
            })
    }


    const getData = () => {
        // const id = match.params.id;
        axios
            .get(`http://127.0.0.1:8000/api/employees/${id}`)
            .then((res) => {

                // console.log(res.data[0]);
                setFirstname(res.data[0].firstname);
                setLastname(res.data[0].lastname);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getroles = () => {
        const id = match.params.id;
        axios
            .get(`http://127.0.0.1:8000/api/roleEmp/${id}`)
            .then((res) => {
                setRoleEmp(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };





    useEffect(() => {
        getprojEmp();
        getData();
        getroles();
    }, []);


    return (

        <>
            <Nav />

            <div className="main">

                <div style={{ backgroundColor: "#1C73A5", width: "50%", margin: "0 auto", marginTop: "9%", overflow: "hidden", textAlign:"center" , borderRadius: "40px", color: "#fff", fontFamily: "ubuntu" }} >

                
                    <div  style={{color:"#F27F1C"}}>
                        <h1>{Firstname} <span style={{ display: "inline-block", width: "0.2rem" }}></span> {Lastname} </h1>
                    </div>


                    <div style={{ display: "flex",  justifyContent:"space-around"}}>
                        <div style={{display:"flex",flexDirection:"column" }} >
                        <h2>projects:</h2>

                        <div style={{display:'flex',flexDirection:"column"}}>
                            {
                                Projem.map((proj_data) => {

                                    return (
                                        
                                          
                                                <h5>{proj_data.project_name}</h5>
                                            
                                     
                                    );
                                })
                            }
                        </div>
                        {console.log(match.params.id)}
                       <Link to={`/teams/${match.params.teamid}`}>
                       <button className={classes.picbtn} style={{ marginTop: "25px" ,marginBottom:"25px",borderRadius:"40px", color:"#fff" , }}  >cancle</button>
                        </Link> 

                        </div>

                        <div style={{display:"flex",flexDirection:"column",}}>
                    <h2>Roles :</h2>
                    {
                        RoleEmp.map((RolesEmpdata) => {

                            return (
                                <>
                                    <ul>
                                        <h5>  {RolesEmpdata.role_name}</h5>
                                        {/* {console.log(RolesEmpdata.role_name)} */}
                                    </ul>
                                </>
                            )
                        })}
              </div>
                </div>

            </div>

            </div>
            < LoginStatus />
        </>

    )
}