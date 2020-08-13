import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#3A3D4D"
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Verdana'
  },
}));

const Nav = ({ showTour }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#3A3D4D' }}>
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            YouTube List
          </Typography>
          <Button onClick={showTour} variant="warning" style={{ color: '#000000', backgroundColor: '#FFC107', borderRadius: '10px' }}>Tour del sitio</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
