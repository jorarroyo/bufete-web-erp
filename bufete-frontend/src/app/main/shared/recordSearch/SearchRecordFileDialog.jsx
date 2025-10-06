import { Dialog, DialogContent, Divider, IconButton, InputBase, makeStyles, Paper, Typography, AppBar, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { dialogConstants } from 'app/constants/appConstant';
import React from 'react';
import SearchRecordFile from './SearchRecordFile';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: 56,
    marginBottom: '2.4rem',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchRecordFileDialog(props) {
  const classes = useStyles();
  const { handleSelect, labelName, disabled, handleNameSelect, searchAll } = props;
  const [open, setOpen] = React.useState(false);
  const [listName, setListName] = React.useState(labelName);

  React.useEffect(() => {
    setListName(labelName);
  }, [labelName, setListName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSelectedRow(item) {
    if (handleSelect) handleSelect(item.id);
    if (handleNameSelect) handleNameSelect(item.id, item.file_num);
    setListName(item.file_num);
    handleClose();
  }

  return (
    <div style={{ width: '100%' }}>
      <>
        <Paper component="div" className={classes.root}>
          <InputBase className={classes.input} placeholder="Seleccionar..." inputProps={{ 'aria-label': 'Buscar' }} value={listName} disabled />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleClickOpen} disabled={disabled}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </>
      <Dialog
        classes={{
          paper: 'm-24',
        }}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={dialogConstants.LG_WIDTH}
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Seleccionar Expediente
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{ root: 'p-24' }}>
          <SearchRecordFile handleSelect={handleSelectedRow} searchAll={searchAll} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

SearchRecordFileDialog.defaultProps = {
  disabled: false,
};
