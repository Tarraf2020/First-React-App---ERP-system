import React, { useState, useEffect } from "react";
import axios from "axios";
// import AddCard from "../addCard";
import Kpis_add from "../kpis_card/kpis_add";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import avatar from "../images/img_team.png";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Team_pop from "./Teams_pop_up";


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
        margin: '1rem',
        lineHeight: '1',
        '&:hover': {
            background: '#d26d1d',
        }
    },


}));


export default function Team_card() {

    const [Teams, setTeams] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [openD, setOpenD] = useState(false);
    const [isblr, setIsblr] = useState(false);
    const classes = useStyles();


    const getData = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/teams?page=${page}`)
            .then((res) => {
                setTeams(res.data.data);
                // console.log(res.data);
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


    return (isblr) ? (
        <>


            <div className="flex_cards" style={{ opacity: "0.33" ,filter:"blur(0.75rem)" }}>

                <div className="card_add" >

                    <Link className="link"

                        onClick={() => { setIsblr(true); setOpenD(true) }}

                        style={{ color: '#ff821e', fontWeight: 'bold', opacity: "0.33" ,filter:"blur(0.75rem)"}}
                    >
                        <Kpis_add title="Add Teams" />
                    </Link>
                </div>
                {console.log("hey " + openD + " hhhhhh " + isblr)

                }

                {Teams.map((team_data) => {
                    return (
                        <div className="card" key={team_data.id} style={{padding:"1.5rem",paddingRight:"auto",paddingLeft:"auto",}} >
                            <Link className="link" to={`/teams/${team_data.id}`}>
                                <div 
                                className="card_img"
                                >
                                    <img
                                        className="card_team"
                                        src={avatar}
                                        alt="logo img"
                                    />
                                </div>
                                <h3>{team_data.team_name}</h3>
                                <Button className={classes.Kpisbtn} type="submit" > Details </Button>

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

            <Team_pop Trigger={openD} setTriger={setOpenD} setBlr={setIsblr} />

        </>
    ) : (
        <>


            <div className="flex_cards">

                <div className="card_add" >

                    <Link className="link"
                        onClick={() => { setIsblr(true); setOpenD(true) }}
                        style={{ color: '#ff821e', fontWeight: 'bold' }}
                    >
                        <Kpis_add title="Add Teams" />
                    </Link>
                </div>
              

                {Teams.map((team_data) => {
                    return (
                        <div className="card" key={team_data.id} style={{ paddingTop:"1.5rem",paddingRight:"auto",paddingLeft:"auto",paddingBottom:"2.5rem",}} >
                            <Link className="link" to={`/teams/${team_data.id}`}>
                                <div className="card_img">
                                    <img
                                        className="card_team"
                                        src={avatar}
                                        alt="logo img"
                                        height={150}
                                        width={250}
                                    />
                                </div>
                                <h3>{team_data.team_name}</h3>
                                <Button className={classes.Kpisbtn} type="submit" > Details </Button>
                            </Link>
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

            <Team_pop Trigger={openD} setTriger={setOpenD} setBlr={setIsblr} />

        </>
    )
}

