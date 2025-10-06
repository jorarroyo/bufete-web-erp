import { statusName, tableConstants } from 'app/constants/appConstant';
import CommonServices from 'app/services/shared';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

const Addresses = props => {
  const dispatch = useDispatch();
  const { handleAction, addressData } = props;
  const [departments, setDepartments] = useState([]);
  const [stateAddress, setStateAddress] = useState({});

  useEffect(() => {
    async function getDeptos() {
      if (departments.length === 0) {
        const response = await CommonServices.getDepartments();
        setDepartments(response);
      }
    }
    getDeptos();
  }, [departments.length])

  const showDepto = rowData => {
    const depName = departments.find(dep => dep.id === rowData.department);
    return <p>{depName ? depName.label : ''}</p>;
  };

  useEffect(() => {
    if (departments.length !== 0) {
      setStateAddress({
        columns: [
          { title: 'Id', field: 'id', hidden: true },
          { title: 'Estado', field: 'status', hidden: true },
          { title: 'Tipo', field: 'type', lookup: { 1: 'Domicilio', 2: 'Oficina(s)', 3: 'Fiscal', 4: 'EMail', 5: 'Otros' } },
          { title: 'Direccion', field: 'address' },
          { title: 'Zona', field: 'zone', type: 'numeric' },
          {
            title: 'Departamento',
            field: 'department',
            render: showDepto,
            editComponent: propsSelect => (
              <Select
                options={departments}
                value={departments ? departments.find(dep => dep.id === propsSelect.value) : ''}
                onChange={value => propsSelect.onChange(value.id)}
              />
            ),
          },
        ],
        data: addressData ? addressData.filter(ad => ad.status === statusName.ACTIVO) : [],
      });
    }
  }, [departments, dispatch, addressData]);

  return (
    <MaterialTable
      title="Direccion(es)"
      columns={stateAddress.columns}
      data={stateAddress.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const newAddress = { ...newData, status: statusName.ACTIVO };
              const data = [...stateAddress.data];
              data.push(newAddress);
              setStateAddress({ ...stateAddress, data });
              handleAction('add', data);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...stateAddress.data];
              data[data.indexOf(oldData)].status = statusName.DELETED;
              setStateAddress({ ...stateAddress, data });
              handleAction('delete', data);
            }, 600);
          }),
      }}
      localization={tableConstants.DEFAULT_LOCALIZATION}
    />
  );
};

export default Addresses;
