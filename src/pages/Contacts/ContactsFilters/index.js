import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality";

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldGender: {
      minWidth: 120,
    },
    fieldNationality: {
      minWidth: 140,
    },
  })
);

export const ContactsFilters = ({ filters, updateFilter }) => {
  const classes = useStyles();

  const handleChangeFilter = (event) => {
    updateFilter(event.target.name, event.target.value);
  };

  return (
    <Box display="flex">
      <TextField
        name="fullname"
        label="Fullname"
        variant="outlined"
        value={filters.fullname}
        onChange={handleChangeFilter}
      />
      <FormControl variant="outlined" className={classes.fieldGender}>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="gender"
          value={filters.gender}
          onChange={handleChangeFilter}
          label="Gender"
          name="gender"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.fieldNationality}>
        <InputLabel id="nationality">Nationality</InputLabel>
        <Select
          labelId="nationality"
          value={filters.nationality}
          onChange={handleChangeFilter}
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
    </Box>
  );
};

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
};
