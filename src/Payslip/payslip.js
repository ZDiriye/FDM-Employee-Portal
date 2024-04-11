import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pdf, Page, Text, View, Document, StyleSheet, PDFDownloadLink   } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import "./payslip.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 24,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
    color: '#0B5D93',
  },
  companyName: {
    fontSize: 18,
    textAlign: 'center',
    color: '#0B5D93', 
    fontWeight: 'bold',
    marginBottom: 4,
  },
  payslipDetailsSection: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    fontSize: 12,
    width: 140,
    color: '#0B5D93',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    width: 200,
    textAlign: 'right',
  }
});
// Create Document Component

const PayslipDocument = ({ payslipData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.companyName}>FDM Group Payslip</Text>
        <Text style={styles.title}>Payslip for Period: {payslipData.startDate} to {payslipData.endDate}</Text>
        <View style={styles.details}>
          <View style={styles.detailColumn}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Employee ID:</Text>
              <Text style={styles.value}>{payslipData.userId}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Payslip ID:</Text>
              <Text style={styles.value}>{payslipData.payslipId}</Text>
            </View>
          </View>
          <View style={styles.detailColumn}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Gross Pay:</Text>
              <Text style={styles.value}>£ {payslipData.grossPay}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Net Pay:</Text>
              <Text style={styles.value}>£ {payslipData.netPay}</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.detailColumn}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Tax Deducted:</Text>
              <Text style={styles.value}>£ {payslipData.taxAmount}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Other Deductions:</Text>
              <Text style={styles.value}>£ {payslipData.otherDeductions}</Text>
            </View>
          </View>
          <View style={styles.detailColumn}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Employer Contributions:</Text>
              <Text style={styles.value}>£ {payslipData.employerContrib}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Employee Contributions:</Text>
              <Text style={styles.value}>£ {payslipData.employeeContrib}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);


const PayslipSelector = () => {
    const [payslips, setPayslips] = useState([]);
    const [selectedPayslipId, setSelectedPayslipId] = useState("");
    const [loading, setLoading] = useState(false);

  
    useEffect(() => {
      const userId = 17;
      axios.post(`http://localhost:3001/getpayslip`, {userId})
        .then(response => {
          console.log(response.data);
          setPayslips(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the payslip data:', error);
        });
    }, []);

    const handleSelectionChange = (event) => {
      setSelectedPayslipId(event.target.value);
    };

    const handleDownloadClick = async () => {
      if (!selectedPayslipId) return;
  
      setLoading(true);
      const payslip = payslips.find(p => p.payslipId.toString() === selectedPayslipId);
  
      if (!payslip) {
        setLoading(false);
        alert('Payslip data not found.');
        return;
      }
  
      const blob = await pdf(<PayslipDocument payslipData={payslip} />).toBlob();
      saveAs(blob, `payslip-${selectedPayslipId}.pdf`);
      setLoading(false);
    };
  
    return (
      <div className="payslip-section">
          <h2>Latest Payslip</h2>
          <div className="payslip-controls">
          {payslips && payslips.length > 0 && (
            <select value={selectedPayslipId} onChange={(e) => setSelectedPayslipId(e.target.value) } >
              <option value="">Select a payslip</option>
              {payslips.map((payslip) => (
                <option key={payslip.payslipId} value={payslip.payslipId}>
                  Payslip {payslip.payslipId} - {payslip.date}
                </option>
              ))}
            </select>
          )}
         
          <button onClick={handleDownloadClick} disabled={!selectedPayslipId || loading}>
            {loading ? 'Generating...' : 'Download Payslip'}
          </button>
          </div>
        </div>
    );
  };
  
export default PayslipSelector;
