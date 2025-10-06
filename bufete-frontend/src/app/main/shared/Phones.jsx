import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { tableConstants, statusName } from 'app/constants/appConstant';

const Phones = props => {
  const { handleAction, phoneData } = props;
  const [statePhone, setStatePhone] = useState({
    columns: [
      { title: 'Id', field: 'id', hidden: true },
      { title: 'Estado', field: 'status', hidden: true },
      { title: 'Número', field: 'phone_number' },
      { title: 'Tipo', field: 'phone_type', lookup: { 1: 'Casa', 2: 'Trabajo', 3: 'Celular', 4: 'Oficina', 5: 'Fax' } },
    ],
    data: phoneData.filter(ph => ph.status === statusName.ACTIVO),
  });

  return (
    <MaterialTable
      title="Teléfono(s)"
      columns={statePhone.columns}
      data={statePhone.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const newPhone = { ...newData, status: statusName.ACTIVO };
              const data = [...statePhone.data];
              data.push(newPhone);
              setStatePhone({ ...statePhone, data });
              handleAction('add', data);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...statePhone.data];
              data[data.indexOf(oldData)].status = statusName.DELETED;
              setStatePhone({ ...statePhone, data });
              handleAction('delete', data);
            }, 600);
          }),
      }}
      localization={tableConstants.DEFAULT_LOCALIZATION}
    />
  );
};

export default Phones;
