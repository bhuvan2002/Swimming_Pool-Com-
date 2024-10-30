import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card"; // Import Card component
import { useNavigate } from "react-router-dom";
import "./membersinfo.css";

const MemberList = () => {
  const navigate = useNavigate();

  const goToAboutPage = () => {
    console.log("Navigating to New Member Registration"); // Debugging log
    navigate("/NewMemberRegistration"); // Ensure this matches the route
  };

  const [membersExpiringToday] = useState([
    {
      name: "Srinidhi",
      contact: "1234567890",
      paymentstatus: "Paid",
      payment: "5000",
      package: "Basic",
    },
    {
      name: "Vijay",
      contact: "0987654321",
      paymentstatus: "Pending",
      payment: "2000",
      package: "Premium",
    },
    {
      name: "Pavan",
      contact: "1112223334",
      paymentstatus: "Partial",
      payment: "1200",
      package: "Standard",
    },
  ]);

  const [membersExpiringIn5Days] = useState([
    {
      name: "Pavan",
      contact: "1112223334",
      paymentstatus: "Partial",
      payment: "1400",
      package: "Standard",
    },
    {
      name: "Srinidhi",
      contact: "1234567890",
      paymentstatus: "Paid",
      payment: "5000",
      package: "Basic",
    },
    {
      name: "Vijay",
      contact: "0987654321",
      paymentstatus: "Paid",
      payment: "10000",
      package: "Premium",
    },
  ]);

  const [allMembers] = useState([
    {
      name: "Bhuvan",
      contact: "2223334445",
      paymentstatus: "Pending",
      payment: "5000",
      daysLeft: "10",
      package: "Basic",
    },
    {
      name: "Srinidhi",
      contact: "1234567890",
      paymentstatus: "Paid",
      payment: "15000",
      package: "Basic",
    },
    {
      name: "Vijay",
      contact: "0987654321",
      paymentstatus: "Partial",
      payment: "2000",
      package: "Premium",
    },
  ]);

  const actionTemplate = () => (
    <div>
      <Button icon="pi pi-pencil" className="p-button-rectangular mr-2" />
      <Button icon="pi pi-trash" className="p-button-rectangular mr-2" />
      <Button icon="pi pi-refresh" className="p-button-rectangular p-button-info" />
    </div>
  );

  const titleStyle = {
    fontFamily: "'YourChosenFont', sans-serif", // Replace with your desired font
    fontSize: "1.5rem", // Adjust size as needed
    color: "#333", // Set your desired text color
  };

  return (
    <div>
      <div className="add-member-container">
        <Button
          label="Add Member"
          icon="pi pi-plus"
          className="add-member-button"
          onClick={goToAboutPage}
        />
      </div>

      <Card title={<span style={titleStyle}>Members List - Expiring Today</span>} style={{ backgroundColor: "white" }} className="mt-5">
        <DataTable value={membersExpiringToday} className="custom-table">
          <Column field="name" header="Name" />
          <Column field="contact" header="Contact" />
          <Column field="paymentstatus" header="Payment Status" />
          <Column field="payment" header="Payment" />
          <Column field="package" header="Package" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </Card>

      <Card title={<span style={titleStyle}>Members List - Expiring in 5 Days</span>} style={{ backgroundColor: "white" }} className="mt-5">
        <DataTable value={membersExpiringIn5Days} className="custom-table">
          <Column field="name" header="Name" />
          <Column field="contact" header="Contact" />
          <Column field="paymentstatus" header="Payment Status" />
          <Column field="payment" header="Payment" />
          <Column field="package" header="Package" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </Card>

      <Card title={<span style={titleStyle}>Full Members List</span>} style={{ backgroundColor: "white" }} className="mt-5">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "60%" }}>
          <div className="p-inputgroup" style={{ flexGrow: 2, marginLeft: "20px" }}>
            <span className="p-inputgroup-addon">
              <i className="pi pi-search"></i>
            </span>
            <InputText
              placeholder="Search Members ( Enter Name or Contact Number )"
              style={{ width: "100%", minWidth: "250px", marginTop:"" }}
            />
          </div>
        </div>
        <DataTable value={allMembers} className="custom-table" style={{ marginTop: "10px" }}>
          <Column field="name" header="Name" />
          <Column field="contact" header="Contact" />
          <Column field="paymentstatus" header="Payment Status" />
          <Column field="payment" header="Payment" />
          <Column field="daysLeft" header="No of Days" />
          <Column field="package" header="Package" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </Card>
    </div>
  );
};

export default MemberList;
