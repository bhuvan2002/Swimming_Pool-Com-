import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './PaymentReportGenerator.css';

const PaymentReportGenerator = () => {
    const [displayDialog, setDisplayDialog] = useState(false);
    const [data, setData] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    
    const [membersData] = useState([
        { name: 'John Doe', contact: 'john@example.com', package: 'Premium', amount: 200, paymentMethod: 'Cash' },
        { name: 'Jane Smith', contact: 'jane@example.com', package: 'Basic', amount: 100, paymentMethod: 'UPI' },
        { name: 'Alice Johnson', contact: 'alice@example.com', package: 'Standard', amount: 150, paymentMethod: 'Card' },
        // Add more entries as needed
    ]);

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Month', value: 'Monthly' },
        { label: 'Last 3 Months', value: 'current_quarter_month' },
        { label: 'Last 6 Months', value: 'last_half_year' },
        { label: 'Last 1 Year', value: 'last_1year' },
    ];

    const paymentMethodOptions = [
        { label: 'All', value: 'all' },
        { label: 'Cash', value: 'cash' },
        { label: 'UPI', value: 'upi' },
        { label: 'Card', value: 'card' },
    ];

    const handleGenerateReport = () => {
        let reportData = membersData;

        // Filter by payment method
        if (selectedPaymentMethod && selectedPaymentMethod !== 'all') {
            reportData = reportData.filter(member => member.paymentMethod.toLowerCase() === selectedPaymentMethod);
        }

        setData(reportData);
        setDisplayDialog(true);
    };

    const exportToPdf = () => {
        const input = document.getElementById('data-table');
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // Set width according to your needs
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            pdf.save('payment-report.pdf');
        });
    };

    const exportToExcel = () => {
        console.log("Export to Excel clicked");
        // Implement Excel export logic
    };

    return (
        <div className="payment-report-generator">
            <h2>Payment Report Generator</h2>
            <div className="payment-report-input-section">
                <label></label>
                <Calendar value={fromDate} onChange={(e) => setFromDate(e.value)} showIcon placeholder="Select From Date" />
                <label></label>
                <Calendar value={toDate} onChange={(e) => setToDate(e.value)} showIcon placeholder="Select To Date" />
                <label></label>
                <Dropdown value={selectedFilter} options={filterOptions} onChange={(e) => setSelectedFilter(e.value)} placeholder="Select Filter" />
                <label></label>
                <Dropdown value={selectedPaymentMethod} options={paymentMethodOptions} onChange={(e) => setSelectedPaymentMethod(e.value)} placeholder="Select Payment Method" />
                <div style={{ display: 'flex', height: '9vh', marginLeft: '74%', width: '250px' }}>
                    <Button 
                        label="Generate Report" 
                        icon="pi pi-file"
                        onClick={handleGenerateReport} 
                        className="generate-reporter-btn" 
                    />
                </div>
            </div>

            <Dialog header="Payment Report" visible={displayDialog} onHide={() => setDisplayDialog(false)} style={{ width: '70vw' }}>
                <div className="dialog-content-wrapper">
                    <h3>Summary</h3>
                    <div className="payment-report-summary-section">
                        <p>Total Payments Collected: 500 RS</p>
                        <p>Total Pending Payments: 10 RS</p>
                        <p>Other Data: 100 RS</p>
                    </div>
                    <div id="data-table" className="payment-report-data-table">
                        <DataTable value={data} paginator rows={5} header="Payment Report" className='payment-report-datatable'>
                            <Column field="name" header="Name" sortable />
                            <Column field="contact" header="Contact" sortable />
                            <Column field="package" header="Package" sortable />
                            <Column field="amount" header="Amount" sortable />
                            <Column field="paymentMethod" header="Payment Method" sortable />
                        </DataTable>
                    </div>
                    <div className="export-buttons-container">
                        <Button label="Export to PDF" className="export-pdf-btn" onClick={exportToPdf} />
                        <Button label="Export to Excel" className="export-excel-btn" onClick={exportToExcel} />
                    </div>
                    <h3>All Members/Guests</h3>
                    <DataTable value={membersData} paginator rows={5} header="Members/Guests" className='payment-report-members-datatable'>
                        <Column field="name" header="Name" sortable />
                        <Column field="contact" header="Contact" sortable />
                        <Column field="package" header="Package" sortable />
                        <Column field="paymentMethod" header="Payment Method" sortable />
                    </DataTable>
                </div>
            </Dialog>
        </div>
    );
};

export default PaymentReportGenerator;
