const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const locales = ['american-to-british', 'british-to-american'];

suite('Functional Tests', () => {

    // Translation with text and locale fields: POST request to /api/translate
    test('Translation with text and locale fields: POST request to /api/translate', function(done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'american-to-british'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
                done();
            });
    });

    // Translation with text that needs no translation: POST request to /api/translate
    test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Hello, how are you?',
                locale: 'american-to-british'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.translation, 'Everything looks good to me!');
                done();
            });
    });

    // Translation with text and invalid locale field: POST request to /api/translate
    test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'invalid-locale'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value for locale field');
                done();
            });
    });

    // Translation with missing text field: POST request to /api/translate
    test('Translation with missing text field: POST request to /api/translate', function(done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: 'american-to-british'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
    });

    // Translation with missing locale field: POST request to /api/translate
    test('Translation with missing locale field: POST request to /api/translate', function(done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            });
    });

    // Translation with empty text: POST request to /api/translate
    test('Translation with empty text: POST request to /api/translate', function(done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: '',
                locale: 'american-to-british'
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'No text to translate');
                done();
            });
    });

});
