import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import "./membersinfo.css";

const MemberList = () => {
  const navigate = useNavigate();
  const [membersExpiringToday, setMembersExpiringToday] = useState([]);
  const [membersExpiringIn5Days, setMembersExpiringIn5Days] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToAboutPage = () => {
    console.log("Navigating to New Member Registration");
    navigate("/NewMemberRegistration");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/membersData.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMembersExpiringToday(data.membersExpiringToday);
        setMembersExpiringIn5Days(data.membersExpiringIn5Days);
        setAllMembers(data.allMembers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const actionTemplate = () => (
    <div>
      <Button icon="pi pi-pencil" className="p-button-rectangular mr-2" />
      <Button icon="pi pi-trash" className="p-button-rectangular mr-2" />
      <Button icon="pi pi-refresh" className="p-button-rectangular p-button-info" />
    </div>
  );

  const titleStyle = {
    fontFamily: "'YourChosenFont', sans-serif",
    fontSize: "1.5rem",
    color: "#333",
    textAlign: "left",
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

      <Card style={{ backgroundColor: "white" }} className="mt-5 margin-bottom">
        <div style={{ marginBottom: "20px", marginLeft: "-1210px",fontSize: "1.5rem", fontWeight: "bold", ...titleStyle }}>Members List - Expiring Today</div>
        <DataTable value={membersExpiringToday} className="custom-table">
          <Column field="name" header="Name" />
          <Column field="contact" header="Contact" />
          <Column field="paymentstatus" header="Payment Status" />
          <Column field="payment" header="Payment" />
          <Column field="package" header="Package" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </Card>

      <Card style={{ backgroundColor: "white" }} className="mt-5">
        <div style={{ marginBottom: "20px", marginLeft: "-1160px",fontSize: "1.5rem", fontWeight: "bold", ...titleStyle }}>Members List - Expiring in 5 Days</div>
        <DataTable value={membersExpiringIn5Days} className="custom-table">
          <Column field="name" header="Name" />
          <Column field="contact" header="Contact" />
          <Column field="paymentstatus" header="Payment Status" />
          <Column field="payment" header="Payment" />
          <Column field="package" header="Package" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </Card>

      <Card style={{ backgroundColor: "white" }} className="mt-5">
        <div style={{ display: "flex", marginLeft: "-1030px",justifyContent: "space-between", marginBottom: "20px", fontSize: "1.5rem", fontWeight: "bold", ...titleStyle }}>
          <span style={titleStyle}>Full Members List</span>
          <div className="p-inputgroup" style={{ maxWidth: "40%", marginLeft: "20px" }}>
            <span className="p-inputgroup-addon">
              <i className="pi pi-search"></i>
            </span>
            <InputText
              placeholder="Search Members ( Enter Name or Contact Number )"
              style={{ width: "100%", minWidth: "250px" }}
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