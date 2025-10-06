import { Button, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import ClientServices from 'app/services/file-records/clientsService';
import AsyncSelectComponent from '../../../shared/AsyncSelect';
import { statusName } from '../../../../constants/appConstant';

function ClientGroupDetail(props) {
  const { disabled, clientList, setClientList } = props;

  const [clients, setClients] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async inputValue => {
    const list = await ClientServices.searchClientChild(inputValue);
    setClients(list);
    return list.map(d => ({
      id: d.id,
      name: `${d.nit} - ${d.name}`,
    }));
  };

  function handleSelectChange(type, value) {
    setSelectedItem(clients.find(s => s.id === value));
  }

  function addSelectedItem() {
    if (!clientList.find(s => s.id === selectedItem.id)) {
      setClientList([...clientList, selectedItem]);
      setSelectedItem(null);
    }
  }

  function removeSelectedItem(item) {
    setClientList([...clientList.filter(s => s.id !== item.id), { ...item, status: statusName.ELIMINADO }]);
  }

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon className="mr-16" color="action">
            chrome_reader_mode
          </Icon>
          <Typography className="h2" color="textSecondary">
            Clientes asociados
          </Typography>
        </div>
        <div className="mb-24">
          <div>
            <AsyncSelectComponent
              inputId="client_id"
              inputName="Cliente"
              placeHolder="Seleccionar un cliente..."
              // initialState={form.client}
              handleChange={handleSelectChange}
              suggestions={fetchData}
              disabled={disabled}
            />
            <Button variant="contained" endIcon={<AddIcon />} onClick={addSelectedItem} disabled={selectedItem === null}>
              Agregar
            </Button>
          </div>
          <div className="table-responsive">
            <table className="simple">
              <thead>
                <tr>
                  <th>NIT</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {clientList &&
                  clientList
                    .filter(s => s.status === statusName.ACTIVO)
                    .map(detail => (
                      <tr key={detail.id}>
                        <td>
                          <span>{detail.nit}</span>
                        </td>
                        <td>
                          <span className="truncate">{detail.name}</span>
                        </td>
                        <td>
                          <span className="truncate">{detail.client_type}</span>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <Tooltip title="Eliminar">
                              <IconButton onClick={() => removeSelectedItem(detail)}>
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
    </div>
  );
}

export default ClientGroupDetail;
