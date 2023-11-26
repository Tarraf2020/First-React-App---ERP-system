import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import avatar from "../images/img_avatar.png";
import AddCard from "../addCard";
import "./admin.css";




const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),


    },
  },
}));


function Admin_card() {


  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [Admins, setAdmins] = useState([]);

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/admins/?page=${page}`)
      .then((res) => {
        setAdmins(res.data.data);
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


  return (

    <>
      <div className="flex_cards">
        <AddCard title="Add Admins" route="/admins/add" />
        {Admins.map((admin) => {
          return (
            <div className="card" key={admin.id} style={{ position: 'relative',overflow:"hidden" }} >
              <Link
                style={{ backgroundColor: '#F27F1C', color: '#fff', padding: '4.5px',paddingLeft:'8.5px' ,borderTop: '0', position: 'absolute', top: '0', right: '0', borderTopRightRadius:'40% 28%', cursor: 'pointer' }}
                className="link"
                to={`/admins/${admin.id}`}>
                <i class="fas fa-pencil-alt"></i>
              </Link>

              <div className="card_img">
                <img
                  className="card_emp"
                  src={avatar}
                  alt="logo img"
                  height={150}
                  width={250}
                />
              </div>
              <h3>{admin.firstname}</h3>
              <p className="text_card">L : {admin.lastname}</p>
              <p className="text_card">E : {admin.email}</p>

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

export default Admin_card;
