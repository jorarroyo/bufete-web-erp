import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import logo from 'app/main/shared/images/logobufete.png';
import helperFunctions from 'app/utils/helperFunc';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  logo: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-start',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title: {
    fontSize: 18,
    // textAlign: 'center',
  },
  textRightAlign: {
    margin: 5,
    fontSize: 11,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
  },
  text: {
    margin: 5,
    fontSize: 11,
    textAlign: 'left',
    fontFamily: 'Times-Roman',
  },
  table: {
    display: 'table',
    width: 'auto',
    fontSize: 12,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'left',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableHeaderRow: {
    // margin: 'auto',
    flexDirection: 'row',
    // borderStyle: 'solid',
    // borderWidth: 1,
    backgroundColor: '#efefef',
  },
  tableCol: {
    width: '50%',
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'left',
  },
  footer: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  lineFooter: {
    left: 20,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    width: '93%',
    paddingBottom: 15,
    borderTopColor: 'grey',
  },
});

const ReceiptSettlementReport = props => {
  const { data } = props;

  const date = new Date();

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={{ flexDirection: 'row', marginBottom: '10' }} fixed>
          <View style={{ alignItems: 'flex-end', width: '40%' }}>
            <Image style={styles.logo} src={logo} />
          </View>
        </View>
        <Text style={styles.textRightAlign}>
          {`Guatemala, \n
            ${date.toLocaleDateString('es', options)}`}
        </Text>
        <Text style={styles.text}>
          {`Señores \n
            ${data.client_name}\n
            Ciudad`}
        </Text>
        <Text style={styles.textRightAlign}>Att.: Carlos Contreras</Text>
        <Text style={styles.text}>{data.header_text}</Text>
        <View style={styles.text}>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <View style={{ width: '60%' }}>
                <Text style={styles.tableCell}>CONCEPTO</Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text style={styles.tableCell}>CANTIDAD EN QUETZALES</Text>
              </View>
            </View>
            {data.details.map(det => (
              <View key={det.id} style={styles.tableRow}>
                <View style={{ width: '60%', textAlign: 'left' }}>
                  <Text style={styles.tableCell}>{det.description}</Text>
                </View>
                <View style={{ width: '40%', textAlign: 'right' }}>
                  <Text style={styles.tableCell}>{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', det.detail_total)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>TOTAL A PAGAR</Text>
          <Text style={styles.text}>{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', data.total)}</Text>
        </View>
        <Text style={styles.text}>{data.footer_text}</Text>
        <View style={styles.footer} fixed>
          <View style={styles.lineFooter} />
          <Text>
            {`Diagonal 6, 10-65 zona 10, Edificio Centro Gerencial Las Margaritas, Torre I of. 1701 Guatemala, Guatemala 01010 C.A.
            (502) 2389-7900 Fax (502) 2339-2955 www.bufeteolivero.com`}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptSettlementReport;
