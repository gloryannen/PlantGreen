// "use strict";

// const db = require("../db");

// /** Related functions for companies. */

// class Plant {
//   /** Create a plant (from data), update db, return new plant data.
//    *
//    * data should be
//    * {
//       plant_api_id,
//       common_names,
//       edible_parts,
//       info_url,
//       propagation_methods,
//       scientific_name,
//       taxonomy,
//       wiki_description
//     }
//    *
//    * Returns { id }
//    *
//    * */

//   static async createPlant(
//     plant_api_id,
//     common_names,
//     edible_parts,
//     info_url,
//     propagation_methods,
//     scientific_name,
//     taxonomy,
//     wiki_description
//   ) {
//     const duplicateCheck = await db.query(
//       `SELECT scientific_name
//            FROM plants
//            WHERE scientific_name = $1`,
//       [scientific_name]
//     );

//     if (duplicateCheck.rows[0]) {
//       return { success: false, message: "Plant already exists in database" };
//     }

//     let mappedCommonNames = null;
//     if (common_names != null) {
//       mappedCommonNames = common_names.join(",");
//     }

//     // Checks for Edible Parts
//     let mappedEdible = null;
//     if (edible_parts != null) {
//       mappedEdible = edible_parts.join(",");
//     }

//     // Checks for Propagation
//     let mappedPropagation = null;
//     if (propagation_methods != null) {
//       mappedPropagation = propagation_methods.join(",");
//     }

//     let mappedTaxonomy = JSON.stringify(taxonomy);

//     const result = await db.query(
//       `INSERT INTO plants
//             (plant_api_id,
//             common_names,
//             edible_parts,
//             info_url,
//             propagation_methods,
//             scientific_name,
//             taxonomy,
//             wiki_description)
//            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//            RETURNING id
//            `,
//       [
//         plant_api_id,
//         mappedCommonNames,
//         mappedEdible,
//         info_url,
//         mappedPropagation,
//         scientific_name,
//         mappedTaxonomy,
//         wiki_description,
//       ]
//     );
//     console.log(
//       "PLANT INFO ========>",
//       plant_api_id,
//       mappedCommonNames,
//       mappedEdible,
//       info_url,
//       mappedPropagation,
//       scientific_name,
//       mappedTaxonomy,
//       wiki_description
//     );
//     let id = result.rows[0][0];
//     return id;
//   }
// }

// module.exports = Plant;
