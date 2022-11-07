import request from "supertest";
import app from "./server.js";

afterAll((done) => {
    done()
})

describe('User', () => {
    test('List User', async () => {
        const res = await request(app).get('/api/users')
        expect(res.status).toBe(200)
    })
})