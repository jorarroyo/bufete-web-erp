import { Divider, IconButton, InputBase, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DirectionsIcon from '@material-ui/icons/Directions';

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

export default function DialogSelect(props) {
  const classes = useStyles();
  const { title, list, handleChoice } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [listName, setListName] = React.useState('');

  const handleChange = (event, index, name) => {
    if (index !== '') {
      setSelectedIndex(Number(index));
      handleChoice(Number(index));
      setListName(name);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <>
        <Paper component="form" className={classes.root}>
          <InputBase className={classes.input} placeholder="Seleccionar..." inputProps={{ 'aria-label': 'Buscar' }} value={listName} disabled />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleClickOpen}>
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <List component="nav" aria-label="secondary mailbox folder">
                {list.map(item => (
                  <ListItem
                    key={`item-${item.id}`}
                    id={item.id}
                    selected={selectedIndex === item.id}
                    onClick={event => handleChange(event, item.id, item.name)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
