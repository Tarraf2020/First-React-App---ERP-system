import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import AddCard from "../addCard";
import avatar from "../images/img_avatar.png";
import "./style.css";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),


    },
  },
}));

function Card_employee(props) {

  const [Employees, setEmployee] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const classes = useStyles();


let reqBody = {Search:props.search,page};

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/employees?page=${page}`)
      .then((res) => {
        const result=res.data.data;
        if(props.search==""){
        setEmployee(res.data.data);
        }else{
          let newRes=result.filter(em=>
            ( (em.firstname+" "+em.lastname).slice(0,props.search.length)).toLowerCase()==props.search.toLowerCase()
            );
            setEmployee(newRes);
        }
        // console.log('a');
        setTotal(Math.ceil(res.data.total / 7));

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [JSON.stringify(reqBody)]);

  const changePage = (e, value) => {
    setPage(value);
  }

  return (
    <>
      <div className="flex_cards"  >
        <AddCard title="Add Employee" route="/employees/add" />
        {Employees.map((emp_data) => {
          return (
            <div className="card" key={emp_data.id}  style={{position:'relative' ,overflow:"hidden"}} >
              <Link
                style={{ backgroundColor: '#F27F1C', color: '#fff', padding: '4.5px',paddingLeft:'8.5px' ,borderTop: '0', position: 'absolute', top: '0', right: '0', borderTopRightRadius:'40% 28%',}}
                className="link"
                to={`/employees/${emp_data.id}`}>
                <i class="fas fa-pencil-alt"></i>
                </Link>

                <div className="card_img">
                  <img
                    className="card_emp"
                    src={avatar}
                    alt="logo img"
                    height={250}
                    width={250}
                  />
                </div>
                <h3>{emp_data.firstname}</h3>
                <p className="text_card">M : {emp_data.phone}</p>
                <p className="text_card">E : {emp_data.email}</p>





            </div>



          );
        })}


      </div>


      <div className={classes.root} style={{
        justifyContent: ' center',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Pagination
          count={total}
          color="primary"
          onChange={changePage}
        />
      </div>

    </>
  );
}

export default Card_employee;
