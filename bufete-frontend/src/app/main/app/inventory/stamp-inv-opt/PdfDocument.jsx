import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import groupBy from 'lodash/groupBy';
import logo from 'app/main/shared/images/logobufete.png';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  content: {
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 18,
    // textAlign: 'center',
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
  tableCol: { width: '15%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColSmall: { width: '5%', borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 8, textAlign: 'left' },
  description: {
    // width: '35%',
    fontSize: 10,
    textAlign: 'right',
    flexDirection: 'row',
  },
  reference: {
    textAlign: 'left',
    width: '90%',
  },
  total: {
    // width: '65%',
    borderTopColor: 'black',
    borderTopWidth: 1,
    flexDirection: 'row',
    fontSize: 10,
  },
  tableFooter: {
    width: '5%',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  logo: {
    // width: 104,
    // height: 66,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-start',
  },
});

const PdfDocument = props => {
  const { dataHeader, dataList, totales } = props;
  const groupList = groupBy(dataList, n => n.client_name);

  function renderTableHeader() {
    return dataHeader.map((key, index) => {
      return (
        <View key={`header_${index}`} style={styles.tableColSmall}>
          <Text style={styles.tableCell}>{key}</Text>
        </View>
      );
    });
  }

  /* function renderTableRow(Row) {
    const newRow = Object.values(Row);
    newRow.splice(0, 7);
    return newRow.map((row, index) => {
      return (
        <View key={`header_${index}`} style={styles.tableColSmall}>
          <Text style={styles.tableCell}>{row}</Text>
        </View>
      );
    });
  } */

  function renderTableFooter(Row, isRow) {
    return Row.map((row, index) => {
      return (
        <View key={`footer_${index}`} style={isRow ? styles.tableColSmall : styles.tableFooter}>
          <Text style={styles.tableCell}>{row}</Text>
        </View>
      );
    });
  }

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.body} wrap>
        <View style={{ flexDirection: 'row', marginBottom: '10' }}>
          <View style={{ alignItems: 'flex-end', width: '30%' }}>
            <Image style={styles.logo} src={logo} />
          </View>
          <View>
            <Text style={styles.title}>Reporte de solicitudes de timbres</Text>
          </View>
        </View>
        <View style={styles.content}>
          {Object.keys(groupList).map(headerName => (
            <View key={headerName.substring(0, 4)}>
              <Text style={styles.institution}>{`Cliente: ${headerName}`}</Text>
              <View style={styles.text}>
                <View style={styles.table}>
                  <View style={styles.tableHeaderRow}>
                    {/* <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>No. Trx</Text>
                    </View> */}
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Fecha</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Solicitante</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>No. Exp</Text>
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell}>Total Qtz</Text>
                    </View>
                    {renderTableHeader()}
                  </View>
                  {/* {groupList[headerName].map(a => { */}
                  {/*  return ( */}
                  <Fragment key={`fragment_${groupList[headerName][0].id}`}>
                    <View key={groupList[headerName][0].id} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{groupList[headerName][0].request_date}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{groupList[headerName][0].requester_name}</Text>
                      </View>
                      <View style={styles.tableColSmall}>
                        <Text style={styles.tableCell}>{groupList[headerName][0].file_num}</Text>
                      </View>
                      {renderTableFooter(totales, true)}
                    </View>
                    <View key={`reference_${groupList[headerName][0].id}`} style={styles.tableRow}>
                      <Text style={styles.reference}>{groupList[headerName][0].reference}</Text>
                    </View>
                  </Fragment>
                  {/*  ); */}
                  {/* })} */}
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell} />
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell} />
                    </View>
                    <View style={styles.tableColSmall}>
                      <Text style={styles.tableCell} />
                    </View>
                    <View style={{ width: '10%' }}>
                      <Text style={styles.tableCell}>Total</Text>
                    </View>
                    {renderTableFooter(totales, false)}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
