import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './GuestRegistrationForm.css';

const GuestScreen = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    contact: '+91 ',
    gender: '',
    amount: '',
    paymentType: '',
    transactionId: '',
    numberOfPersons: 1,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    contact: Yup.string().required('Contact Number is required'),
    gender: Yup.string().required('Gender is required'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive'),
    paymentType: Yup.string().required('Payment Type is required'),
    transactionId: Yup.string().test(
      'transactionIdRequired',
      'Transaction ID is required',
      function(value) {
        const { paymentType } = this.parent;
        if (paymentType === 'scan') {
          return value ? true : this.createError({ path: this.path, message: 'Transaction ID is required' });
        }
        return true;
      }
    ),
    numberOfPersons: Yup.number()
      .required('Number of Persons is required')
      .min(1, 'Number of Persons cannot be less than 1'),
  });

  const handleSubmit = (values) => {
    alert('Form saved successfully!');
    console.log('Form values:', values);
  };

  return (
    <div className="guest-registration-container">
      <div className="guest-registration-form">
        <h2>Guest Registration</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="guest-form-group">
                <div className="input-row">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                  />
                </div>
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>

              <div className="guest-form-group">
                <div className="input-row">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>

              <div className="guest-form-group">
                <div className="input-row">
                  <label htmlFor="contact">Contact Number</label>
                  <Field
                    type="tel"
                    id="contact"
                    name="contact"
                    placeholder="Enter your contact number"
                  />
                </div>
                <ErrorMessage name="contact" component="div" className="error" />
              </div>

              <div className="guest-form-group">
                <div className="input-row">
                  <label>Gender</label>
                  <Field as="select" name="gender" id="gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
                <ErrorMessage name="gender" component="div" className="error" />
              </div>

              <div className="guest-form-group">
                <div className="input-row">
                  <label htmlFor="amount">Amount</label>
                  <Field type="number" id="amount" name="amount" placeholder="Enter amount" />
                </div>
                <ErrorMessage name="amount" component="div" className="error" />
              </div>

              <div className="guest-form-group">
                <div className="input-row">
                  <label>Payment Type</label>
                  <Field as="select" name="paymentType" id="paymentType">
                    <option value="">Select Payment Type</option>
                    <option value="cash">Cash</option>
                    <option value="scan">Scan</option>
                  </Field>
                </div>
                <ErrorMessage name="paymentType" component="div" className="error" />
              </div>

              {values.paymentType === 'scan' && (
                <div className="guest-form-group">
                  <div className="input-row">
                    <label htmlFor="transactionId">Transaction ID</label>
                    <Field
                      type="text"
                      id="transactionId"
                      name="transactionId"
                      placeholder="Enter transaction ID"
                    />
                  </div>
                  <ErrorMessage name="transactionId" component="div" className="error" />
                </div>
              )}

              <div className="guest-form-group">
                <div className="input-row">
                  <label htmlFor="numberOfPersons">Number of Persons</label>
                  <Field
                    type="number"
                    id="numberOfPersons"
                    name="numberOfPersons"
                    min="1"
                  />
                </div>
                <ErrorMessage name="numberOfPersons" component="div" className="error" />
              </div>

              <div className="guest-form-group">
                <button type="submit" className="guest-save-btn">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GuestScreen;