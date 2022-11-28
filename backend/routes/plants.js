// "use strict";

// /** Routes for plants. */

// const express = require("express");
// const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
// const Plant = require("../models/plant");

// const router = express.Router();

// /** POST / { plant } => { plant }
//  *
//  * plant should be
//  * {
//  *    plant_api_id,
//       common_names,
//       edible_parts,
//       info_url,
//       propagation_methods,
//       scientific_name,
//       taxonomy,
//       wiki_description
//     }
//  *
//  * Returns { id }
//  *
//  * Authorization required: user or admin
//  */

// router.post(
//   "/savePlant",
//   ensureCorrectUserOrAdmin,
//   async function (req, res, next) {
//     try {
//       console.log("==== REQ.BODY", req.body);
//       let plantToFavorite = req.body.plantToFavorite;
//       const plant = await Plant.createPlant(
//         plantToFavorite.id,
//         plantToFavorite.plant_details.common_names,
//         plantToFavorite.plant_details.edible_parts,
//         plantToFavorite.plant_details.url,
//         plantToFavorite.plant_details.propagation_methods,
//         plantToFavorite.plant_details.scientific_name,
//         plantToFavorite.plant_details.taxonomy,
//         plantToFavorite.plant_details.wiki_description
//       );
//       return res.status(201).json({ plant });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

// module.exports = router;
