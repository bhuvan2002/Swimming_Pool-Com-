import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// SmsSettings Component
const SmsSettings = () => {
  return (
    <div className="sms-settings-container">
      <Formik
        initialValues={{
          fiveDaysEarlier: '',
          oneDayBefore: '',
          expiryDay: '',
          oneMonthExpired: '',
          registrationMessage: '',
          registrationSuccessMessage: '',
        }}
        validationSchema={Yup.object({
          fiveDaysEarlier: Yup.string().required('5 Days Earlier Data Required'),
          oneDayBefore: Yup.string().required('1 Day Before Data Required'),
          expiryDay: Yup.string().required('Expiry Day Data Required'),
          oneMonthExpired: Yup.string().required('One Month Expired Data Required'),
          registrationMessage: Yup.string().required('Registration Message Data Required'),
          registrationSuccessMessage: Yup.string().required('Registration Success Message Data Required'),
        })}
        onSubmit={(values) => {
          console.log('SMS Settings Submitted: ', values);
        }}
      >
        {() => (
          <Form className="sms-settings-form">
            <h2>SMS Settings</h2>
            <div className="sms-settings-group">
              <label htmlFor="fiveDaysEarlier">5 Days Earlier:</label>
              <Field type="text" id="fiveDaysEarlier" name="fiveDaysEarlier" />
              <ErrorMessage name="fiveDaysEarlier" component="div" className="error" />
            </div>
            <div className="sms-settings-group">
              <label htmlFor="oneDayBefore">1 Day Before:</label>
              <Field type="text" id="oneDayBefore" name="oneDayBefore" />
              <ErrorMessage name="oneDayBefore" component="div" className="error" />
            </div>
            <div className="sms-settings-group">
              <label htmlFor="expiryDay">Expiry Day:</label>
              <Field type="text" id="expiryDay" name="expiryDay" />
              <ErrorMessage name="expiryDay" component="div" className="error" />
            </div>
            <div className="sms-settings-group">
              <label htmlFor="oneMonthExpired">One Month Expired:</label>
              <Field type="text" id="oneMonthExpired" name="oneMonthExpired" />
              <ErrorMessage name="oneMonthExpired" component="div" className="error" />
            </div>
            <div className="sms-settings-group">
              <label htmlFor="registrationMessage">Registration Message:</label>
              <Field type="text" id="registrationMessage" name="registrationMessage" />
              <ErrorMessage name="registrationMessage" component="div" className="error" />
            </div>
            <div className="sms-settings-group">
              <label htmlFor="registrationSuccessMessage">Registration Success Message:</label>
              <Field type="text" id="registrationSuccessMessage" name="registrationSuccessMessage" />
              <ErrorMessage name="registrationSuccessMessage" component="div" className="error" />
            </div>
            <button type="submit" className="sms-settings-save-btn">Save</button>
          </Form>
        )}
      </Formik>

      <style jsx>{`
        /* SmsSettings.css */

        /* Form Container */
        .sms-settings-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .sms-settings-form h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        /* Input Group Styles */
        .sms-settings-group {
          margin-bottom: 15px;
        }

        .sms-settings-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        .sms-settings-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          transition: border-color 0.3s;
        }

        .sms-settings-group input:focus {
          border-color: #007bff;
          outline: none;
        }

        /* Error Message */
        .error {
          color: red;
          font-size: 12px;
        }

        /* Save Button */
        .sms-settings-save-btn {
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

        .sms-settings-save-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default SmsSettings;
