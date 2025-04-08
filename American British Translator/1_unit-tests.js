const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const { isString } = require('mocha/lib/utils.js');

suite('Unit Tests', () => {

    const translator = new Translator();
    const locales = ['american-to-british', 'british-to-american'];

    test(`Translation to ${locales[0]} 1`, function(done) {
        const text = 'Mangoes are my favorite fruit.';
        const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[0]} 2`, function(done) {
        const text = 'I ate yogurt for breakfast.';
        const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[0]} 3`, function(done) {
        const text = 'Can you toss this in the trashcan for me?';
        const expected = 'Can you toss this in the <span class="highlight">bin</span> for me?';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[0]} 4`, function(done) {
        const text = 'We had a party at my friend\'s condo';
        const expected = 'We had a party at my friend\'s <span class="highlight">flat</span>';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[0]} 5`, function(done) {
        const text = 'The parking lot was full.';
        const expected = 'The <span class="highlight">car park</span> was full.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[0]} 6`, function(done) {
        const text = 'Lunch is at 12:15 today.';
        const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[0]} 7`, function(done) {
        const text = 'Like a high tech Rube Goldberg machine.';
        const expected = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });


    test(`Translation to ${locales[0]} 8`, function(done) {
        const text = 'To play hooky means to skip class or work.';
        const expected = 'To <span class="highlight">bunk off</span> means to skip class or work.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[0]} 9`, function(done) {
        const text = 'No Mr. Bond, I expect you to die.';
        const expected = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[0]} 10`, function(done) {
        const text = 'Dr. Grosh will see you now.';
        const expected = '<span class="highlight">Dr</span> Grosh will see you now.';
        const result = translator.translate(text, locales[0]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    

    test(`Translation to ${locales[1]} 1`, function(done) {
        const text = 'I love to watch the footie and grab a pint.';
        const expected = 'I love to watch the <span class="highlight">soccer</span> and grab a pint.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[1]} 2`, function(done) {
        const text = 'Paracetamol takes up to an hour to work.';
        const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    

    test(`Translation to ${locales[1]} 3`, function(done) {
        const text = 'The car boot sale at Boxted Airfield was called off.';
        const expected = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 4`, function(done) {
        const text = 'First, caramelise the onions.';
        const expected = 'First, <span class="highlight">caramelize</span> the onions.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 5`, function(done) {
        const text = 'I spent the bank holiday at the funfair.';
        const expected = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 6`, function(done) {
        const text = 'I had a bicky then went to the chippy.';
        const expected = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 7`, function(done) {
        const text = 'I\'ve just got bits and bobs in my bum bag.';
        const expected = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 8`, function(done) {
        const text = 'The car boot sale at Boxted Airfield was called off.';
        const expected = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 9`, function(done) {
        const text = 'Have you met Mrs Kalyani?';
        const expected = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });
    test(`Translation to ${locales[1]} 10`, function(done) {
        const text = 'Prof Joyner of King\'s College, London.';
        const expected = '<span class="highlight">prof.</span> Joyner of King\'s College, London.';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

    test(`Translation to ${locales[1]} 11`, function(done) {
        const text = 'Tea time is usually around 4 or 4.30';
        const expected = 'Tea time is usually around 4 or <span class="highlight">4:30</span>';
        const result = translator.translate(text, locales[1]);
        assert.isString(result);
        assert.equal(result, expected);
        done();
    });

  // Highlight translation in Mangoes are my favorite fruit.
  test('Highlight translation 1', (done) => {
    let text = 'Mangoes are my favorite fruit';
    let result = translator.translate(text, locales[0]);
    let highlight = result.split('"');
    assert.isString(result, 'result should be a string');
    assert.equal(highlight[1], 'highlight');
    done();
  })

  // Highlight translation in I ate yogurt for breakfast.
  test('Highlight translation 2', (done) => {
    let text = 'I ate yogurt for breakfast';
    let result = translator.translate(text, locales[0]);
    let highlight = result.split('"');
    assert.isString(result, 'result should be a string');
    assert.equal(highlight[1], 'highlight');
    done();
  })

  // Highlight translation in We watched the footie match for a while.
  test('Highlight translation 3', (done) => {
    let text = 'We watched the footie match for a while';
    let result = translator.translate(text, locales[1]);
    let highlight = result.split('"');
    assert.isString(result, 'result should be a string');
    assert.equal(highlight[1], 'highlight');
    done();
  })

  // Highlight translation in Paracetamol takes up to an hour to work.
  test('Highlight translation 4', (done) => {
    let text = 'paracetamol takes up to an hour to work';
    let result = translator.translate(text, locales[1]);
    let highlight = result.split('"');
    assert.isString(result, 'result should be a string');
    assert.equal(highlight[1], 'highlight');
    done();
  })

});
