import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Nav from "../../components/navbar/nav";
import Team_icon from "../images/img_team.png";
import "../employee_card/style.css";

const useStyles = makeStyles((theme) => ({

  Kpisbtn: {

    fontWeight: 'bold',
    color: '#F2F2F2 !important',
    fontSize: '0.8rem',
    padding: '10px 10px',
    borderRadius: '40px',
    border: ' 0px solid #3866A3',
    background: ' #FF821E',
    margin: '1rem',
    lineHeight: '1',
    '&:hover': {
      background: '#d26d1d',
    }
  },

}));

function Teams_of_projects({ match }) {

  const [Teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [openD, setOpenD] = useState(false);
  const [isblur, setIsblur] = useState(false);

  const classes = useStyles();

  const getData = () => {
    const id = match.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/teamhavethisproject/${id}`)
      .then((res) => {
        setTeams(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);



  return (
    <>
      <Nav />
      <div className="flex_cards">


        {Teams.map((Team_data) => {
          // {console.log(Team_data)}
          return (
            <div

              className="card"
              key={Team_data.id}
              style={{ position: "relative", }}
            >

              <Link className="link" to={`/teams/${Team_data.team_id}`}>
                <div className="card_img">
                  <img
                    className="card_projct"
                    src={Team_icon}
                    alt="project icon"
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  />
                </div>
                <h3 style={{ marginBottom: "1.5rem" }}>{Team_data.team_name}</h3>
                <Button className={classes.Kpisbtn} type="submit" > Details </Button>
              </Link>

            </div>
          );
        })}
      </div>


    </>
  )
}

export default Teams_of_projects;
