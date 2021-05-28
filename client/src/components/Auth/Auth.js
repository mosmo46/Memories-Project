import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import Icon from "./icon";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Input from "./Input";
import {signin ,signup} from "../../actions/auth"

const initialState = {
  firstName: " ",
  lastName: " ",
  email: " ",
  password: " ",
  confirmPassword: " " 
};

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isSingUp, setIsSingUp] = useState(false);
  const [showPassword, setShowPassword] = useState( );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);


  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
      e.preventDefault();
console.log(formData);
      if(isSingUp){
    dispatch(signin(formData,history))
   }else{
    dispatch(signup(formData,history))

   }

    };
  
    const handleChange = (e) => {
   setFormData({...formData,[e.target.name]:e.target.value});
  };

  const switchMode = () => {
    setIsSingUp((prevIsSingUp) => !prevIsSingUp);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sing In was unsuccessful. Try Again Later");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSingUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSingUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              xs={6}
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSingUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={handleSubmit}
          >
            {isSingUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="462939387350-sdu0hjegddq9j4i36qb313bpiuuv7dr5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSingUp
                  ? "Already have account? Sign In"
                  : "Don't have account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
