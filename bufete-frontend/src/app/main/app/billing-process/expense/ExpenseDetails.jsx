import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Tooltip, IconButton, Icon, Typography } from '@material-ui/core';
import * as Actions from 'app/main/app/billing-process/store/actions/expenses';
import { statusName } from 'app/constants/appConstant';
import ExpenseDetailsDialog from './ExpenseDetailsDialog';

const useStyles = makeStyles({
  tableCell: {
    padding: '0 8px !important',
  },
});

function ExpenseDetails(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { expenseDetailsData, disabled } = props;

  return (
    <>
      <div>
        <div className="pb-68">
          <div className="pb-16 flex items-center">
            <Typography className="h2" color="textSecondary">
              Detalle de Gasto(s)
            </Typography>
          </div>
          <div className="mb-24">
            <div className="table-responsive">
              <table className="simple">
                <thead>
                  <tr>
                    <th>Numero de Expediente</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    {disabled === false && <th>...</th>}
                  </tr>
                </thead>
                <tbody>
                  {expenseDetailsData &&
                    expenseDetailsData
                      .filter(item => item.status !== statusName.ELIMINADO)
                      .map(expenseDetail => (
                        <tr key={expenseDetail.id}>
                          <td className={classes.tableCell}>
                            <span className="truncate">{expenseDetail.record_file_name}</span>
                          </td>
                          <td className={classes.tableCell}>
                            <span className="truncate">{expenseDetail.record_client_name}</span>
                          </td>
                          <td className={classes.tableCell}>
                            <span className="truncate">{expenseDetail.expense_value}</span>
                          </td>
                          {disabled === false && (
                            <td className={classes.tableCell}>
                              <div className="flex items-center">
                                <Tooltip disabled={expenseDetail.status === statusName.FINALIZADO} title="Editar">
                                  <IconButton
                                    onClick={ev => {
                                      ev.stopPropagation();
                                      dispatch(Actions.openEditExpenseDetailsDialog(expenseDetail.id));
                                    }}
                                  >
                                    <Icon>edit</Icon>
                                  </IconButton>
                                </Tooltip>
                                <Tooltip disabled={expenseDetail.status === statusName.FINALIZADO} title="Eliminar">
                                  <IconButton
                                    onClick={ev => {
                                      ev.stopPropagation();
                                      dispatch(Actions.deleteExpenseDetails(expenseDetail.id));
                                    }}
                                  >
                                    <Icon>delete</Icon>
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ExpenseDetailsDialog />
    </>
  );
}

export default ExpenseDetails;
