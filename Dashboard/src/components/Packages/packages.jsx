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
  const [packageName, setPackageName] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [packageDuration, setPackageDuration] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
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
      const discountedPrice = hasDiscount 
        ? packageCost - (packageCost * discount / 100) 
        : packageCost;

      const newPackage = {
        name: packageName,
        bulletPoints: bulletPoints,
        cost: packageCost,
        duration: packageDuration,
        image: uploadedImage,
        discountedPrice,
        hasDiscount,
        discount,
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
    if (!bulletPoints || bulletPoints.split('\n').length > 5) 
      errors.bulletPoints = '5  points are required, one per line.';
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
    setPackageCost(pkg.cost);
    setPackageDuration(pkg.duration);
    setUploadedImage(pkg.image);
    setHasDiscount(pkg.hasDiscount);
    setDiscount(pkg.discount);
    setStartDate(pkg.startDate);
    setEndDate(pkg.endDate);
    setEditIndex(index);
    setDisplayDialog(true);
  };

  return (
    <div className="container">
      <Button label="+ Add Package" onClick={handleAddPackageClick} className="button-primary add-package-button" />
      <Dialog 
        header={editIndex !== null ? "Edit Package" : "Add Package"} 
        visible={displayDialog} 
        style={{ width: '50vw' }} 
        onHide={() => setDisplayDialog(false)}
      >
        <div className="fade-in">
          <div className="form-field">
            <Button 
              label="Upload" 
              onClick={() => document.getElementById('fileInput').click()} 
              className="button-primary" 
              style={{ marginTop: '10px', marginBottom: '10px' }} 
            />
            <input 
              type="file" 
              accept=".png,.jpg" 
              onChange={handleImageChange} 
              id="fileInput" 
              style={{ display: 'none' }} 
            />
            {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
            {errors.uploadedImage && <small className="p-error">{errors.uploadedImage}</small>}
          </div>

          <div className="form-field">
            <InputText 
              value={packageName} 
              onChange={(e) => { 
                setPackageName(e.target.value.toUpperCase()); 
                setErrors(prevErrors => ({ ...prevErrors, packageName: '' })); 
              }} 
              placeholder="PACKAGE NAME" 
            />
            {errors.packageName && <small className="p-error">{errors.packageName}</small>}
          </div>

          <div className="form-field">
            <InputTextarea 
              value={bulletPoints} 
              onChange={handleBulletPointsChange} 
              placeholder="5 DESCRIPTION POINTS (one per line)" 
              rows={5} 
            />
            {errors.bulletPoints && <small className="p-error">{errors.bulletPoints}</small>}
          </div>
          <div className="form-field">
            <InputText 
              value={packageCost} 
              onChange={(e) => { 
                setPackageCost(e.target.value); 
                setErrors(prevErrors => ({ ...prevErrors, packageCost: '' })); 
              }} 
              placeholder="PACKAGE COST" 
            />
            {errors.packageCost && <small className="p-error">{errors.packageCost}</small>}
          </div>

          <div className="form-field">
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
            />
            {errors.packageDuration && <small className="p-error">{errors.packageDuration}</small>}
          </div>

          <div className="form-field">
            <Calendar 
              value={startDate} 
              onChange={(e) => { 
                setStartDate(e.value); 
                setErrors(prevErrors => ({ ...prevErrors, startDate: '' })); 
              }} 
              placeholder="Start Date" 
            />
            {errors.startDate && <small className="p-error">{errors.startDate}</small>}
          </div>

          <div className="form-field">
            <Calendar 
              value={endDate} 
              onChange={(e) => { 
                setEndDate(e.value); 
              }} 
              placeholder="End Date" 
            />
          </div>

          <div className="form-field checkbox-field">
            <Checkbox 
              inputId="discount" 
              checked={hasDiscount} 
              onChange={(e) => { 
                setHasDiscount(e.checked); 
                setErrors(prevErrors => ({ ...prevErrors, discount: '' })); 
              }} 
            />
            <label htmlFor="discount" className="p-checkbox-label">Discount</label>
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
                className="discount-input"
              />
            )}
            {errors.discount && <small className="p-error">{errors.discount}</small>}
          </div>

          <div className="button-group">
            <Button label={editIndex !== null ? "Save" : "Add"} onClick={handleAddClick} className="button-primary" />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Package;
