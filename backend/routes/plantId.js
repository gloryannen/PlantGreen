"use strict";
require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

router.post("/plantdata", ensureCorrectUserOrAdmin, async function (req, res) {
  let plantFiles = req.body.plantFiles;

  // Turns files into array of strings
  let plantFileArray = [plantFiles];

  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    api_key: process.env.REACT_APP_PLANT_API_KEY,
    images: plantFileArray,
    modifiers: ["crops_fast", "similar_images"],
    plant_language: "en",
    plant_details: [
      "common_names",
      "url",
      "name_authority",
      "wiki_description",
      "taxonomy",
      "synonyms",
      "edible_parts",
      "propagation_methods",
      "watering",
    ],
  };
  await axios
    .post("https://api.plant.id/v2/identify", data, headers)
    .then((response) => {
      return res.status(201).json({ data: response.data });
    })
    .catch((error) => {
      return error;
    });
});

module.exports = router;
