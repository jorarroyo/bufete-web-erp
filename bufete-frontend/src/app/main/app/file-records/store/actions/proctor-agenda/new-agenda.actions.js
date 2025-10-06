import notificationHandler from 'app/utils/errorHandler';
import { statusName } from 'app/constants/appConstant';
import CaseActivityServices from 'app/services/file-records/caseActivityService';
import ProctorAgendaServices from 'app/services/file-records/proctorAgendaService';
import ActivitySettleServices from 'app/services/file-records/activitySettleService';
import moment from 'moment';
import helperFunctions from 'app/utils/helperFunc';
import { 
  GET_PROCTOR_AGENDA_SUCCESS, 
  GET_PROCTOR_AGENDA_INIT_REQUEST,
  GET_PROCTOR_AGENDA_FAILURE,
  SAVE_PROCTOR_AGENDA_INIT_REQUEST,
  SAVE_PROCTOR_AGENDA_SUCCESS,
  SAVE_PROCTOR_AGENDA_FAILURE,
  UPDATE_PROCTOR_AGENDA_INIT_REQUEST,
  UPDATE_PROCTOR_AGENDA_SUCCESS,
  UPDATE_PROCTOR_AGENDA_FAILURE,
  NEW_PROCTOR_AGENDA,
  OPEN_ADD_CASE_ACTIVITY_DIALOG,
  CLOSE_ADD_CASE_ACTIVITY_DIALOG,
  ASSIGN_CASE_ACTIVITIES,
  REMOVE_CASE_ACTIVITY,
  OPEN_CHANGE_ACTIVITY_STATE_DIALOG,
  CLOSE_CHANGE_ACTIVITY_STATE_DIALOG,
  CHANGE_ACTIVITY_RECORD_STATUS_INIT_REQUEST,
  CHANGE_ACTIVITY_RECORD_STATUS_SUCCESS,
  CHANGE_ACTIVITY_RECORD_STATUS_FAILURE,
  OPEN_ADD_ACTIVITY_SETTLE_DIALOG,
  CLOSE_ADD_ACTIVITY_SETTLE_DIALOG,
  GET_ACTIVITY_SETTLE,
  DELETE_ACTIVITY_SETTLE,
  RELOAD_DATA,
  ADD_ACTIVITY_SETTLE_SUCCESS,
  ADD_ACTIVITY_SETTLE_INIT_REQUEST,
  ADD_ACTIVITY_SETTLE_FAILURE,
} from '../../types/proctor-agenda/new-agenda.types';

const data = {
  id: '',
  assign_date: new Date(),
  comment: '',
  employee_id: '',
  status: statusName.ABIERTO,
  proctor_agenda_cost_local: 0,
  proctor_agenda_cost_outer: 0,
  agenda_return_amount_local: 0,
  agenda_return_amount_outer: 0,
  amount_to_return: 0,
  activity_list: [],
};

export function getProctorAgenda(proctorAgendaId) {
  return dispatch => {
    dispatch({
      type: GET_PROCTOR_AGENDA_INIT_REQUEST,
    });
    ProctorAgendaServices.getProctorAgenda(proctorAgendaId)
      .then(response =>
        dispatch({
          type: GET_PROCTOR_AGENDA_SUCCESS,
          payload: response,
        })
      )
      .catch(() => {
        notificationHandler.infoMessage(dispatch, 'Error al obtener los datos', 'error');
        dispatch({
          type: GET_PROCTOR_AGENDA_FAILURE,
        });
      });
  }
}

export function saveProctorAgenda(newAgenda) {
  return dispatch => {
    if (newAgenda.activity_list.length === 0) {
      notificationHandler.infoMessage(dispatch, 'Debe elegir un responsable con actividades asociadas', 'warning');
      return;
    }
    dispatch({
      type: SAVE_PROCTOR_AGENDA_INIT_REQUEST,
    });
    const request = {
      id: newAgenda.id,
      comment: newAgenda.comment,
      assign_date: helperFunctions.reFormatDate(newAgenda.assign_date),
      status: newAgenda.status,
      employee_id: newAgenda.employee_id,
      proctor_agenda_cost_local: newAgenda.proctor_agenda_cost_local,
      proctor_agenda_cost_outer: newAgenda.proctor_agenda_cost_outer,
      agenda_return_amount_local: newAgenda.agenda_return_amount_local,
      agenda_return_amount_outer: newAgenda.agenda_return_amount_outer,
      activity_list: newAgenda.activity_list.map(actCase => ({
        activity_id: actCase.id,
        activity_cost: actCase.activity_cost,
        currency_type: actCase.currency_type,
      })),
    };
    ProctorAgendaServices.postProctorAgenda('', request)
      .then(response => dispatch({ type: SAVE_PROCTOR_AGENDA_SUCCESS, payload: response }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Agenda creada con éxito!!!');
        dispatch(reloadData(true));
      })
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.message || 'error al crear la agenda', 'error');
        dispatch({
          type: SAVE_PROCTOR_AGENDA_FAILURE,
        });
      });
  };
}

export function updateProctorAgenda(proctorAgenda) {
  return dispatch => {
    dispatch({
      type: UPDATE_PROCTOR_AGENDA_INIT_REQUEST,
    });
    const request = {
      id: proctorAgenda.id,
      comment: proctorAgenda.comment,
      assign_date: helperFunctions.reFormatDate(proctorAgenda.assign_date),
      status: proctorAgenda.status,
      employee_id: proctorAgenda.employee_id,
      proctor_agenda_cost_local: proctorAgenda.proctor_agenda_cost_local,
      proctor_agenda_cost_outer: proctorAgenda.proctor_agenda_cost_outer,
      agenda_return_amount_local: proctorAgenda.agenda_return_amount_local,
      agenda_return_amount_outer: proctorAgenda.agenda_return_amount_outer,
      activity_list: proctorAgenda.activity_list.map(actCase => ({
        activity_id: actCase.id,
        activity_cost: actCase.activity_cost,
        currency_type: actCase.currency_type,
      })),
    };
    ProctorAgendaServices.putProctorAgenda('', request)
      .then(response => dispatch({ type: UPDATE_PROCTOR_AGENDA_SUCCESS, payload: response }))
      .then(() => notificationHandler.successMessage(dispatch, 'Agenda actualizada con éxito!!!'))
      .catch(({ response }) => {
        notificationHandler.infoMessage(dispatch, response.message || 'error al actualizar la agenda', 'error');
        dispatch({
          type: UPDATE_PROCTOR_AGENDA_FAILURE,
        });
      });
  };
}

export function newProctorAgenda() {
  return {
    type: NEW_PROCTOR_AGENDA,
    payload: data,
  };
}

export function openAddCaseActivityDialog() {
  const request = CaseActivityServices.getUnassignedActivities();
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: OPEN_ADD_CASE_ACTIVITY_DIALOG,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function closeAddCaseActivityDialog() {
  return {
    type: CLOSE_ADD_CASE_ACTIVITY_DIALOG,
  };
}

export function assignCaseActivities(ids) {
  const request = CaseActivityServices.getSelectedActivities(ids.map(x => x.id));
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: ASSIGN_CASE_ACTIVITIES,
          payload: response.map(item => {
            const itemList = ids.find(x => x.id === item.id);
            return {
              ...item,
              activity_cost: itemList.fieldValue,
              currency_type: itemList.type,
            };
          }),
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function removeCaseActivity(id) {
  return {
    type: REMOVE_CASE_ACTIVITY,
    payload: id,
  };
}

export function openEditAgendaDetailDialog(recordId, prevStatus) {
  return {
    type: OPEN_CHANGE_ACTIVITY_STATE_DIALOG,
    data: {
      id: recordId,
      prevStatus,
    },
  };
}

export function closeEditAgendaDetailDialog() {
  return {
    type: CLOSE_CHANGE_ACTIVITY_STATE_DIALOG,
  };
}

export function updateAgendaDetailState(form) {
  const today = moment();
  const tomorrow = moment(today).add(1, 'days');
  return dispatch => {
    dispatch({
      type: CHANGE_ACTIVITY_RECORD_STATUS_INIT_REQUEST,
    });
    ProctorAgendaServices.changeStateDetail({
      id: form.id,
      comment: form.comment,
      assign_date: tomorrow.format('YYYY-MM-DD'),
      status: form.next_status,
    })
      .then(response =>
        dispatch({
          type: CHANGE_ACTIVITY_RECORD_STATUS_SUCCESS,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
        dispatch({
          type: CHANGE_ACTIVITY_RECORD_STATUS_FAILURE,
        });
      });
  }
}

export function openAddActivitySettleDialog(proctorAgendaId) {
  const request = CaseActivityServices.getAssignedActivities(proctorAgendaId);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: OPEN_ADD_ACTIVITY_SETTLE_DIALOG,
          payload: response,
          proctorAgendaId,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function closeAddActivitySettleDialog() {
  return {
    type: CLOSE_ADD_ACTIVITY_SETTLE_DIALOG,
  };
}

export function saveActivitySettle(newSettle) {
  return dispatch => {
    dispatch({
      type: ADD_ACTIVITY_SETTLE_INIT_REQUEST,
    });
    const request = {
      id: newSettle.id,
      comment: newSettle.comment,
      assign_date: newSettle.assign_date,
      status: statusName.ABIERTO,
      proctor_agenda_id: newSettle.proctor_agenda_id,
      invoice_num: newSettle.invoice_num,
      invoice_range: newSettle.invoice_range,
      invoice_name: newSettle.invoice_name,
      invoice_description: newSettle.invoice_description,
      invoice_total: newSettle.invoice_total,
      invoice_type: newSettle.invoice_type,
      invoice_currency: newSettle.invoice_currency,
      activity_list: newSettle.activity_list.map(actCase => ({
        case_activity_id: actCase.id,
        cost_detail: actCase.fieldValue,
      })),
    };
    ActivitySettleServices.postActivitySettle('', request)
      .then(response => dispatch({ type: ADD_ACTIVITY_SETTLE_SUCCESS, payload: response }))
      .then(() => {
        notificationHandler.successMessage(dispatch, 'Actividad asociada con éxito!!!');
        dispatch(reloadData(true));
      })
      .catch(error => {
        notificationHandler.messageHandler(dispatch, error);
        dispatch({
          type: ADD_ACTIVITY_SETTLE_FAILURE,
        });
      });
  };
}

export function getInvoiceList(proctorAgendaId) {
  const request = ActivitySettleServices.getActivitySettle(proctorAgendaId);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: GET_ACTIVITY_SETTLE,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function deleteActivitySettle(id, proctorAgendaId) {
  const request = ActivitySettleServices.deleteActivitySettle(id, proctorAgendaId);
  return dispatch =>
    request
      .then(response =>
        dispatch({
          type: DELETE_ACTIVITY_SETTLE,
          payload: response,
        })
      )
      .catch(error => {
        notificationHandler.errorHandler(error);
      });
}

export function reloadData(reload) {
  return {
    type: RELOAD_DATA,
    payload: reload,
  };
}
