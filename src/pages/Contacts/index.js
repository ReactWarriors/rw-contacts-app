import { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { ContactsTable } from "./ContactsTable";
import { useContacts } from "./useContacts";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

const DATA_VIEW_MODES = {
  TABLE: "table",
  GRID: "grid",
};

const getInitialDataViewMode = () => {
  return localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE;
};

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  const handleChangeViewMode = (_, nextView) => {
    setDataViewMode(nextView);
  };

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h1">
              Contacts
            </Typography>
            <ToggleButtonGroup
              value={dataViewMode}
              exclusive
              onChange={handleChangeViewMode}
            >
              <ToggleButton
                value={DATA_VIEW_MODES.GRID}
                aria-label={DATA_VIEW_MODES.GRID}
              >
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton
                value={DATA_VIEW_MODES.TABLE}
                aria-label={DATA_VIEW_MODES.TABLE}
              >
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress />;
            }

            if (contacts.isError) {
              return <div>...error</div>;
            }

            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }

            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return "grid";
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
