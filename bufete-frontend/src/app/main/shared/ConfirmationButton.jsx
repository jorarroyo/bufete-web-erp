import React from 'react';
import { BottomNavigationAction, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { closeDialog, openDialog } from 'app/store/actions/fuse';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
}));

const ConfirmationButton = props => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { title, content, label, agreeButtonText, disagreeButtonText, handleAction, isDialogShow, isDisabled, icon } = props;

  function handleClick() {
    handleAction();
    dispatch(closeDialog());
  }

  return (
    <>
      {isDialogShow && (
        <BottomNavigationAction
          disabled={isDisabled}
          className={classes.backButton}
          icon={icon}
          onClick={() =>
            dispatch(
              openDialog({
                children: (
                  <>
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => dispatch(closeDialog())} color="primary">
                        {disagreeButtonText}
                      </Button>
                      <Button onClick={handleClick} color="primary" autoFocus>
                        {agreeButtonText}
                      </Button>
                    </DialogActions>
                  </>
                ),
              })
            )
          }
          variant="contained"
          color="secondary"
          label={label}
        />
      )}
      {!isDialogShow && <BottomNavigationAction disabled={isDisabled} onClick={handleAction} className={classes.backButton} label={label} />}
    </>
  );
};

export default ConfirmationButton;
