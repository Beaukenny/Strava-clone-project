import React, { Redirect, useState, useEffect } from 'react';
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
import {PinDropSharp, Visibility, VisibilityOff } from "@material-ui/icons";

const SignUpForm = ({initOpen, authenticated, setAuthenticated}) => {

    const [values, setValues] = useState({
        email: '',
        password: ''
      });
      const [disableInput, setDisableInput] = useState(false);

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


      const [open, setOpen] = useState(initOpen);
      const [submitted, setSubmitted] = useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };
      console.log("Open is set to:  ", open, " and initOpen is:  ", initOpen);
        useEffect(() => {
            console.log("initOpen:  ", initOpen);
            setOpen(initOpen);
            return () => {
                setOpen(true);
                console.log("UseEffect ran ... open is:  ", open);
              };
        },[])
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
    const handleClose = () => {
        console.log("Cancelled...")
        setOpen(false)
        return <Redirect to="/" />
      };
    const goToSignUp = (e) => {
        e.preventDefault();
        console.log("Supposed to be redirecting to sign-up route.")
        // handleClose();
        return <Redirect to="/sign-up" />

      }
      const loginDemo = () => {}

return (
            <div>
                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Sign Up
                </Button> */}
                <Dialog open={open} style={{width:"100%"}} onClose={handleSignIn} aria-labelledby="form-dialog-title">
                    <div>
                         <img src="CadenceLogo.png" className={classes.img}></img>
                        <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Create Your Cadence Account
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
                            <br />
                            <TextValidator
                                variant="outlined"
                                label="User Name"
                                onChange={handleChange('username')}
                                name="username"
                                value={values.username}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                style={{width:"100%", justifyContent:"center"}}
                            />
                            <br />
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
                            <TextValidator
                                variant="outlined"
                                label="Confirm Password"
                                onChange={handleChange('confirmPassword')}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                type= {"password"}
                                style={{width:"100%", justifyContent:"center"}}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <br />
                            <TextValidator
                                variant="outlined"
                                label="Avatar Url"
                                onChange={handleChange('avatarUrl')}
                                name="avatarUrl"
                                value={values.avatarUrl}
                                style={{width:"100%", justifyContent:"center"}}
                            />
                             <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid container item xs={10} >
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                style={{marginTop:"20px", justifyContent:"flex-start", marginBottom:"20px", marginLeft:"auto", marginRight:"auto"}}
                            >
                                {
                                    (submitted && 'Your have been signed in!')
                                    || (!submitted && 'Create Account')
                                }
                            </Button>
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
                            </Grid></Grid>
                        </ValidatorForm>
                    </Grid>
                </DialogContent>
                </Dialog>
                </div>



    );


}

export default SignUpForm;
