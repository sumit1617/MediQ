const Medicine = require("../models/medicineModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const Store = require("../models/storeModel")


// Create Medicine --- Admin
exports.createMedicine = catchAsyncErrors(async (req, res, next) => {
    const medicine = await Medicine.create(req.body)

    const store = await Store.findById(req.params.id)

    store.medicines.push(medicine)

    await store.save({validateBeforSave: false})

    res.status(200).json({
      success: true,
      message: "Medicine added successfully"
    })
})


// Get all the medicines
exports.getAllMedicines = catchAsyncErrors(async(req, res, next) => {
  const store = await Store.findById(req.params.id)

  if(!store){
    return next(new ErrorHandler("Store Not Found", 404))
  }

  const medicines = store.medicines
  const medicinesCount = medicines.length;


  res.status(200).json({
    success: true,
    medicines,
    medicinesCount
  }) 
})


// Get Single Medicines
exports.getMedicineDetails = catchAsyncErrors(async (req, res,next) => {
  const store = await Store.findById(req.params.id);

  if(!store) {
    return next(new ErrorHandler("Store Not Found", 404))
  }

  const medicine = store.medicines.filter(
    (med) => med._id.toString() == req.query.id.toString()
  )

  if(medicine.length === 0){
    return next(new ErrorHandler("Medicine Not Found", 404))
  }
  
  res.status(200).json({
    success: true,
    medicine
  })
})


// Update Medicne
exports.updateMedicine = catchAsyncErrors(async(req, res, next) => {
  let store = await Store.findById(req.params.id)

  if(!store) {
    return next(new ErrorHandler("Store Not Found", 404))
  }

  const medicine = store.medicines.filter(
    (rev) => rev._id.toString() == req.query.id.toString()
  )

  const updatedMedicine = req.body

  await Store.findByIdAndUpdate(
    req.query.id,
    {
      updatedMedicine
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  await store.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Medicine Updated Successfully"
  })
})


// Delete Medicine
exports.deleteMedicine = catchAsyncErrors(async (req, res,next) => {
  const store = await Store.findById(req.params.id);

  if(!store) {
    return next(new ErrorHandler("Store Not Found", 404))
  }

  const medicine = store.medicines.filter(
    (med) => med._id.toString() == req.query.id.toString()
  )

  if(medicine.length === 0){
    return next(new ErrorHandler("Medicine Not Found", 404))
  }

  store.medicines.remove(medicine)
  
  res.status(200).json({
    success: true,
    message: "Medicine Deleted Successfully"
  })
})