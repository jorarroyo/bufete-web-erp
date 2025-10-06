import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import BottomNavigation from '@material-ui/core/BottomNavigation';

const useStyles = makeStyles({
  tooltip_absolute: {
    position: 'absolute',
    right: 35,
    left: 35,
    zIndex: 99,
    bottom: '0%',
  },
  tooltip: {
    display: 'block',
    'padding-top': '10px',
    'margin-bottom': '15px',
  },
  warningMessage: {
    width: '80%',
  },
  root: {
    width: '100%',
    'box-shadow': '0 -1px grey',
  },
});

function SideButtonBar(props) {
  const classes = useStyles(props);
  const { children } = props;

  return (
    <div className={classes.tooltip_absolute}>
      <FuseAnimate
        animation={{
          translateY: [0, '100%'],
          opacity: [1, 0],
        }}
        duration={400}
        delay={400}
      >
        <BottomNavigation showLabels className={classes.root}>
          {children}
        </BottomNavigation>
      </FuseAnimate>
    </div>
  );
}

export default SideButtonBar;
