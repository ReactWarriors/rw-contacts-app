import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality";

const FieldFullname = memo(({ value, onChange }) => (
  <TextField
    name="fullname"
    label="Fullname"
    variant="outlined"
    value={value}
    onChange={onChange}
  />
));

const useFieldGenderStyles = makeStyles(() =>
  createStyles({
    fieldGender: {
      minWidth: 120,
    },
  })
);

const FieldGender = memo(({ value, onChange }) => {
  const classes = useFieldGenderStyles();
  return (
    <FormControl variant="outlined" className={classes.fieldGender}>
      <InputLabel id="gender">Gender</InputLabel>
      <Select
        labelId="gender"
        value={value}
        onChange={onChange}
        label="Gender"
        name="gender"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </FormControl>
  );
});

const useFieldNationalityStyles = makeStyles(() =>
  createStyles({
    fieldGender: {
      minWidth: 120,
    },
  })
);

const FieldNationality = memo(({ value, onChange }) => {
  const classes = useFieldNationalityStyles();
  return (
    <FormControl variant="outlined" className={classes.fieldNationality}>
      <InputLabel id="nationality">Nationality</InputLabel>
      <Select
        labelId="nationality"
        value={value}
        onChange={onChange}
        label="Nationality"
        name="nationality"
      >
        <MenuItem value="all">All</MenuItem>
        {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, name]) => (
          <MenuItem value={key} key={key}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldsContainer: {
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
    fieldNationality: {
      minWidth: 140,
    },
  })
);

export const ContactsFilters = memo(
  ({ filters, updateFilter, clearFilters }) => {
    const classes = useStyles();

    const handleChangeFilter = useCallback(
      (event) => {
        updateFilter(event.target.name, event.target.value);
      },
      [updateFilter]
    );

    return (
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" className={classes.fieldsContainer}>
          <FieldFullname
            value={filters.fullname}
            onChange={handleChangeFilter}
          />
          <FieldGender value={filters.gender} onChange={handleChangeFilter} />
          <FieldNationality
            value={filters.nationality}
            onChange={handleChangeFilter}
          />
        </Box>
        <Button size="small" startIcon={<ClearIcon />} onClick={clearFilters}>
          Clear
        </Button>
      </Box>
    );
  }
);

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
