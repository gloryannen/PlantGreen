"use strict";

const app = require("./app");
const { PORT } = require("./config");
// const express = require("express");

// const path = require("path");
// app.use(express.static(path.join(__dirname + "/public")));

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
