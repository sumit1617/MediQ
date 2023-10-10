const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
app.use(bodyParser.json());
app.use(fileUpload());

// Route Imports
const store = require("./routes/storeRoute")
const medicine = require("./routes/medicineRoute")
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")



app.use("/api/v1", store)
app.use("/api/v1", medicine);
app.use("/api/v1", user);
app.use("/api/v1", order);
// app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });


// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
