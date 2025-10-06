import { FuseAnimate, FuseUtils } from '@fuse';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';
import UsersInnerMenu from './UsersInnerMenu';

const UserList = props => {
  const dispatch = useDispatch();
  const users = useSelector(({ userApp }) => userApp.user.entities);
  const searchText = useSelector(({ userApp }) => userApp.user.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map(id => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (users) {
      setFilteredData(getFilteredArray(users, searchText));
    }
  }, [users, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No existen Usuarios!
        </Typography>
      </div>
    );
  }

  function handleClickMenu(id, status, link) {
    switch (link) {
      case '#Edit': {
        dispatch(Actions.openEditUserAssignDialog(id));
        break;
      }
      case '#Delete': {
        dispatch(Actions.removeUser(id));
        break;
      }
      case '#Reset': {
        dispatch(Actions.openResetPasswordDialog(id));
        break;
      }
      default:
        break;
    }
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        data={filteredData}
        columns={[
          {
            Header: 'Nombre',
            accessor: 'name',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Usuario',
            accessor: 'username',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Correo',
            accessor: 'email',
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
            Header: '...',
            width: 80,
            Cell: row => UsersInnerMenu(row.original, handleClickMenu),
          },
        ]}
        defaultPageSize={10}
        noDataText="No existen datos"
      />
    </FuseAnimate>
  );
};

export default UserList;
