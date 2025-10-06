import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageSimple } from '@fuse';
import { makeStyles } from '@material-ui/core';
import reducer from '../store/reducers/nomenclatures';
import NomenclaturesTable from './NomenclaturesTable';

const useStyles = makeStyles({
  layoutRoot: {},
});

function Nomenclatures() {
  const classes = useStyles();

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <h1>Nomenclaturas</h1>
        </div>
      }
      contentToolbar={
        <div className="p-24">
          <h4>Árbol de nomenclaturas</h4>
        </div>
      }
      content={<NomenclaturesTable />}
      innerScroll
    />
  );
}

export default withReducer('nomenclaturesApp', reducer)(Nomenclatures);
