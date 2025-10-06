import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FuseAnimate } from '@fuse';

function Error500Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <FuseAnimate animation="transition.expandIn" delay={100}>
          <Typography variant="h1" color="inherit" className="font-medium mb-16">
            500
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={500}>
          <Typography variant="h5" color="textSecondary" className="mb-16">
            Bueno, al parecer no hay internet!!
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={600}>
          <Typography variant="subtitle1" color="textSecondary" className="mb-48">
            Al parecer tenemos un inconveniente interno, por favor trata de nuevo en algunos minutos.
          </Typography>
        </FuseAnimate>

        <Link className="font-medium" to="/">
          Reportar este problema
        </Link>
      </div>
    </div>
  );
}

export default Error500Page;
