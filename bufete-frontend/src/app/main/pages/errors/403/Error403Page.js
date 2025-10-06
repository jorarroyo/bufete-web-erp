import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FuseAnimate } from '@fuse';

function Error403Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <FuseAnimate animation="transition.expandIn" delay={100}>
          <Typography variant="h1" color="inherit" className="font-medium mb-16">
            403
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={500}>
          <Typography variant="h5" color="textSecondary" className="mb-16">
            Lo sentimos, al parecer no posee acceso a esta opción!!
          </Typography>
        </FuseAnimate>

        <Link className="font-medium" to="/">
          Regresar a Home
        </Link>
      </div>
    </div>
  );
}

export default Error403Page;
