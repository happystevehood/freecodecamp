"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

/**
 * Set up API routes for the application
 * @param {object} app - The Express application instance
 */
module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  /**
   * GET /api/convert
   * Converts a given input number and unit to another unit and returns the result
   */
  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;
    
    // Check if input is provided
    if (!input) {
      return res.send("invalid input");
    }
    
    // Parse the input to get initial number and unit
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Validate the initial number and unit
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    } else if (initNum === "invalid number") {
      return res.send("invalid number");
    } else if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    } else {
      // Get the return unit and perform conversion
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      
      // Check if the conversion is invalid
      if (isNaN(returnNum) || returnUnit === null) {
        return res.send({ error: "invalid conversion" });
      }

      // Generate the response string
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      
      // Send the response as JSON
      res.json({ initNum, initUnit, returnNum, returnUnit, string });
    }
  });
};
