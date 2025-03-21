//define constans onece and for all.

const units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};

const unitMapping = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const conversionRate = {
  gal: galToL,
  L: 1 / galToL,
  mi: miToKm,
  km: 1 / miToKm,
  lbs: lbsToKg,
  kg: 1 / lbsToKg,
};

function ConvertHandler() {

  /**
   * Extracts the number from the input string.
   * @param {String} input - the input string
   * @return {Number} the number, or "invalid number"
   */
  this.getNum = function (input) {
    // Find the index of the first letter in the string
    // by splitting the string into an array of characters
    // and using the findIndex method to find the index of
    // the first character that is a letter
    const chars = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => chars.test(char));

    if (idx === 0) {
      // If the first character is a letter, return 1
      return 1;
    }

    // Get the substring of the input string before the first letter
    // and split it into an array of strings using the / character
    let quantityStr;
    if (idx < 0) {
      quantityStr = input.slice(0);
    } else {
      quantityStr = input.slice(0, idx);
    }

    const quantityArr = quantityStr.split("/");

    if (quantityArr.length === 1) {
      // If there is only one string in the array, check if it is a number
      const quantity = quantityArr[0];
      if (quantity === "") return "invalid number";
      return isNaN(+quantity) ? "invalid number" : +quantity;
    }

    if (quantityArr.length === 2) {
      // If there are two strings in the array, check if they are numbers
      if (quantityArr.some((num) => num === "")) {
        return "invalid number";
      }

      // Get the numerator and denominator and check if they are numbers
      const numerator = +quantityArr[0];
      const denominator = +quantityArr[1];
      return isNaN(numerator) || isNaN(denominator)
        ? "invalid number"
        : numerator / denominator;
    }

    // If the input string does not match any of the above conditions,
    // return "invalid number"
    return "invalid number";
  };

  /**
   * Extracts the unit from the input string.
   * @param {String} input - the input string
   * @return {String} the unit, or "invalid unit"
   */
  this.getUnit = function (input) {
    // Find the index of the first letter in the string
    // by splitting the string into an array of characters
    // and using the findIndex method to find the index of
    // the first character that matches the regular expression /[a-zA-Z]/
    // (i.e. the first letter).
    const englishAlphabet = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => englishAlphabet.test(char));

    // If no letters are found, return "invalid unit"
    if (idx < 0) {
      return "invalid unit";
    }

    // Otherwise, extract the unit from the string by slicing it
    // from the index of the first letter to the end of the string.
    const unit = input.slice(idx);

    // Finally, use the spellOutUnit method to convert the unit
    // to its "spelled out" form (e.g. "gal" to "gallons").
    // If the unit is invalid, spellOutUnit will return "invalid unit".
    return this.spellOutUnit(unit);
  };

  /**
   * Gets the unit to return.
   * @param {String} initUnit - the initial unit
   * @return {String} the return unit
   */
  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  /**
   * Spelling out the unit (e.g. 'kg' to 'kilograms').
   * @param {String} unit - the unit
   * @return {String} the spelled out unit
   */
  this.spellOutUnit = function (unit) {

    if (unit === "L" || unit === "l"){
      return "L";
    } 
    else if (units.hasOwnProperty(unit.toLowerCase())) {
      return unit.toLowerCase();
    }
    else {
      return "invalid unit";
    }

  };

  /**
   * Converts a given number from the initial unit to the target unit.
   * @param {number} initialValue - The number to convert.
   * @param {string} initialUnit - The unit of the given number.
   * @return {number} The converted number rounded to five decimal places.
   */
  this.convert = function (initialValue, initialUnit) {
    const conversionFactor = conversionRate[initialUnit];
    const convertedValue = initialValue * conversionFactor;
    return Math.round(convertedValue * 100000) / 100000;
  };

  /**
   * Gets the string representation of the conversion.
   * @param {Number} initNum - the initial number
   * @param {String} initUnit - the initial unit
   * @param {Number} returnNum - the converted number
   * @param {String} returnUnit - the converted unit
   * @return {String} the string representation of the conversion
   */
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitMapping[initUnit]} converts to ${returnNum} ${unitMapping[returnUnit]}`;
  };
}

module.exports = ConvertHandler;