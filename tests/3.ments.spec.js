import request from "supertest"
import * as dotenv from 'dotenv';

dotenv.config();

const base_url = process.env.BASE_URL_DEV+"api/ments/";

describe('Get Ments /', () => {
    it('Getting Ments', (done) => {
        console.log(base_url)
        request(base_url).get('')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res)=>{
            if (!res.body.count<0)
                throw new Error("Invalid response");
            if(res.body.search != false)
                throw new Error("Invalid response");
        })
        .end(done)
    })

    it('searching ments', (done)=>{
        request(base_url).get('?search=hello')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res)=>{
            if (res.body.count<0)
                throw new Error("Invalid response");
            if(res.body.search != true)
                throw new Error("Invalid response");
        })
        .end(done)
    })
})