import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Icon } from '@material-ui/core';
import ReactTable from 'react-table';
import { FuseUtils, FuseAnimate } from '@fuse';
import * as Actions from './store/actions';

const RoleList = props => {
  const dispatch = useDispatch();
  const roles = useSelector(({ roleApp }) => roleApp.role.entities);
  const searchText = useSelector(({ roleApp }) => roleApp.role.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map(id => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (roles) {
      setFilteredData(getFilteredArray(roles, searchText));
    }
  }, [roles, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No existen Roles!
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
                dispatch(Actions.getRoleById(rowInfo.original.id));
                dispatch(Actions.openEditRoleDialog(rowInfo.original));
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
            Header: 'Estado',
            accessor: 'status',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Rol Padre',
            accessor: 'parentName',
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
                      dispatch(Actions.removeRole(row.original.id));
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

export default RoleList;
