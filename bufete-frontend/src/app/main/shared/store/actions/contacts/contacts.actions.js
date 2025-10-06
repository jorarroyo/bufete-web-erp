import { statusName } from 'app/constants/appConstant';
import {
  SET_INITIAL_DATA,
  OPEN_CREATE_CONTACT_DIALOG,
  CLOSE_CREATE_CONTACT_DIALOG,
  OPEN_EDIT_CONTACT_DIALOG,
  DELETE_CONTACT,
  CREATE_CONTACT,
} from '../../types/contacts/contacts.types';

export function setInitialData(contactList) {
  return dispatch => {
    dispatch({
      type: SET_INITIAL_DATA,
      payload: contactList,
    });
  };
}

export function openContactDialog(id) {
  return dispatch => {
    dispatch({
      type: OPEN_CREATE_CONTACT_DIALOG,
      payload: id,
    });
  };
}

export function closeContactDialog() {
  return {
    type: CLOSE_CREATE_CONTACT_DIALOG,
  };
}

export function openEditContactDialog(id) {
  return (dispatch, getState) => {
    const { data } = getState().contactApp.contacts;
    const contact = data.find(s => s.id === id);
    dispatch({
      type: OPEN_EDIT_CONTACT_DIALOG,
      payload: contact,
    });
  };
}

export function deleteContact(id) {
  return (dispatch, getState) => {
    const { data } = getState().contactApp.contacts;
    const contact = data.find(s => s.id === id);
    contact.status = statusName.DELETED;
    dispatch({
      type: DELETE_CONTACT,
      payload: contact,
    });
  };
}

export function createContact(contactEntity) {
  return (dispatch, getState) => {
    const { data, entityData } = getState().contactApp.contacts;
    const contact = data.find(s => s.id === contactEntity.id);
    const newContact = {
      ...contact,
      ...entityData,
      id: contactEntity.id,
      contact_name: contactEntity.contact_name,
      contact_address: contactEntity.contact_address,
      contact_email: contactEntity.contact_email,
      contact_phone: contactEntity.contact_phone,
      contact_type: contactEntity.contact_type,
      status: contactEntity.status,
    };
    dispatch({
      type: CREATE_CONTACT,
      payload: newContact,
    });
  };
}
