import request from "supertest"
import * as dotenv from 'dotenv';

dotenv.config();

const base_url = process.env.BASE_URL_DEV+"api/users/";
console.log(base_url)
describe('Test Users', () => {
    const rand = Math.random()*100;
    const payload = {
        "name": "Test User "+rand.toString(),
        "username": "testuser"+rand.toString(),
        "email": "unit"+rand.toString()+"@test.email",
        "password": "tes2&tP6ass$w@o$r1d2"+rand.toString(),
        "dept": "TEST"
    }

    describe('Register', () => {
        it('should register user', (done) => {
            request(base_url).post("register").send(payload)
            .expect(200)
            .expect((res)=>{
                if(!(res.body.token && res.body.username && res.body.userId))
                    throw new Error("Invalid response");
            })
            .end(done);
        })
    })

    describe('Login: Correct Credentials', () => {
        it('should login user', (done) => {
            const loginPayload = {
                "email": payload.email,
                "password": payload.password
            }
            // console.log(loginPayload);
            request(base_url).post("login").send(loginPayload)
            .expect(200)
            .expect((res)=>{
                if(!(res.body.token && res.body.username && res.body.userId))
                    throw new Error("Invalid response");
            })
            .end(done);
        })
    })

    describe('Login: Incorrect Credentials', () => {
        it('should not login user', (done) => {
            const loginPayload = {
                "email": payload.email,
                "password": "eiovgnewv"
            }
            // console.log(loginPayload);
            request(base_url).post("login").send(loginPayload)
            .expect(400)
            .expect((res)=>{
                if((res.body.token || res.body.username || res.body.userId))
                    throw new Error("Invalid response");
            })
            .end(done);
        })
    })

    describe('Random Users: ', () => {
        var prevRand = []
        it('should return random users', (done) => {
            // console.log(loginPayload);
            request(base_url).get("random?size=2")
            .expect(200)
            .expect((res)=>{
                const users = res.body;
                if(users.length!=2)
                    throw new Error("Invalid response");
                prevRand=users;
            })
            .end(done);
        })

        it('shouldnt return the same random users', (done) => {
            request(base_url).get("random?size=2")
            .expect(200)
            .expect((res)=>{
                const users = res.body;
                if(users==prevRand)
                    throw new Error("Invalid response");
            })
            .end(done);
        })
    })
})

