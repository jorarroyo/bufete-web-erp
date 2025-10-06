import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import groupBy from 'lodash/groupBy';
import logo from 'app/main/shared/images/logobufete.png';
import helperFunctions from 'app/utils/helperFunc';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
  },
  logo: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-start',
  },
  institution: {
    fontSize: 12,
    margin: 12,
    textAlign: 'left',
  },
  text: {
    margin: 8,
    fontSize: 8,
  },
  table: { display: 'table', width: 'auto', borderWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableHeaderRow: { margin: 'auto', flexDirection: 'row', borderStyle: 'solid', borderWidth: 1, backgroundColor: '#f5f5f5' },
  tableCol: { width: '15%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColSmall: { width: '8%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColTotal: { width: '25%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 8, textAlign: 'left' },
  tableCellRight: { margin: 'auto', marginTop: 5, fontSize: 8, textAlign: 'right' },
  textInvoiceTotal: {
    margin: 8,
    fontSize: 10,
    textAlign: 'right',
  },
});

const PDFDocument = props => {
  const { dataList } = props;
  const groupList = groupBy(dataList, n => n.series_value);
  const receiptTotal = dataList.reduce((accumulator, currentValue) => accumulator + currentValue.receipt_total * currentValue.exchange_rate, 0);
  const receiptTotalNoIVA = Math.round((receiptTotal / 1.12) * 100.0) / 100.0;
  const receiptIVA = Math.round(receiptTotalNoIVA * 0.12 * 100.0) / 100.0;
  const receiptISR = Math.round(((receiptTotalNoIVA - 30000) * 0.07 + 1500) * 100.0) / 100.0;
  const totalRetention =
    Math.round(dataList.reduce((accumulator, currentValue) => accumulator + currentValue.receipt_retention * currentValue.exchange_rate, 0) * 100.0) /
    100.0;
  const payedISR = receiptISR - totalRetention;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.body} wrap>
        <View style={{ flexDirection: 'row', marginBottom: '10' }}>
          <View style={{ alignItems: 'flex-end', width: '30%' }}>
            <Image style={styles.logo} src={logo} />
          </View>
          <View>
            <Text style={styles.title}>Reporte de listado de facturas</Text>
          </View>
        </View>
        <View>
          {Object.keys(groupList).map(seriesName => (
            <View key={seriesName.substring(0, 4)}>
              <Text style={styles.institution}>{`Serie: ${seriesName}`}</Text>
              <View style={styles.text}>
                <View style={styles.table}>
                  <View style={styles.tableHeaderRow}>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Estado</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Nombre</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>No. Factura</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Fecha</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Moneda</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Tipo Cambio</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Valor Factura</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>sin IVA</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Con Retención</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Sin Retención</Text>
                    </View>
                  </View>
                  {groupList[seriesName].map(det => (
                    <Fragment key={`fragment_${det.id}`}>
                      <View key={det.id} style={styles.tableRow}>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{det.status}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{det.client_name}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{det.serial_number}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{det.receipt_date}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{det.currency_name}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{helperFunctions.formatNumber2(det.exchange_rate)}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{helperFunctions.formatNumber2(det.receipt_total)}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{helperFunctions.formatNumber2(det.receipt_total_no_iva)}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{helperFunctions.formatNumber2(det.receipt_retention)}</Text>
                        </View>
                        <View style={styles.tableColSmall}>
                          <Text style={styles.tableCell}>{helperFunctions.formatNumber2(det.receipt_no_retention)}</Text>
                        </View>
                      </View>
                    </Fragment>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
        <View />
        <View>
          <View style={styles.table}>
            <View id="total" style={styles.tableRow}>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>TOTAL:</Text>
              </View>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTO', receiptTotal)}</Text>
              </View>
            </View>
            <View id="iva" style={styles.tableRow}>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>IVA:</Text>
              </View>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTO', receiptIVA)}</Text>
              </View>
            </View>
            <View id="no_iva" style={styles.tableRow}>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>SIN IVA:</Text>
              </View>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTO', receiptTotalNoIVA)}</Text>
              </View>
            </View>
            <View id="isr" style={styles.tableRow}>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>TOTAL ISR:</Text>
              </View>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTO', receiptISR)}</Text>
              </View>
            </View>
            <View id="retention" style={styles.tableRow}>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>CON RETENCION:</Text>
              </View>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTO', totalRetention)}</Text>
              </View>
            </View>
            <View id="isr_pagar" style={styles.tableRow}>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>ISR POR PAGAR:</Text>
              </View>
              <View style={styles.tableColTotal}>
                <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTO', payedISR)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
