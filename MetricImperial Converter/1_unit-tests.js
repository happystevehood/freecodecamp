const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    //convertHandler should correctly read a whole number input.
    test('convertHandler should correctly read a whole number input.', function(done){
        assert.equal(convertHandler.getNum("32L"), 32);
        assert.equal(convertHandler.getNum("32gal"), 32);
        assert.equal(convertHandler.getNum("32kg"), 32);
        assert.equal(convertHandler.getNum("32mi"), 32);
        assert.equal(convertHandler.getNum("32lbs"), 32);
        done(); 
    });

    //convertHandler should correctly read a decimal number input.
    test('convertHandler should correctly read a decimal number input.', function(done){
        assert.equal(convertHandler.getNum("3.2L"), 3.2);
        assert.equal(convertHandler.getNum("3.2gal"), 3.2);
        assert.equal(convertHandler.getNum("3.2kg"), 3.2);
        assert.equal(convertHandler.getNum("3.2mi"), 3.2);
        assert.equal(convertHandler.getNum("3.2lbs"), 3.2);
        done(); 
    });

    //convertHandler should correctly read a fractional input.
    test('convertHandler should correctly read a fractional input.', function(done){
        assert.equal(convertHandler.getNum("3/2L"), 1.5);
        assert.equal(convertHandler.getNum("3/2gal"), 1.5);
        assert.equal(convertHandler.getNum("3/2kg"), 1.5);
        assert.equal(convertHandler.getNum("3/2mi"), 1.5);
        assert.equal(convertHandler.getNum("3/2lbs"), 1.5);
        done(); 
    });

    //convertHandler should correctly read a fractional input with a decimal.
    test('convertHandler should correctly read a fractional input with a decimal.', function(done){
        assert.equal(convertHandler.getNum("3.5/2L"), 1.75);
        assert.equal(convertHandler.getNum("3.5/2gal"), 1.75);
        assert.equal(convertHandler.getNum("3.5/2kg"), 1.75);
        assert.equal(convertHandler.getNum("3.5/2mi"), 1.75);
        assert.equal(convertHandler.getNum("3.5/2lbs"), 1.75);
        done();
    });

    //convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(done){
        assert.equal(convertHandler.getNum("3/2/3L"), "invalid number");
        assert.equal(convertHandler.getNum("3/2/3gal"), "invalid number");
        assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
        assert.equal(convertHandler.getNum("3/2/3mi"), "invalid number");
        assert.equal(convertHandler.getNum("3/2/3lbs"), "invalid number");
        done();
    });

    //convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function(done){
        assert.equal(convertHandler.getNum("L"), 1);
        assert.equal(convertHandler.getNum("gal"), 1);
        assert.equal(convertHandler.getNum("kg"), 1);
        assert.equal(convertHandler.getNum("mi"), 1);
        assert.equal(convertHandler.getNum("lbs"), 1);
        done();
    });

    //convertHandler should correctly read each valid input unit.
    test('convertHandler should correctly read each valid input unit.', function(done){
        assert.equal(convertHandler.getUnit("32L"), "L");
        assert.equal(convertHandler.getUnit("32gal"), "gal");
        assert.equal(convertHandler.getUnit("32kg"), "kg");
        assert.equal(convertHandler.getUnit("32mi"), "mi");
        assert.equal(convertHandler.getUnit("32lbs"), "lbs");
        done();
    });

    //convertHandler should correctly return an error for an invalid input unit.
    test('convertHandler should correctly return an error for an invalid input unit.', function(done){
        assert.equal(convertHandler.getUnit("32g"), "invalid unit");
        assert.equal(convertHandler.getUnit("32G"), "invalid unit");
        assert.equal(convertHandler.getUnit("32kgr"), "invalid unit");
        assert.equal(convertHandler.getUnit("32mil"), "invalid unit");
        assert.equal(convertHandler.getUnit("32lb"), "invalid unit");
        done();
    });

    //convertHandler should return the correct return unit for each valid input unit.
    test('convertHandler should return the correct return unit for each valid input unit.', function(done){
        assert.equal(convertHandler.getReturnUnit("L"), "gal");
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
        done();
    });

    //convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(done){
        assert.equal(convertHandler.spellOutUnit("l"), "L");
        assert.equal(convertHandler.spellOutUnit("GAL"), "gal");
        assert.equal(convertHandler.spellOutUnit("kg"), "kg");   
        assert.equal(convertHandler.spellOutUnit("MI"), "mi");
        assert.equal(convertHandler.spellOutUnit("LBS"), "lbs");
        done();
    });

    //convertHandler should correctly convert gal to L.
    test ('convertHandler should correctly convert gal to L.', function(done){
        assert.equal(convertHandler.convert(3, "gal"), 11.35623);
        done();
    });

    //convertHandler should correctly convert L to gal.
    test ('convertHandler should correctly convert L to gal.', function(done){
        assert.equal(convertHandler.convert(3, "L"), 0.79252);
        done();
    });

    //convertHandler should correctly convert mi to km.
    test ('convertHandler should correctly convert mi to km.', function(done){
        assert.equal(convertHandler.convert(3, "mi"), 4.82802);
        done();
    });

    //convertHandler should correctly convert km to mi.
    test ('convertHandler should correctly convert km to mi.', function(done){
        assert.equal(convertHandler.convert(3, "km"), 1.86412);
        done();
    });

    //convertHandler should correctly convert lbs to kg.
    test ('convertHandler should correctly convert lbs to kg.', function(done){
        assert.equal(convertHandler.convert(3, "lbs"), 1.36078);
        done(); 
    });
        
        //convertHandler should correctly convert kg to lbs.
    test ('convertHandler should correctly convert kg to lbs.', function(done){
        assert.equal(convertHandler.convert(3, "kg"), 6.61387);
        done();
    });

});