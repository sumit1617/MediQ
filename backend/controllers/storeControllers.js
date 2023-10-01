const Store = require("../models/storeModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary").v2


// Create a Medical Store --- Super Admin
exports.createStore = catchAsyncErrors(async (req, res, next) => {

  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.uploader.upload(images[i], {
  //     folder: "Stores",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.storeAvatar = imagesLinks
  req.body.user = req.user.id

  const store = await Store.create(req.body);

  res.status(201).json({
    success: true,
    store,
  });
});


// Get All Stores
exports.getAllStores = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const storesCount = await Store.countDocuments();

  const apiFeature = new ApiFeatures(Store.find(), req.query).search().filter();

  let stores = await apiFeature.query;

  let filteredStoresCount = stores.length;

  apiFeature.pagination(resultPerPage);

  stores = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    stores,
    storesCount,
    resultPerPage,
    filteredStoresCount,
  });
});


// Get All Stores --- Super Admin
exports.getAdminStores = catchAsyncErrors(async (req, res, next) => {
    const stores = await Store.find();
  
    res.status(200).json({
      success: true,
      stores,
    });
  });


// Get Single Store details
exports.getStoreDetails = catchAsyncErrors(async (req, res, next) => {
    const store = await Store.findById(req.params.id);
  
    if (!store) {
      return next(new ErrorHandler("Store not found", 404));
    }
  
    res.status(200).json({
      success: true,
      store,
    });
  });


// UPDATE THE STORE --- SUPERADMIN
exports.updateStore = catchAsyncErrors(async(req, res, next) => {
  let store = await Store.findById(req.params.id);

  if(!store) {
    return next(new ErrorHandler("Store not found", 404));
  }

  let avatar = []

})