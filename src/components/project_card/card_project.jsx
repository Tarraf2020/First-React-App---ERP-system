import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import Kpis_add from "../kpis_card/kpis_add";
import project_icon from "../images/project_icon.png";
import Project_pop from "./projects_pop_up";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import "../employee_card/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Card_project() {

  const [Projects, setProject] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [openD, setOpenD] = useState(false);
  const [isblur, setIsblur] = useState(false);

  const history=useHistory();
  const classes = useStyles();

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/projects?page=${page}`)
      .then((res) => {
        setProject(res.data.data);
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
  };



  return (isblur) ? (

    <>
      <div className="flex_cards" style={{ opacity: "0.33", filter: "blur(0.75rem)" }}>
        <div className="card_add"  >
          <Link className="link"
            onClick={() => { setIsblur(true); setOpenD(true) }}

            style={{

              color: '#ff821e', fontWeight: 'bold',
              opacity: "0.33", filter: "blur(0.75rem)"
            }}

          >
            <Kpis_add title="Add Project" />

          </Link>
        </div>

        {Projects.map((project_data) => {
          return (
            <div
              className="card"
              key={project_data.id}
              style={{ position: "relative" }}
            >
              <Link
                style={{
                  backgroundColor: "#F27F1C",
                  color: "#fff",
                  padding: "4.5px",
                  paddingLeft: "8.5px",
                  borderTop: "0",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  borderTopRightRadius: "40% 28%",
                }}
                className="link"
                to={`/projects/${project_data.id}`}
              >
                <i class="fas fa-pencil-alt"></i>
              </Link>
              <div className="card_img">
                <img
                  className="card_projct"
                  src={project_icon}
                  alt="project icon"
                  height={250}
                  width={250}
                />
                
              </div>
              <h3>{project_data.project_name}</h3>

              <button className="prjct_butn"
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  width: '80px',
                  height: ' 30px',
                  fontSize: '0.8rem',
                  border: ' 0px solid #3866A3',
                  background: '#FF821E',
                  margin: '2%',
                  lineHeight: '0.5',
                  borderRadius: '40PX',
                }}


              //  className="btn_projct"
              >
                View Team
              </button>
            </div>
          );
        })}
      </div>

      <div
        className={classes.root}
        style={{
          justifyContent: " center",
          display: "flex",
          alignItems: "center",
          opacity: '0.33',

        }}
      >
        <Pagination count={total} color="primary" onChange={changePage} />
      </div>
      <Project_pop Trigger={openD} setTriger={setOpenD} setBlr={setIsblur} />
    </>
  ) : (
    <>
      <div className="flex_cards">
        <div className="card_add"  >

          <Link className="link"
            onClick={() => { setIsblur(true); setOpenD(true) }}

            style={{

              color: '#ff821e', fontWeight: 'bold',
              // opacity: "0.33" ,filter:"blur(0.75rem)"
            }}

          >
            <Kpis_add title="Add Project" />

          </Link>
        </div>

        {Projects.map((project_data) => {
          return (
            <div

              className="card"
              key={project_data.id}
              style={{ position: "relative", }}
            >

              <div className="card_img">
                <img
                  className="card_projct"
                  src={project_icon}
                  alt="project icon"
                  height={250}
                  width={250}
                />
              </div>
              <h3>{project_data.project_name}</h3>

              <Button
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  width: '80px',
                  height: ' 30px',
                  fontSize: '0.6rem',
                  border: ' 0px solid #3866A3',
                  background: '#FF821E',
                  margin: '2%',
                  lineHeight: '0.5',
                  borderRadius: '40PX',

                }}

                onClick={()=>{history.push(`teamsprojects/${project_data.id}`)}}
              //  className="btn_projct"
              >
                View Team
              </Button>
            </div>
          );
        })}
      </div>

      <div
        className={classes.root}
        style={{
          justifyContent: " center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pagination count={total} color="primary" onChange={changePage} />
      </div>
      <Project_pop Trigger={openD} setTriger={setOpenD} setBlr={setIsblur} />
    </>
  )
}

export default Card_project;
