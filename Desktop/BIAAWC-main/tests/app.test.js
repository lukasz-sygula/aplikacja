const request = require('supertest');
const app = require('../src/app');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app)
            .get('/')
            .then(resp => {
                expect(resp.statusCode).toBe(200)
                expect(resp.json).toBe('Hello World!')
                done()
            })
            .catch(e => {
                done()
            });
    });
});