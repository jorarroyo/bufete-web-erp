import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Icon } from '@material-ui/core';
import ReactTable from 'react-table';
import { FuseUtils, FuseAnimate } from '@fuse';
import * as Actions from './store/actions';

const CompanyList = props => {
  const dispatch = useDispatch();
  const companies = useSelector(({ companyApp }) => companyApp.company.entities);
  const searchText = useSelector(({ companyApp }) => companyApp.company.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map(id => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (companies) {
      setFilteredData(getFilteredArray(companies, searchText));
    }
  }, [companies, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No existen empresas!
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
                dispatch(Actions.openEditCompanyDialog(rowInfo.original));
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
            Header: '',
            width: 128,
            Cell: row => (
              <div className="flex items-center">
                <IconButton
                  onClick={ev => {
                    if (props.action.id === 'active') {
                      ev.stopPropagation();
                      dispatch(Actions.removeCompany(row.original.id));
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

export default CompanyList;
