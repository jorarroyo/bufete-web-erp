import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import { FuseUtils } from '@fuse';
import { useSelector } from 'react-redux';

const InnerMenu = props => {
  const { id, status, options, onMenuClick } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userRole = useSelector(({ auth }) => auth.user.role);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onMenuFunc(menuId, menuStatus, option) {
    onMenuClick(menuId, menuStatus, option.link);
    handleClose();
  }

  return (
    <div>
      <IconButton aria-label="more" aria-controls="inner-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="inner-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
        {options &&
          options.map(option => {
            if (!FuseUtils.hasPermission(option.auth, userRole)) {
              return null;
            }

            return (
              <MenuItem key={`${option.id}_${option.name}`} onClick={() => onMenuFunc(id, status, option)}>
                {option.name}
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default InnerMenu;
