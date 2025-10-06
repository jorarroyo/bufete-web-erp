import { Fab, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { statusName } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate } from '@fuse';
import StampInvOptStateChange from './StampInvOptStateChance';
import * as Actions from '../store/actions/stamp-inv-opt';
import reducer from '../store/reducers/stamp-inv-opt';
import AddStampInvDialog from './AddStampInvDialog';
import StampInvOptionReport from './StampInvOptionReport';
import MoveToRecordFileDialog from './MoveToRecordFileDialog';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    zIndex: 99,
  },
  warningMessage: {
    width: '80%',
  },
});

function StampInvOptions(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const [stampInvList, setStampInvList] = useState([]);
  const [recordFileId, setRecordFileId] = useState(0);
  const [recordStatus, setRecordStatus] = useState('');
  const loading = useSelector(({ stampInvOptApp }) => stampInvOptApp.stampInvOpt.loading);
  const data = useSelector(({ stampInvOptApp }) => stampInvOptApp.stampInvOpt.dataOption);
  const { recordId, readOnly } = props;

  useEffect(() => {
    if (data) {
      setStampInvList(data.list);
      setRecordStatus(data.status);
    }
  }, [data]);

  useEffect(() => {
    setRecordFileId(recordId);
    dispatch(Actions.getInvetoryByRecordId(recordId));
  }, [recordId, dispatch]);

  return (
    <>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon className="mr-16" color="action">
            add_shopping_cart
          </Icon>
          <Typography className="h2" color="textSecondary">
            Detalles de Timbre
          </Typography>
        </div>
        <div className="mb-24">
          <div className="table-responsive">
            <table className="simple">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Solicitante</th>
                  <th>Estado</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {stampInvList &&
                  stampInvList.map(requestInv => (
                    <tr key={requestInv.id}>
                      <td>
                        <span className="truncate">{requestInv.inventory_type_name}</span>
                      </td>
                      <td>
                        <span className="truncate">{requestInv.request_date}</span>
                      </td>
                      <td>
                        <span className="truncate">{requestInv.requester_name}</span>
                      </td>
                      <td>
                        <span className="truncate">{requestInv.status}</span>
                      </td>
                      <td>
                        {requestInv.status === statusName.ELABORADO && (
                          <div className="flex items-center">
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openEditStampOptionsDialog(requestInv.id, recordFileId));
                                }}
                              >
                                <Icon>edit</Icon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cambiar de estado">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openChangeStatusDialog(requestInv.id, requestInv.status));
                                }}
                              >
                                <Icon>compare_arrows</Icon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                        {requestInv.status !== statusName.ELABORADO && (
                          <div className="flex items-center">
                            <Tooltip title="ver">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openEditStampOptionsDialog(requestInv.id, recordFileId));
                                }}
                              >
                                <Icon>remove_red_eye</Icon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Mover a...">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openMoveToRecordFileDialog(requestInv.id, recordFileId));
                                }}
                              >
                                <Icon>compare_arrows</Icon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {recordStatus !== statusName.CERRADO && !readOnly && (
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Tooltip title="Agregar">
            <Fab
              color="primary"
              aria-label="add"
              className={classes.addButton}
              onClick={() => dispatch(Actions.openStampOptionsDialog(recordFileId))}
            >
              <Icon>add</Icon>
            </Fab>
          </Tooltip>
        </FuseAnimate>
      )}
      <AddStampInvDialog />
      <StampInvOptStateChange />
      <LoadingComponent loadingRecord={loading} />
      <StampInvOptionReport />
      <MoveToRecordFileDialog />
    </>
  );
}

export default withReducer('stampInvOptApp', reducer)(StampInvOptions);
