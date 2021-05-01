import React, { useEffect, useState } from "react";
import { withStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MiInput from '../MiInput/MiInput'
import { matchSorter } from 'match-sorter';


export default function MiFilter({ data, optionesFiltro, value, setValue, tamaño, id, label, optionLabel }) {

  const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue,
      {
        keys: optionesFiltro,
        threshold: matchSorter.rankings.CONTAINS
      });

  return (
    <Filter
      id={id}
      style={{ width: tamaño }}
      options={data}
      value={value}
      getOptionLabel={option => optionLabel(option)}
      filterOptions={filterOptions}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      getOptionSelected={(option, value) => option.value === value.value}
      renderInput={params => (
        <MiInput
          {...params}
          id={`input${id}`}
          label={label}
          variant="outlined"
          size="small"
          required
        />)
      }
    />
  );
}

const Filter = withStyles({
  root: {
    '& .MuiFormControl-fullWidth': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: '4px',
    },
    '& .MuiInputBase-input': {
      backgroundColor: 'rgba(0, 0, 0, 0);',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"] .MuiAutocomplete-input': {
      padding: '2.5px',
    }
  },
})(Autocomplete);