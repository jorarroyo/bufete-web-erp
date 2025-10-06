import { statusName, tableConstants } from 'app/constants/appConstant';
import ProductServices from 'app/services/inventory/productService';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

const StampProdDetail = props => {
  const dispatch = useDispatch();
  const { handleAction, stampData } = props;
  const [stampList, setStampList] = useState([]);
  const [invDetail, setInvDetail] = useState([]);

  async function fetchData() {
    if (stampList.length === 0) {
      const response = await ProductServices.getStampList();
      setStampList(response.map(stp => ({ id: stp.id, label: stp.name })));
    }
  }

  const showStampName = rowData => {
    const stampName = stampList.find(stp => stp.id === rowData.product_id).name;
    return <p>{stampName}</p>;
  };

  useEffect(() => {
    if (stampList.length === 0) {
      fetchData();
    } else {
      setInvDetail({
        columns: [
          { title: 'Id', field: 'id', hidden: true },
          { title: 'Estado', field: 'status', hidden: true },
          {
            title: 'Código',
            field: 'product_id',
            render: showStampName,
            editComponent: propsSelect => (
              <Select
                options={stampList}
                value={stampList.find(dep => dep.id === propsSelect.value)}
                onChange={value => propsSelect.onChange(value.id)}
              />
            ),
          },
          { title: 'Descripción', field: 'name' },
          { title: 'Exit.', field: 'existence' },
          { title: 'Cantidad', field: 'quantity', type: 'numeric' },
          { title: 'Importe', field: 'value', type: 'numeric' },
        ],
        data: stampData.filter(ad => ad.status === statusName.ACTIVO),
      });
    }
  }, [stampList, dispatch, stampData]);

  return (
    <MaterialTable
      title="Detalle de Timbres"
      columns={invDetail.columns}
      data={invDetail.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const newAddress = { ...newData, status: statusName.ACTIVO };
              const data = [...invDetail.data];
              data.push(newAddress);
              setInvDetail({ ...invDetail, stampData });
              handleAction('add', data);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...invDetail.data];
              data[data.indexOf(oldData)].status = statusName.DELETED;
              setInvDetail({ ...invDetail, stampData });
              handleAction('delete', data);
            }, 600);
          }),
      }}
      localization={tableConstants.DEFAULT_LOCALIZATION}
    />
  );
};

export default StampProdDetail;
