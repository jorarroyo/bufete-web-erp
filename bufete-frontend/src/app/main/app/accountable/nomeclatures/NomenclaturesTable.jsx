import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import NomenclaturesTree from './NomenclaturesTree';
import * as Actions from '../store/actions/nomenclatures';
import NomenclatureForm from './NomenclatureForm';

const useStyles = makeStyles(() => ({
  treeList: {
    '@media (max-width: 959px)': {
      maxHeight: '500px',
      overflowY: 'auto',
    },
  },
}));

const NomenclaturesTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const dataList = useSelector(({ nomenclaturesApp }) => nomenclaturesApp.nomenclatures.dataList);
  const loading = useSelector(({ nomenclaturesApp }) => nomenclaturesApp.nomenclatures.loading);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(Actions.getNomenclatures());
  }, [dispatch]);

  useEffect(() => {
    setData(dataList);
  }, [dataList]);

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  function refreshList() {
    dispatch(Actions.getNomenclatures());
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className={clsx(classes.treeList, 'flex-1')}>
          <NomenclaturesTree nomenclatureList={data} handleSelect={handleSelect} />
        </div>
        <div className="w-full h-64 flex-1">
          <NomenclatureForm dataId={selected} refresh={refreshList} />
        </div>
      </div>
      <LoadingComponent loadingRecord={loading} />
    </>
  );
};

export default withRouter(NomenclaturesTable);
