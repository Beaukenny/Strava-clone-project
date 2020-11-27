import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarUrl: '',
    showPassword: false,
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
      }
    }));
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const classes = useStyles();

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (

    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <div>
                <img src="CadenceLogo.png" className={classes.img}></img>
                <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Create Your Cadence Account
                </Typography>
            </div>
            <DialogContent>
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    <Grid container item xs={10} >
                        <FormControl fullWidth="true"  className={clsx(classes.root, classes.margin, classes.textField)}>
                            <InputLabel variant="outlined" >Username</InputLabel>
                            <OutlinedInput
                                value={values.username}
                                onChange={handleChange('username')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={10} >
                        <FormControl fullWidth="true" className={clsx(classes.root, classes.margin, classes.textField)}>
                            <InputLabel variant="outlined" >Email address</InputLabel>
                            <OutlinedInput
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={10} >
                        <FormControl className={clsx(classes.root, classes.margin, classes.textField)}>
                            <InputLabel variant="outlined" htmlFor="standard-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={10} >
                        <FormControl className={clsx(classes.root, classes.margin, classes.textField)}>
                            <InputLabel variant="outlined" htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item xs={10} >
                        <FormControl fullWidth="true"  className={clsx(classes.root, classes.margin, classes.textField)}>
                            <InputLabel variant="outlined" >Avatar URL</InputLabel>
                            <OutlinedInput
                                value={values.avatarUrl}
                                onChange={handleChange('avatarUrl')}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{justifyContent: "space-around"}}>
                <Button variant="contained"  onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained"   onClick={handleClose} color="primary">
                    Create Account
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    // <form onSubmit={onSignUp}>
    //   <div>
    //     <label>User Name</label>
    //     <input
    //       type="text"
    //       name="username"
    //       onChange={updateUsername}
    //       value={username}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       type="text"
    //       name="email"
    //       onChange={updateEmail}
    //       value={email}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       onChange={updatePassword}
    //       value={password}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Repeat Password</label>
    //     <input
    //       type="password"
    //       name="repeat_password"
    //       onChange={updateRepeatPassword}
    //       value={repeatPassword}
    //       required={true}
    //     ></input>
    //   </div>
    //   <button type="submit">Sign Up</button>
    // </form>
  );
};

export default SignUpForm;
