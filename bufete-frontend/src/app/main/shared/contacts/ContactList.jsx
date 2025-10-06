import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Tooltip, IconButton, Icon, Fab, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import { statusName } from 'app/constants/appConstant';
import isEmpty from 'lodash/isEmpty';
import { FuseAnimate } from '@fuse';
import reducer from '../store/reducers/contacts';
import * as Actions from '../store/actions/contacts';
import ContactDialog from './ContactDialog';

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

function ContactList(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { handleAction, contactData } = props;
  const [contactList, setContactList] = useState([]);
  const loading = useSelector(({ contactApp }) => contactApp.contacts.loading);
  const data = useSelector(({ contactApp }) => contactApp.contacts.data);

  useEffect(() => {
    if (data === null || isEmpty(data)) {
      dispatch(Actions.setInitialData(contactData));
    } else {
      setContactList(data.filter(s => s.status === statusName.ACTIVO));
      if (handleAction) handleAction(data);
    }
  }, [data, handleAction, contactData, dispatch]);

  return (
    <>
      <div>
        <div className="pb-48">
          <div className="pb-16 flex items-center">
            <Icon className="mr-16" color="action">
              contacts
            </Icon>
            <Typography className="h2" color="textSecondary">
              Contacto(s)
            </Typography>
          </div>
          <div className="mb-24">
            <div className="table-responsive">
              <table className="simple">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  {contactList &&
                    contactList.map(contact => (
                      <tr key={contact.id}>
                        <td>
                          <span className="truncate">{contact.contact_name}</span>
                        </td>
                        <td>
                          <span className="truncate">{contact.contact_type}</span>
                        </td>
                        <td>
                          <span className="truncate">{contact.contact_phone}</span>
                        </td>
                        <td>
                          <span className="truncate">{contact.contact_email}</span>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openEditContactDialog(contact.id));
                                }}
                              >
                                <Icon>edit</Icon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.deleteContact(contact.id));
                                }}
                              >
                                <Icon>delete</Icon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Tooltip title="Agregar">
            <Fab color="primary" aria-label="add" className={classes.addButton} onClick={() => dispatch(Actions.openContactDialog())}>
              <Icon>add</Icon>
            </Fab>
          </Tooltip>
        </FuseAnimate>
      </div>
      <LoadingComponent loadingRecord={loading} />
      <ContactDialog />
    </>
  );
}

export default withReducer('contactApp', reducer)(ContactList);
