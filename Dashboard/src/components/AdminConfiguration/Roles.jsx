import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Roles Component
const Roles = () => {
  const [roles, setRoles] = useState([{ name: 'SuperAdmin', features: '' }]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', features: '' });
  const [editingRole, setEditingRole] = useState(null);

  const roleValidationSchema = Yup.object().shape({
    name: Yup.string().required('Role name is required'),
    features: Yup.string().required('Role features are required'),
  });

  const handleSaveRole = (values) => {
    if (editingRole !== null) {
      const updatedRoles = roles.map((role, index) =>
        index === editingRole ? values : role
      );
      setRoles(updatedRoles);
    } else {
      setRoles([...roles, values]);
    }
    setNewRole({ name: '', features: '' });
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  const handleEditRole = (index) => {
    setEditingRole(index);
    setNewRole(roles[index]);
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <div className="roles-container">
      <h2>Manage Roles</h2>
      <button className="add-role-button" onClick={() => setIsDialogOpen(true)}>
        Add Role
      </button>
      <table className="roles-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Features</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role.name}</td>
              <td>{role.features}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditRole(index)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteRole(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="role-dialog">
          <h3>{editingRole !== null ? 'Edit Role' : 'Add New Role'}</h3>
          <Formik
            initialValues={newRole}
            validationSchema={roleValidationSchema}
            onSubmit={handleSaveRole}
          >
            {() => (
              <Form className="dialog-form">
                <div className="form-group">
                  <label htmlFor="name">Role Name:</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="features">Role Features:</label>
                  <Field type="text" id="features" name="features" />
                  <ErrorMessage name="features" component="div" className="error" />
                </div>

                <div className="button-group">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" className="cancel-button" onClick={() => setIsDialogOpen(false)}>Cancel</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <style jsx>{`
        .roles-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .add-role-button {
          margin-bottom: 20px;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .add-role-button:hover {
          background-color: #0056b3;
        }

        .roles-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .roles-table th,
        .roles-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .roles-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        .roles-table tr:hover {
          background-color: #f9f9f9;
        }

        .edit-button, .delete-button {
          margin-right: 10px;
          border: none;
          background-color: #007bff;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .edit-button:hover {
          background-color: #0056b3;
        }

        .delete-button {
          background-color: #dc3545;
        }

        .delete-button:hover {
          background-color: #c82333;
        }

        .role-dialog {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          width: 400px;
        }

        .role-dialog h3 {
          margin-bottom: 15px;
          color: #333;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          border-color: #007bff;
          outline: none;
        }

        .error {
          color: red;
          font-size: 12px;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .save-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          flex: 1;
          margin-right: 5px;
          transition: background-color 0.3s;
        }

        .save-button:hover {
          background-color: #0056b3;
        }

        .cancel-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          flex: 1;
          margin-left: 5px;
          transition: background-color 0.3s;
        }

        .cancel-button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default Roles;
