import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import './packages.css';

const Package = ({ packages, addPackage, editPackage, deletePackage }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [packageDuration, setPackageDuration] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [errors, setErrors] = useState({
    packageName: '',
    bulletPoints: '',
    packageCost: '',
    packageDuration: '',
    uploadedImage: '',
    discount: '',
    startDate: ''
  });

  const handleAddPackageClick = () => {
    setDisplayDialog(true);
    clearFields();
  };

  const handleAddClick = () => {
    let validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const costValue = parseFloat(packageCost);
      const discountValue = parseFloat(discount) || 0;

      const discountedPrice = hasDiscount 
        ? costValue - (costValue * discountValue / 100) 
        : costValue;

      const newPackage = {
        name: packageName,
        bulletPoints: bulletPoints,
        cost: costValue,
        duration: packageDuration,
        image: uploadedImage,
        discountedPrice,
        hasDiscount,
        discount: discountValue,
        startDate,
        endDate
      };

      if (editIndex !== null) {
        editPackage(editIndex, newPackage);
        setEditIndex(null);
      } else {
        addPackage(newPackage);
      }
      setDisplayDialog(false);
      clearFields();
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!packageName) errors.packageName = 'Package name is required.';
    if (!bulletPoints || bulletPoints.split('\n').length !== 5) 
      errors.bulletPoints = '5 points are required, one per line.';
    if (!packageCost || isNaN(packageCost)) 
      errors.packageCost = 'Valid package cost is required.';
    if (packageDuration === null || packageDuration < 1 || packageDuration > 9) 
      errors.packageDuration = 'Package duration must be between 1 and 9 months.';
    if (!uploadedImage) errors.uploadedImage = 'Image upload is required.';
    if (hasDiscount && (discount === null || discount < 1 || discount > 99)) 
      errors.discount = 'Valid discount percentage is required if discount is set.';
    if (!startDate) errors.startDate = 'Start date is required.';
    setErrors(errors);
    return errors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setImageName(file.name);
      setErrors(prevErrors => ({ ...prevErrors, uploadedImage: '' }));
    }
  };

  const handleBulletPointsChange = (e) => {
    const points = e.target.value.split('\n');
    if (points.length <= 5) {
      setBulletPoints(e.target.value);
      setErrors(prevErrors => ({ ...prevErrors, bulletPoints: '' }));
    }
  };

  const clearFields = () => {
    setPackageName('');
    setBulletPoints('');
    setPackageCost('');
    setPackageDuration(null);
    setUploadedImage(null);
    setImageName('');
    setHasDiscount(false);
    setDiscount(null);
    setStartDate(null);
    setEndDate(null);
    setErrors({});
  };

  const handleEdit = (index) => {
    const pkg = packages[index];
    setPackageName(pkg.name);
    setBulletPoints(pkg.bulletPoints);
    setPackageCost(pkg.cost.toString());
    setPackageDuration(pkg.duration);
    setUploadedImage(pkg.image);
    setImageName(pkg.imageName);
    setHasDiscount(pkg.hasDiscount);
    setDiscount(pkg.discount);
    setStartDate(pkg.startDate);
    setEndDate(pkg.endDate);
    setEditIndex(index);
    setDisplayDialog(true);
  };

  const showDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    deletePackage(deleteIndex);
    setDeleteDialogVisible(false);
    setDeleteIndex(null);
  };

  return (
    <div className="container">
      <div className="button-container">
        <Button 
          label="+ Add Package" 
          onClick={handleAddPackageClick} 
          className="button-primary" style={{right:'-300px'}}
        />
      </div>
      <Dialog 
        visible={displayDialog} 
        className="centered-dialog"
        onHide={() => setDisplayDialog(false)}
      >
        <div className="form-content">
          <div className="dialog-header">
            <h3 className="dialog-title">{editIndex !== null ? "Edit Package" : "Add Package"}</h3>
          </div>

          <span className="form-field full-width">
            <InputText 
              value={packageName} 
              onChange={(e) => { 
                setPackageName(e.target.value.toUpperCase()); 
                setErrors(prevErrors => ({ ...prevErrors, packageName: '' })); 
              }} 
              placeholder="PACKAGE NAME"
              className="input-text"
            />
            {errors.packageName && <small className="p-error">{errors.packageName}</small>}
          </span>

          <span className="form-field full-width">
            <InputTextarea 
              value={bulletPoints} 
              onChange={handleBulletPointsChange} 
              placeholder="5 DESCRIPTION POINTS (one per line)" 
              rows={4} 
              className="input-textarea"
            />
            {errors.bulletPoints && <small className="p-error">{errors.bulletPoints}</small>}
          </span>

          <span className="form-field">
            <InputText 
              value={packageCost ? `RS ${packageCost}` : ''} 
              onChange={(e) => { 
                const costValue = e.target.value.replace(/RS\s*/i, '');
                setPackageCost(costValue); 
                setErrors(prevErrors => ({ ...prevErrors, packageCost: '' })); 
              }} 
              placeholder="RS PACKAGE COST"
              className="input-text"
            />
            {errors.packageCost && <small className="p-error">{errors.packageCost}</small>}
          </span>
          
          <span className="form-field">
            <InputNumber 
              value={packageDuration} 
              onValueChange={(e) => { 
                setPackageDuration(e.value); 
                setErrors(prevErrors => ({ ...prevErrors, packageDuration: '' })); 
              }} 
              placeholder="PACKAGE DURATION" 
              suffix=" months" 
              min={1} 
              max={9}
              className="input-number"
            />
            {errors.packageDuration && <small className="p-error">{errors.packageDuration}</small>}
          </span>

          <span className="form-field">
            <Calendar 
              value={startDate} 
              onChange={(e) => { 
                setStartDate(e.value); 
                setErrors(prevErrors => ({ ...prevErrors, startDate: '' })); 
              }} 
              placeholder="Start Date"
              className="calendar"
            />
            {errors.startDate && <small className="p-error">{errors.startDate}</small>}
          </span>

          <span className="form-field">
            <Calendar 
              value={endDate} 
              onChange={(e) => setEndDate(e.value)} 
              placeholder="End Date"
              className="calendar"
            />
          </span>

          <div className="upload-discount-container">
            <div className="checkbox-container">
              <Checkbox 
                inputId="discount" 
                checked={hasDiscount} 
                onChange={(e) => { 
                  setHasDiscount(e.checked); 
                  if (!e.checked) setDiscount(null);
                  setErrors(prevErrors => ({ ...prevErrors, discount: '' })); 
                }} 
              />
              <label htmlFor="discount" className="discount-label">Discount</label>
              {hasDiscount && (
                <InputNumber 
                  value={discount} 
                  onValueChange={(e) => { 
                    setDiscount(e.value); 
                    setErrors(prevErrors => ({ ...prevErrors, discount: '' })); 
                  }} 
                  placeholder="DISCOUNT %" 
                  suffix="%" 
                  min={1} 
                  max={99}
                  className="input-number-discount"
                />
              )}
            </div>
            
            <div className="image-upload-container">
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload Image
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
              />
            </div>
          </div>

          {imageName && <p className="image-name">{imageName}</p>}

          <div className="button-group">
            <Button 
              label={editIndex !== null ? "Save" : "Add"} 
              onClick={handleAddClick} 
              className="button-primary" style={{right: '-470px', width: '180px'}}
            />
          </div>
        </div>
      </Dialog>
      
      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        style={{ width: '30vw' }}
        onHide={() => setDeleteDialogVisible(false)}
        footer={
          <span className="button-group">
            <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={confirmDelete} autoFocus />
          </span>
        }
      >
        <p>Are you sure you want to delete the package?</p>
      </Dialog>

      <section className="package-list">
        {packages.map((pkg, index) => (
          <article key={index} className="package-item">
            {pkg.image && <img src={pkg.image} alt={pkg.name} className="package-image" />}
            <header className="package-header">
              <h3>{pkg.name}</h3>
            </header>
            <div>
              <pre>{pkg.bulletPoints}</pre>
              <p>Original Cost: RS {pkg.cost}</p>
              {pkg.hasDiscount && <p>Discount: {pkg.discount}%</p>}
              <p>Final Cost: RS {pkg.discountedPrice.toFixed(2)}</p>
              <p>Duration: {pkg.duration} months</p>
            </div>
            <div className="package-footer">
              <Button label="Edit" onClick={() => handleEdit(index)} className="button-primary" />
              <Button label="Delete" onClick={() => showDeleteDialog(index)} className="button-primary" />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Package;