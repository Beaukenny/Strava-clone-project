import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { login } from "../../services/auth";
import Alert from '@material-ui/lab/Alert';
import { Button,
         Dialog,
         DialogContent,
         Grid,
         Link,
         makeStyles,
         Typography,
         } from '@material-ui/core';

const LoginForm = ({ authenticated, setAuthenticated }) => {

    const [values, setValues] = useState({
        email: '',
        password: ''
      });
    const [open, setOpen] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState();
    const useStyles = makeStyles((theme) => ({
        MuiGrid: {
            width: "80%"
        },
        MuiDialogActions: {
            justifyContent: "space-around"
        },
        img: {
            display: "block",
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        root: {
            color: theme.primary,
            input: {
                textAlign: "center"
            },
            width: "100%",
            justifyContent: 'space-between'
        },
    }));
    const classes = useStyles();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSignIn = async (e) => {
        if (e) { e.preventDefault()};
        const user = await login(values.email, values.password);
        if (!user.errors) {
        //   setAuthenticated(true);
        // console.log(setAuthenticated)
          setOpen(false);
          setValues({['email']:''});
          setValues({['password']:''});
          setErrors('');
          window.localStorage.setItem("currentUser",user.id)
        //   return <Redirect to="/" />
        window.location.href="/workouts"
        } else {
          setErrors(user.errors);
        }
    };

    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        setSubmitted(true , () => {
            setTimeout(() => setSubmitted(false), 5000);
        });
    }
    const goToSignUp = (e) => {
        e.preventDefault()
        return <Redirect to="/sign-up" />
      }



    const loginDemo = async () => {
        const user = await login('demo@demo.com', 'appacademy');
        if (!user.errors) {
        //   setAuthenticated(true);
          setOpen(false);
          setValues({['email']:''});
          setValues({['password']:''});
          setErrors('')
          //return <Redirect to="/" />
          window.localStorage.setItem("currentUser",user.id)
          window.location.href="/workouts"
        } else {
          setErrors(user.errors);
        }
    };
    if(window.localStorage.getItem("currentUser")){
        window.location.replace("/workouts")
    }

        return (
            <div>

                <Dialog open={open} style={{width:"100%"}} onClose={handleSignIn} aria-labelledby="form-dialog-title">
                    <div>
                         <img src={`https://cadenceappacademy.s3.amazonaws.com/CadenceLogo.png`} className={classes.img}></img>
                        <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Sign In
                        </Typography>
                    </div>

                { errors ? <div className={classes.root}><Alert severity="error">{errors}</Alert></div> : null}

                <DialogContent style={{width:"100%"}}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid container item xs={10} >

                        </Grid>
                        <ValidatorForm
                                //ref="form"
                                onSubmit={handleSignIn}
                                style={{width:"75%", justifyContent:"center"}}
                            >
                            <TextValidator
                                variant="outlined"
                                label="Email"
                                onChange={handleChange('email')}
                                name="email"
                                value={values.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                style={{width:"100%", justifyContent:"center"}}
                            />
                            <br />
                            <TextValidator
                                variant="outlined"
                                label="Password"
                                onChange={handleChange('password')}
                                name="password"
                                value={values.password}
                                type= {"password"}
                                style={{width:"100%", justifyContent:"center"}}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <br />
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={submitted}
                                style={{display:"block", marginLeft:"auto", marginRight:"auto"}}
                            >
                                {
                                    'Sign In'
                                }
                            </Button>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid container item xs={10} justify="center">
                                    <Typography  style={{marginTop:"40px", marginBottom:"40px"}} align="center" color="primary" >
                                    <Link href="/sign-up" >Create your Cadence account</Link>
                                    </Typography>
                                    <Button variant="contained" style={{marginBottom:"20px", alignItems:"flex-end"}} onClick={loginDemo} color="primary">Demo Login</Button>
                                </Grid>

                            </Grid>
                            <Button
                                color="primary"
                                variant="contained"
                                type="button"
                                className="cancel"
                                value="Submit without validation"
                                onClick={e => window.location.href="/"}
                                style={{marginTop:"20px", justifyContent:"flex-end", marginBottom:"20px", marginLeft:"auto", marginRight:"auto"}}
                            >
                                {
                                    ('Cancel')
                                }
                            </Button>
                        </ValidatorForm>


                    </Grid>


                </DialogContent>

                </Dialog>
                </div>


    );
}

export default LoginForm;
