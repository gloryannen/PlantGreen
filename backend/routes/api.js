"use strict";

const axios = require("axios");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
// const PlantKey = process.env.REACT_APP_PLANT_API_KEY;

router.post("/plantdata", ensureCorrectUserOrAdmin, async function (req, res) {
  let plantFiles = req.body.plantFiles;

  // Turns files into array of strings
  let plantFileArray = [plantFiles];

  const headers = {
    "Content-Type": "application/json",
    "Api-Key": "fp3KHp62ONF0alQ06sKAZiy9u9G6dM3KXvE2MPJOCVeK2sNwXK",
  };
  const data = {
    api_key: "fp3KHp62ONF0alQ06sKAZiy9u9G6dM3KXvE2MPJOCVeK2sNwXK",
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
    ],
  };
  await axios
    .post("https://api.plant.id/v2/identify", data, headers)
    .then((response) => {
      console.log("RES from api JS --------->", response);
      return res.status(201).json({ data: response.data });
    })
    .catch((error) => {
      return error;
    });
});

module.exports = router;
