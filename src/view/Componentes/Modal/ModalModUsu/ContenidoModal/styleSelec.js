import { withStyles } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },

  input: {
    width: "10.5vw",
    size: "small",
    borderRadius: 4,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: "4px",
    border: "solid 1px #342e2e71",
    fontSize: 16,
    padding: "5px 26px 10px 12px",

    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
  },
}))(InputBase);
