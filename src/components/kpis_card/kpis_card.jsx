import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Kpis_add from "./kpis_add";
import avatar from "../images/img_avatar.png";
import { Button } from '@material-ui/core';
import Pop_up from "./NewKpis_pop_up";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },

  Kpisbtn: {
    fontWeight: 'bold',
    color: '#F2F2F2 !important',
    fontSize: '0.8rem',
    padding: '10px 10px',
    borderRadius: '40px',
    border: ' 0px solid #3866A3',
    background: ' #FF821E',
    margin: '1%',
    lineHeight: '1',
    '&:hover': {
      background: '#d26d1d',
    }
  },

}));

function Card_kpis() {

  const [Employees, setEmployee] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [isblur, setIsblur] = useState(false);
  const classes = useStyles();




  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/employees?page=${page}`)
      .then((res) => {
        setEmployee(res.data.data);
        console.log(res);
        setTotal(Math.ceil(res.data.total / 7));

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const changePage = (e, value) => {
    setPage(value);
  }

  console.log(isblur);
  return (isblur) ? (
    <>
      <div className="flex_cards" style={{ opacity: "0.33" }}  >
        <div className="card_add" >
          <Link className="link"
            onClick={() => { setOpenDialog(true) }}
            onClick={() => { setIsblur(true) }}
            style={{ color: '#ff821e', fontWeight: 'bold' }}
          >
            <Kpis_add title="Add Kpis" />
          </Link>
        </div>

        {Employees.map((emp_data) => {
          return (
            <div className="card" key={emp_data.id}
              style={{ position: 'relative', paddingBottom: '24px', overflow: "hidden" }} >
              <Link className="link">
                <div className="card_img">
                  <img
                    className="card_emp"
                    src={avatar}
                    alt="logo img"
                    style={{ height: "150", width: "150", display: "block" }}

                  />
                </div>
                <h3>{emp_data.firstname}</h3>
                <Button className={classes.Kpisbtn} type="submit" > view Kpis </Button>
              </Link>
            </div>
          );
        })}
      </div>


      <div className={classes.root} style={{
        justifyContent: ' center',
        display: 'flex',
        alignItems: 'center',
        opacity: '0.33',
      }}>
        <Pagination
          count={total}
          color="primary"
          onChange={changePage}
        />
      </div>
      <Pop_up trigger={openDialog} setTrigger={setOpenDialog} setBlur={setIsblur} />
    </>
  ) : (

    <>


      <div className="flex_cards" style={{ opacity: '1' }} >
        <div className="card_add" >
          <Link className="link"
            onClick={() => { setOpenDialog(true); setIsblur(true); }}
            style={{ color: '#ff821e', fontWeight: 'bold' }}
          >
            <Kpis_add title="Add Kpis" />
          </Link>
        </div>

        {Employees.map((emp_data) => {
          return (
            <div className="card" key={emp_data.id} style={{ position: 'relative', paddingBottom: '24px', overflow: "hidden" }} >

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
              <Link className="link" to={`/kpisemp/${emp_data.id}`}>
                <Button className={classes.Kpisbtn}  > View Kpis </Button>
              </Link>
            </div>
          );
        })}
      </div>


      <div className={classes.root} style={{
        justifyContent: ' center',
        display: 'flex',
        alignItems: 'center',
        opacity: '1',
      }}>
        <Pagination
          count={total}
          color="primary"
          onChange={changePage}
        />
      </div>
      <Pop_up trigger={openDialog} setTrigger={setOpenDialog} setBlur={setIsblur} />
    </>
  );
}

export default Card_kpis;
