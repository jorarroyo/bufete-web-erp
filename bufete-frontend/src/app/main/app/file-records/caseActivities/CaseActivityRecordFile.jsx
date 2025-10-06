import { Fab, Icon, makeStyles, Tooltip, Typography } from '@material-ui/core';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FuseAnimate } from '@fuse';
import { CaseActivityType, statusName } from 'app/constants/appConstant';
import * as Actions from '../store/actions/case-activities';
import reducer from '../store/reducers/case-activities';
import CaseActivityDialog from './CaseActivityDialog';
import CaseActivitiesInnerMenu from './CaseActivitiesInnerMenu';
import CaseActRecordUpdate from './CaseActRecordUpdate';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 35,
    zIndex: 99,
  },
  warningMessage: {
    width: '80%',
  },
});

function CaseActivityRecordFile(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const [stampInvList, setStampInvList] = useState([]);

  const data = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.data);
  const status = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.status);
  const loading = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.loading);

  const { recordId, readOnly } = props;

  useEffect(() => {
    setStampInvList(data);
  }, [data]);

  useEffect(() => {
    dispatch(Actions.getCaseActivityByRecordId(recordId));
  }, [recordId, dispatch]);

  function handleClickMenu(id, status, link) {
    if (link === '#1') {
      dispatch(Actions.openEditCaseActivityDialog(id));
    } else if (link === '#2') {
      dispatch(Actions.removeCaseActivity(id));
    } else if (link === '#3') {
      dispatch(Actions.openChangeRecordActivityDialog(id, CaseActivityType.HONORARIOS));
    }
  }

  return (
    <>
      <div>
        <div className="pb-48">
          <div className="pb-16 flex items-center">
            <Icon className="mr-16" color="action">
              add_shopping_cart
            </Icon>
            <Typography className="h2" color="textSecondary">
              Detalles de Procuración
            </Typography>
          </div>
          <div className="mb-24">
            <div className="table-responsive">
              <table className="simple">
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Asignación</th>
                    <th>Responsable</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(stampInvList) &&
                    stampInvList.map(requestInv => (
                      <tr key={requestInv.id}>
                        <td>
                          <span className="truncate">{requestInv.activity_name}</span>
                        </td>
                        <td>
                          <span className="truncate">{requestInv.assign_date}</span>
                        </td>
                        <td>
                          <span className="truncate">{requestInv.employee_name || requestInv.activity_details.map(s => s.employee_name).join(', ')}</span>
                        </td>
                        <td>
                          <span className="truncate">{requestInv.case_activity_type}</span>
                        </td>
                        <td>
                          <span className="truncate">{requestInv.status}</span>
                        </td>
                        <td>{CaseActivitiesInnerMenu(requestInv, handleClickMenu)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {status !== statusName.CERRADO && !readOnly && (
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <Tooltip title="Agregar">
                    <Fab
                      color="primary"
                      aria-label="add"
                      className={classes.addButton}
                      onClick={() => dispatch(Actions.openNewCaseActivityDialog('recordActivity'))}
                    >
                      <Icon>add</Icon>
                    </Fab>
                  </Tooltip>
                </FuseAnimate>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoadingComponent loadingRecord={loading} />
      <CaseActivityDialog />
      <CaseActRecordUpdate />
    </>
  );
}

export default withReducer('caseActivitiesApp', reducer)(CaseActivityRecordFile);;
