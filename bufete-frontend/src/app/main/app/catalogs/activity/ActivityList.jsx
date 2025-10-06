import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Icon } from '@material-ui/core';
import ReactTable from 'react-table';
import StatusName from 'app/main/shared/StatusName';
import { FuseUtils, FuseAnimate } from '@fuse';
import * as Actions from '../store/actions/activities';

const ActivityList = props => {
  const dispatch = useDispatch();
  const activities = useSelector(({ activityApp }) => activityApp.activity.entities);
  const searchText = useSelector(({ activityApp }) => activityApp.activity.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map(id => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (activities) {
      setFilteredData(getFilteredArray(activities, searchText));
    }
  }, [activities, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No existen actividades!
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
                dispatch(Actions.openEditActivityDialog(rowInfo.original));
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
            Cell: row => <StatusName name={row.original.status} />,
          },
          {
            Header: 'Creado',
            accessor: 'created',
            filterable: false,
            className: 'font-bold',
          },
          {
            Header: 'Modificado',
            accessor: 'modified',
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
                      dispatch(Actions.removeActivity(row.original.id));
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

export default ActivityList;
