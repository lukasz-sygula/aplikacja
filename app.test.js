const app = require('../scr/app');

describe('Test the root path', () => {
    test('It should respone thr GET method', async () => {
        try {
            const resp = await request(app).get('/')
            expect(resp.statusCode).toBe(200)
        } catch(e) {
            throw e
        }
    });  
});