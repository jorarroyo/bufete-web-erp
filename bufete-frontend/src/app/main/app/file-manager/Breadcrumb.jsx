import React from 'react';
import { Typography } from '@material-ui/core';

function Breadcrumb({ className, selected }) {
  return (
    <Typography className={className}>
      <span key={selected.record_id} className="flex items-center">
        <span>{selected.record_name}</span>
      </span>
    </Typography>
  );
}

export default Breadcrumb;
