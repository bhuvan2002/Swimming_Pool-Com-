import React, { useState, useRef, useEffect } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css"; // Ensure your CSS includes styles for fixed header
import { PrimeIcons } from "primereact/api";
import { OverlayPanel } from "primereact/overlaypanel";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import GuestScreen from "./components/Guest/GuestScreen";
import MemberList from "./components/Members/membersInfo";
import SmsSettings from "./components/AdminConfiguration/SmsSettings";
import Settings from "./components/AdminConfiguration/Settings";
import Roles from "./components/AdminConfiguration/Roles";
import ReportGenerator from "./components/Reports/ReportGenerator";
import NewMemberRegistration from "./components/Members/NewMemberRegistration";
import PaymentReportGenerator from "./components/Reports/PaymentReportGenerator";
import Package from "./components/Packages/packages";
import UserProfileScreen from "./components/UserProfile/userProfile";
import Scheduler, { SchedulerProvider } from "./components/Schedular/Scheduler";
import UserProfiledashbord from "./components/UserProfile/userProfiledashbord";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [packages, setPackages] = useState([]);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const op = useRef(null);

  const handleAddPackage = (newPackage) => setPackages([...packages, newPackage]);
  const handleEditPackage = (index, updatedPackage) => {
    const newPackages = [...packages];
    newPackages[index] = updatedPackage;
    setPackages(newPackages);
  };
  const handleDeletePackage = (index) => setPackages(packages.filter((_, i) => i !== index));

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setIsZoomedOut(innerWidth <= 1899 && innerHeight <= 544);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (path) => {
    if (!sidebarVisible) {
      window.location.href = path;
    }
  };

  const items = [
    { 
      label: "Dashboard", 
      icon: "pi pi-fw pi-home", 
      command: () => (window.location.href = "/") 
    },
    {
      label: "Reports",
      icon: "pi pi-fw pi-chart-line",
      command: () => handleMenuClick("/reports/members-guests"),
      items: [
        { label: "Member & Guests", icon: "pi pi-users", command: () => (window.location.href = "/reports/members-guests") },
        { label: "Payments", icon: "pi pi-indian-rupee", command: () => (window.location.href = "/reports/payments") },
      ],
    },
    { 
      label: "Members", 
      icon: "pi pi-fw pi-users", 
      command: () => (window.location.href = "/members") 
    },
    { 
      label: "Scheduler", 
      icon: "pi pi-fw pi-calendar", 
      command: () => (window.location.href = "/scheduler") 
    },
    { 
      label: "Guest", 
      icon: "pi pi-users", 
      command: () => (window.location.href = "/guest") 
    },
    { 
      label: "Packages", 
      icon: "pi pi-tag", 
      command: () => (window.location.href = "/packages") 
    },
    {
      label: "Admin Configuration",
      icon: "pi pi-user",
      command: () => handleMenuClick("/admin/smssettings"),
      items: [
        { label: "SMS", icon: "pi pi-comment", command: () => (window.location.href = "/admin/smssettings") },
        { label: "Settings", icon: "pi pi-cog", command: () => (window.location.href = "/admin/settings") },
        { label: "Roles", icon: "pi pi-users", command: () => (window.location.href = "/admin/roles") },
      ],
    },
  ];

  return (
    <Router>
      <SchedulerProvider>
        <div className={`app-container ${isZoomedOut ? "zoom-out" : ""}`}>
          <div className="header">
            <div className="logo-container">
              <img src="/img/MARLIN.png" alt="Company Logo" className="company-logo" />
            </div>
            <div className="fonty">
              <h2 style={{ color: 'white' }}>MARLIN AQUATIC CENTER MANAGEMENT</h2>
            </div>
            <img
              src="/img/User.png"
              alt="Profile"
              className="profile-photo"
              onClick={(e) => op.current.toggle(e)}
              style={{ cursor: "pointer" }}
            />
            <OverlayPanel ref={op} dismissable className="profile-overlay">
              <ul className="profile-options">
                <li className="profile-option">
                  <Link to="/user/profile">
                    <Button icon={PrimeIcons.USER} label="Profile" className="p-button-text profile-btn" />
                  </Link>
                </li>
                <li className="profile-option">
                  <Link to="/user/dashboard">
                    <Button icon={PrimeIcons.HOME} label="Dashboard" className="p-button-text profile-btn" />
                  </Link>
                </li>
                <li className="profile-option" onClick={() => window.location.href = "https://swimming-landing.vercel.app/login"}>
                  <Button icon={PrimeIcons.SIGN_OUT} label="Logout" className="p-button-text profile-btn" />
                </li>
              </ul>
            </OverlayPanel>
          </div>

          <div className="main-content">
            <div className={`sidebar ${sidebarVisible ? "expanded" : "collapsed"}`}>
              <Button
                icon="pi pi-bars"
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="toggle-button"
              />
              {sidebarVisible ? (
                <PanelMenu model={items} style={{ width: "100%" }} />
              ) : (
                <div className="collapsed-menu">
                  {items.map((item, index) => (
                    <Button
                      key={index}
                      icon={item.icon}
                      className="collapsed-menu-icon"
                      onClick={item.command}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className={`content-area ${sidebarVisible ? "expanded" : "collapsed"}`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin/smssettings" element={<SmsSettings />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/admin/roles" element={<Roles />} />
                <Route path="/members" element={<MemberList />} />
                <Route path="/guest" element={<GuestScreen />} />
                <Route path="/reports/members-guests" element={<ReportGenerator />} />
                <Route path="/reports/payments" element={<PaymentReportGenerator />} />
                <Route path="/NewMemberRegistration" element={<NewMemberRegistration />} />
                <Route path="/packages" element={
                  <Package
                    packages={packages}
                    addPackage={handleAddPackage}
                    editPackage={handleEditPackage}
                    deletePackage={handleDeletePackage}
                  />
                } />
                <Route path="/scheduler" element={<Scheduler />} />
                <Route path="/user/profile" element={<UserProfileScreen />} />
                <Route path="/user/dashboard" element={<UserProfiledashbord />} />
              </Routes>
            </div>
          </div>

          <div className="footer" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30px" }}>
            © 2024 Marlin Aquatic Center Viewer Edition. All Rights Reserved.
          </div>
        </div>
      </SchedulerProvider>
    </Router>
  );
};

export default App;