import React from 'react';
import { Typography, Paper, Icon, Input } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FuseAnimate } from '@fuse';

function Error404Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <FuseAnimate animation="transition.expandIn" delay={100}>
          <Typography variant="h1" color="inherit" className="font-medium mb-16">
            404
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={500}>
          <Typography variant="h5" color="textSecondary" className="mb-16">
            Lo sentimos, pero no pudimos encontrar la página que buscabas!!
          </Typography>
        </FuseAnimate>

        <Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16" elevation={1}>
          <Icon color="action">search</Icon>
          <Input
            placeholder="Search for anything"
            className="pl-16"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
          />
        </Paper>

        <Link className="font-medium" to="/">
          Regresar a Home
        </Link>
      </div>
    </div>
  );
}

export default Error404Page;
