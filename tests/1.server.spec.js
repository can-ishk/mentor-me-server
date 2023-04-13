import request from "supertest"
import * as dotenv from 'dotenv';

dotenv.config();

const base_url = process.env.BASE_URL_DEV;

describe('Test /', () => {
    it('Server is running!', (done) => {
        request(base_url).get('')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect("Hello!", done);
    })
})

