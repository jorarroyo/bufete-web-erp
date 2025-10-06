import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Icon } from '@material-ui/core';
import ReactTable from 'react-table';
import { FuseUtils, FuseAnimate } from '@fuse';
import * as Actions from './store/actions';

const CurrencyList = props => {
  const dispatch = useDispatch();
  const currencies = useSelector(({ currencyApp }) => currencyApp.currency.entities);
  const searchText = useSelector(({ currencyApp }) => currencyApp.currency.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map(id => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (currencies) {
      setFilteredData(getFilteredArray(currencies, searchText));
    }
  }, [currencies, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No existen Monedas!
        </Typography>
      </div>
    );
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo, column) => {
          return {
            className: 'cursor-pointer',
            onClick: (e, handleOriginal) => {
              if (rowInfo && props.action.id === 'active') {
                dispatch(Actions.openEditCurrencyDialog(rowInfo.original));
              }
            },
          };
        }}
        data={filteredData}
        columns={[
          {
            Header: 'Nombre',
            accessor: 'name',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Nombre Corto',
            accessor: 'short_name',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Cambio',
            accessor: 'exchange_value',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Empresa',
            accessor: 'company_name',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Estado',
            accessor: 'status',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: '',
            width: 128,
            Cell: row => (
              <div className="flex items-center">
                <IconButton
                  onClick={ev => {
                    if (props.action.id === 'active') {
                      ev.stopPropagation();
                      dispatch(Actions.removeCurrency(row.original.id));
                    }
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            ),
          },
        ]}
        defaultPageSize={10}
        noDataText="No existen datos"
      />
    </FuseAnimate>
  );
};

export default CurrencyList;
