import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import _ from '@lodash';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    margin: 12,
    textAlign: 'center',
  },
  institution: {
    fontSize: 12,
    margin: 12,
    textAlign: 'left',
  },
  text: {
    margin: 8,
    fontSize: 8,
    // textAlign: 'left',
  },
  textTotal: {
    margin: 12,
    fontSize: 14,
    textAlign: 'right',
  },
  textInvoiceTotal: {
    margin: 8,
    fontSize: 10,
    textAlign: 'right',
  },
  table: { display: 'table', width: 'auto', borderWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableHeaderRow: { margin: 'auto', flexDirection: 'row', borderStyle: 'solid', borderWidth: 1, backgroundColor: '#f5f5f5' },
  tableCol: { width: '25%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColSmall: { width: '10%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 8, textAlign: 'left' },
});

const PdfDocument = props => {
  const { dataHeader, dataList, invoiceList } = props;
  const groupList = _.groupBy(dataList, n => n.institution_name);
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.body} wrap>
        <Text style={styles.title}>Lista de pendientes de Procuración</Text>
        <Text style={styles.subtitle}>{`Fecha: ${dataHeader.assignDate}   Procurador: ${dataHeader.employeeName}`}</Text>
        {Object.keys(groupList).map(header => (
          <View key={header}>
            <Text style={styles.institution}>{header === 'null' ? 'Sin Institutcion' : header}</Text>
            <View style={styles.text}>
              <View style={styles.table}>
                <View style={styles.tableHeaderRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Actividad</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Expediente</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cliente</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Fec. Realiz.</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Estado</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Comentario</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Fondos</Text>
                  </View>
                </View>
                {groupList[header].map(a => {
                  return (
                    <Fragment key={a.id}>
                      <View key={a.id} style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{`${a.activity_name}\n${a.comment}`}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{a.file_num}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{a.client_name}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{a.assign_date}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{a.status}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}> </Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{`${a.currency_type === 1 ? 'QTZ' : 'USD'} ${a.activity_cost}`}</Text>
                        </View>
                      </View>
                    </Fragment>
                  );
                })}
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.textTotal}>{`Fondos: QTZ ${dataHeader.proctorAgendaCostLocal} USD ${dataHeader.proctorAgendaCostOuter}`}</Text>
        {invoiceList && invoiceList.length > 0 && (
          <View>
            <Text style={styles.subtitle}>Facturas</Text>
            <View>
              <View style={styles.text}>
                <View style={styles.table}>
                  <View style={styles.tableHeaderRow}>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Tipo</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Rango</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>No. Factura</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Fecha</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Total QTZ</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Total USD</Text>
                    </View>
                  </View>
                  {invoiceList.map(invoice => {
                    return (
                      <Fragment key={invoice.id}>
                        <View key={invoice.id} style={styles.tableRow}>
                          <View style={styles.tableColSmall}>
                            <Text style={styles.tableCell}>{`${invoice.invoice_type === 1 ? 'Recibo' : 'Factura'}`}</Text>
                          </View>
                          <View style={styles.tableColSmall}>
                            <Text style={styles.tableCell}>{invoice.invoice_range}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{invoice.invoice_num}</Text>
                          </View>
                          <View style={styles.tableColSmall}>
                            <Text style={styles.tableCell}>{invoice.assign_date}</Text>
                          </View>
                          <View style={styles.tableColSmall}>
                            <Text style={styles.tableCell}>{invoice.invoice_currency === 1 ? invoice.invoice_total : 0}</Text>
                          </View>
                          <View style={styles.tableColSmall}>
                            <Text style={styles.tableCell}>{invoice.invoice_currency === 2 ? invoice.invoice_total : 0}</Text>
                          </View>
                        </View>
                      </Fragment>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.textInvoiceTotal}>
              <View style={styles.table}>
                <View id="fondos" style={styles.tableRow}>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Fondos</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>{`QTZ ${dataHeader.proctorAgendaCostLocal}`}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{`USD ${dataHeader.proctorAgendaCostOuter}`}</Text>
                  </View>
                </View>
                <View id="gastos" style={styles.tableRow}>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Gastos</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>{`QTZ ${dataHeader.invoiceAmountLocal}`}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{`USD ${dataHeader.invoiceAmountOuter}`}</Text>
                  </View>
                </View>
                <View id="devolver" style={styles.tableRow}>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>Devolver</Text>
                  </View>
                  <View style={styles.tableColSmall}>
                    <Text style={styles.tableCell}>{`QTZ ${dataHeader.agendaReturnAmountLocal}`}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{`USD ${dataHeader.agendaReturnAmountOuter}`}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PdfDocument;
