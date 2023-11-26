import React, { useState, Fragment, } from 'react';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CookieService from '../../services/CookieService';


const useStyles = makeStyles(theme => ({

    /* 
     set the wrapper container rules.
    */

    ContainerStyle: {

        // position is absolute to let the div change depending on the whole scrren
        position: 'absolute',

        // height 100% to make cover all the screen vericaly
        height: '100%',

        /* maxwidth 100% it's because material ui come with  standard maxWidth 
           so our div width will be affected and not cover all the screen 
           to avoid that we put our maxWidth=100% so it's limited by the screen size
          */
        maxWidth: '100%',

        // text color 
        color: '#FFF',

        // the background Color
        backgroundColor: '#0073A5',

        // center all element horisontaly
        textAlign: 'center',

        // padding : 0% will make the header fill  the screen totaly horisontaly
        padding: '0%',

        // set a fontFamily for the elemnts of the  container


    },



    /* set the the background-color of the header part 
       set the height and  center elements horisontaly.
       set the position relative because we will center the logo verticaly later
    */
    header: {

        backgroundColor: '#F1F1F1',
        height: '130px',
        position: 'relative',
        width: '100%',

    },

    //  center the logo verticaly

    CenterLogo: {
        position: ' absolute',
        top: ' 50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    // set a specific fontFamily to override the standards of typography
    // some margin from the top to create space , also make the font bold

    Loginword: {
        marginTop: '5rem',
        marginBottom: '1.5rem',
        fontFamily: 'Ubuntu ',
        fontSize: '1rem',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            marginTop: '1.5rem',
            paddingBottom: '0.5rem',
        },
    },

    // set the design for the login box

    login_box: {
        backgroundColor: '#F1F1F1',
        borderRadius: '33px',
        width: '19rem',
        maxWidth: '100%',
        padding: '3.5rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        margin: '0 auto',
        // boxShadow: '0.1px 0.1px 10px #141617',
        [theme.breakpoints.down('md','xs')]: {
            width: '10rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
        },
    },


    // set the rule for labeles

    input_label: {
        display: 'block',
        margin: '1.5rem',
    },

    // set the rules for inputs

    input_place: {
        width: '100%',
        height: '1.5rem',
        border: '1px hidden',
        borderRadius: '20px',
        '&:focus': {
            outline: '0',
        }

    },



    // set the rules for button

    lgbtn: {
        fontWeight: 'bold',
        color: '#F2F2F2 !important',
        fontSize: '0.8rem',
        padding: '10px 25px',
        borderRadius: '40px',
        border: ' 0px solid #3866A3',
        background: ' #FF821E',
        margin: ' 1%',
        lineHeight: '1',
        '&:hover': {
            background: '#d26d1d',
        }
    },

    // set the rule for the link

    fg_a: {
        color: '#707070',
        textDecoration: 'none',
        fontSize: '0.8rem',
    }


}))

export default function SignIn() {

    let history = useHistory();
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submit = async (e) => {

        e.preventDefault();
        let body = new FormData();
        let email1 = email;
        let password1 = password;

        body.append('email', email1);
        body.append('password', password1);
        console.log(email1);
        try {

            let res = await fetch('http://127.0.0.1:8000/api/auth/login', {
                method: 'post', body,
            });
            let result = await res.json();
            console.log(result);

            if (result.access_token) {
                // expires:(new Date(Date.now()+1))
                const options = { path: '/', };
                CookieService.set('access_token', result.access_token, options)
                history.push('/employees');
                console.log(result);
            } else {
                alert('Unauthorized');
            }
        }
        catch (e) {
            alert(e);
        }

    }



    return (

        <Fragment>

            <Container className={classes.ContainerStyle}>

                <div className={classes.header}>
                    <img className={classes.CenterLogo} src='/Dotech_Logo.png' alt="" />
                </div>

                <div style={{backgroundColor:'#0073A5'}}>
                    <Typography variant="h4" className={classes.Loginword}>
                        LOGIN
                    </Typography>

                    <div action="" className={classes.login_box}>
                        <form onSubmit={submit}>

                            <div>
                                <label className={classes.input_label} htmlFor="Email">
                                    <input
                                        required
                                        className={classes.input_place}
                                        type="email"
                                        name="email"
                                        placeholder="ali@gmail.com"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div>
                                <label className={classes.input_label} htmlFor="password">
                                    <input
                                        required
                                        className={classes.input_place}
                                        type="password" name="password"
                                        placeholder="123"
                                        onChange={e => setPassword(e.target.value)} />
                                </label>
                            </div>


                            <div>

                                <Button className={classes.lgbtn} type="submit" >Login</Button>

                            </div>

                        </form>

                    </div>


                </div>
            </Container>


        </Fragment>


    )
}

