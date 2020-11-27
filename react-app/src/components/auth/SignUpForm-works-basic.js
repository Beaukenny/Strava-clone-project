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

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    //   h2: {
    //       fontFamily: theme.fontFamily,
    //   },
      img: {
          display: "block",
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto"
      },
      root: {
          color: theme.primary
      }
    }));

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
        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="name"
          label="User name"
          type="text"
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="dense"
          id="name"
          label="Confirm Password"
          type="password"
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="dense"
          id="name"
          label="Avatar URL"
          type="text"
          fullWidth
        />
        </DialogContent>
        <DialogActions>
        <Button variant="contained" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose} color="primary">
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
