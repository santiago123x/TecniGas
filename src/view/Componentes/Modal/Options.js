import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const Options = ({ value, values, label }) => {
  return (
    <FormControlLabel
      value={values}
      control={<Radio checked={value == values} color="default" />}
      label={label}
    />
  );
};

export default Options;
