import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Settings Component
const Settings = () => {
  return (
    <div className="settings-container">
      <Formik
        initialValues={{
          otpTimeout: '',
          homeScreenImage1: null,
          homeScreenImage2: null,
          homeScreenImage3: null,
          contactNumber: '',
          contactAddress: '',
          emailId: '',
          noOfSlots: '',
        }}
        validationSchema={Yup.object({
          otpTimeout: Yup.string().required('OTP Timeout is Required'),
          contactNumber: Yup.string().required('Contact Number is Required'),
          contactAddress: Yup.string().required('Contact Address is Required'),
          emailId: Yup.string().email('Invalid email address').required('Email ID is Required'),
          noOfSlots: Yup.string().required('Number of Slots is Required'),
        })}
        onSubmit={(values) => {
          console.log('Settings Submitted: ', values);
        }}
      >
        {() => (
          <Form className="settings-form">
            <h2>Settings</h2>

            <div className="settings-group">
              <label htmlFor="otpTimeout">OTP Timeout:</label>
              <Field type="text" id="otpTimeout" name="otpTimeout" />
              <ErrorMessage name="otpTimeout" component="div" className="error" />
            </div>

            <div className="settings-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <Field type="text" id="contactNumber" name="contactNumber" />
              <ErrorMessage name="contactNumber" component="div" className="error" />
            </div>

            <div className="settings-group">
              <label htmlFor="contactAddress">Contact Address:</label>
              <Field type="text" id="contactAddress" name="contactAddress" />
              <ErrorMessage name="contactAddress" component="div" className="error" />
            </div>

            <div className="settings-group">
              <label htmlFor="emailId">Email ID:</label>
              <Field type="email" id="emailId" name="emailId" />
              <ErrorMessage name="emailId" component="div" className="error" />
            </div>

            <div className="settings-group">
              <label htmlFor="noOfSlots">Number of Slots:</label>
              <Field type="text" id="noOfSlots" name="noOfSlots" />
              <ErrorMessage name="noOfSlots" component="div" className="error" />
            </div>

            <div className="settings-group">
              <label htmlFor="homeScreenImage1">Home Screen Image 1:</label>
              <input type="file" id="homeScreenImage1" name="homeScreenImage1" />
            </div>

            <div className="settings-group">
              <label htmlFor="homeScreenImage2">Home Screen Image 2:</label>
              <input type="file" id="homeScreenImage2" name="homeScreenImage2" />
            </div>

            <div className="settings-group">
              <label htmlFor="homeScreenImage3">Home Screen Image 3:</label>
              <input type="file" id="homeScreenImage3" name="homeScreenImage3" />
            </div>

            <button type="submit" className="settings-save-btn">Save</button>
          </Form>
        )}
      </Formik>

      <style jsx>{`
        /* Settings.css */

        /* Form Container */
        .settings-container {
          max-width: 800px; /* Increased width */
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .settings-form h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        /* Input Group Styles */
        .settings-group {
          margin-bottom: 15px;
        }

        .settings-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        .settings-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          transition: border-color 0.3s;
        }

        .settings-group input:focus {
          border-color: #007bff;
          outline: none;
        }

        /* Error Message */
        .error {
          color: red;
          font-size: 12px;
        }

        /* Save Button */
        .settings-save-btn {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .settings-save-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Settings;
