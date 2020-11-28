import React, { Redirect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import clsx from 'clsx';
import { Button,
         Dialog,
         DialogActions,
         DialogContent,
         FormControl,
         Grid,
         IconButton,
         InputAdornment,
         InputLabel,
         Link,
         makeStyles,
         OutlinedInput,
         TextField,
         Typography,
         } from '@material-ui/core';
import {Visibility, VisibilityOff } from "@material-ui/icons";

const LoginForm = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
      });

      const useStyles = makeStyles((theme) => ({
        //   h2: {
        //       fontFamily: theme.fontFamily,
        //   },
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


      const [open, setOpen] = useState(false);
      const [submitted, setSubmitted] = useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleSignIn = (e) => {
        e.preventDefault()
        setOpen(false);
        console.log("email:  ", values.email, " password: ", values.password)
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
        e.preventDefault();
        console.log("Supposed to be redirecting to sign-up route.")
        // handleClose();
        return <Redirect to="/sign-up" />
        console.log("Supposed to be redirecting to sign-up route.")
      }
      const loginDemo = () => {}
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Login
                </Button>
                <Dialog open={open} style={{width:"100%"}} onClose={handleSignIn} aria-labelledby="form-dialog-title">
                    <div>
                         <img src="CadenceLogo.png" className={classes.img}></img>
                        <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Sign In
                        </Typography>
                    </div>

                <DialogContent style={{width:"100%"}}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid container item xs={10} >
                        </Grid>
                        <ValidatorForm
                                //ref="form"
                                onSubmit={handleSubmit}
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
                                    (submitted && 'Your have been signed in!')
                                    || (!submitted && 'Sign In')
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

                        </ValidatorForm>


                    </Grid>


                </DialogContent>

                </Dialog>
                </div>


    );
}

export default LoginForm;
