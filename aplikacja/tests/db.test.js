const config = require('config')
const Database = require('../src/storage/db')

describe('Test db interface', () => {
	const db = new Database()

	beforeAll(async () => {
		try {
			const dbConf = config.get('db')
			await db.connect(dbConf)
		} catch (e) {
			throw(e)
		}
	})

	beforeEach(async () => {
		try {
			await db.insert('rss', { 'email': 'test@test.pl', 'rss': 'rss.xml' })
		} catch (e) {
			throw(e)
		}
	});
	
	afterAll(() => {
		db.disconnect()
	})
	
	afterEach(async () => {
		try {
			await db.drop('rss')
		} catch (e) {
			throw(e)
		}
	});

	test('It should insert data', async () => {
		try {
			const res = await db.insert('rss', { 'email': 'test2@test.pl', 'rss': 'rss.xml' })
			expect(res.result.ok).toBe(1)
		} catch (e) {
			throw(e)
		}
	})

	test('It should update value', async () => {
		try {
			const res = await db.update('rss', { "email" : "test@test.pl" }, { $set: {'email': 'test2@test.pl', 'rss': '2rss.xml' }})
			expect(res.result.ok).toBe(1)
		} catch (e) {
			throw(e)
		}
	})
	
	test('It should remove value', async () => {
		try {
			const res = await db.remove('rss', { 'email': 'test@test.pl' })
      expect(res.result.ok).toBe(1)
		} catch (e) {
			throw(e)
		}
	})
})
