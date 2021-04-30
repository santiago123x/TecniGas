import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const MiInput = withStyles({
  root: {
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8.5px 14px ",
    },
    '& .MuiOutlinedInput-notchedOutline': {
      top: '0'
    },
    "& .MuiFormLabel-root": {
      color: "black",
    },
    '& .MuiInputBase-input': {
      backgroundColor: "rgba(255, 255, 255, 0.25);",
      borderRadius: "4px",
      color: 'black',
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "0",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "rgba(0, 0, 0, 0.6)",
      fontWeight: "bold",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      backgroundColor: "rgb(72 147 210)",
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0",
    },
  },
})(TextField);

export default MiInput;