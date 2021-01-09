import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { Button,
         Dialog,
         DialogContent,
         Grid,
         makeStyles,
         Typography,
         } from '@material-ui/core';
import { signUp } from '../../services/auth';




const SignUpForm = ({authenticated, setAuthenticated}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        avatar_url: ''
      });
      const [open, setOpen] = useState(true);
      const [submitted, setSubmitted] = useState(false);
      const [errors, setErrors] = useState('');

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

      if (authenticated) {
        return <Redirect to="/" />;
      }
    const handleSignIn = (e) => {
        e.preventDefault()
        setOpen(false);
      };

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const onSignUp = async (e) => {
        e.preventDefault();
        if (values.password === values.confirmPassword) {
          const user = await signUp(values.username, values.email, values.password, values.avatar_url);
          if (!user.errors) {
            // setAuthenticated(true);
            setSubmitted(true)
            setOpen(false)
            setErrors('');
          window.localStorage.setItem("currentUser",user.id)
        window.location.replace("/workouts")

          } else {
              setErrors(user.errors);
        }

      } else {
          console.log("Error:  passwords did not match!")
      }};

      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          const len = value.length
          const pwdPortion = values.password.substring(0,len);
          if (value === pwdPortion) {
              return true;
          } else {
              return false;
          }
      });

      if(window.localStorage.getItem("currentUser")){
        window.location.replace("/workouts")
    }
    return (
            <div>
                {/* <Dialog open={open} style={{width:"100%"}} onClose={handleSignIn} aria-labelledby="form-dialog-title"> */}
                <Dialog open={open} style={{width:"100%"}}  aria-labelledby="form-dialog-title">
                    <div>
                         <img src='https://cadenceappacademy.s3.amazonaws.com/CadenceLogo.png' className={classes.img}></img>
                        <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Create Your Cadence Account
                        </Typography>
                    </div>

                <DialogContent style={{width:"100%"}}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid container item xs={10} >
                        </Grid>
                        <div className={classes.root}>
                        { errors ? <Alert severity="error">{errors}</Alert> : <div></div> }
                        </div>
                        <ValidatorForm
                                //ref="form"
                                onSubmit={onSignUp}
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
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={['this field is required', 'passwords do not match']}
                            />
                            <br />
                            <TextValidator
                                variant="outlined"
                                label="Avatar Url"
                                onChange={handleChange('avatar_url')}
                                name="avatar_url"
                                value={values.avatar_url}
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
                                    (submitted && 'You have been signed in!')
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
