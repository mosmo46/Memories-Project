import React from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



const input = ({ name,handleChange,label,autoFocus,type,handleShowPassword, half }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
            endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
                </InputAdornment>
            ),
        } :null}
      />
    </Grid>
  );
};

export default input;
