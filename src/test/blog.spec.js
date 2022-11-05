const request = require('supertest')
const { connect } = require('./database')
const app = require('../index');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel')


describe('Order Route', () => {
    let conn;
    let token;

    beforeEach(async () => {
        conn = await connect()

        await userModel.create({  password: "123456",
        first_name: "tobie",
        last_name: "Augustina",
        email: "tobi@mail.com"});

        const loginResponse = await request(app)
        .post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ 
            email: "tobi@mail.com",
            password: "123456"
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })
    

    it('create a blog', async () => {
        const response = await request(app)
        .post('/blog/create-blog')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .send({
            email: "tobi@mail.com",
            password:"123456",
            title:"Life of a star",
            Description:"live life on a rollercoaster",
            tags:"loot change",
            body:"lorem ipsum"})

        // expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
    })
    it('should edit a blog', async () => {
       const user= await userModel.find({
        email: "tobi@mail.com"});

        await blogModel.create({
            title: "Life and works of mozart",
            Description: "Songs in a rhythm",
            state: "published",
            reading_time: "3minutes",
            tags: ["loot", "change"],
            body: "Never compromise",
            author: user._id
          });

        const response = await request(app)
        .put('/blog/edit-blog/Life and works of mozart')
        .set('Authorization', `Bearer ${token}`)
        .send('Description=Lopin over anything')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
    })
    it('should delete a blog', async () => {
        const user= await userModel.find({
         email: "tobi@mail.com"});
 
         await blogModel.create({
             title: "Life and works of mozart",
             Description: "Songs in a rhythm",
             state: "published",
             reading_time: "3minutes",
             tags: ["loot", "change"],
             body: "Never compromise",
             author: user._id
           });
 
         const response = await request(app)
         .put('/blog/edit-blog/Life and works of mozart')
        //  .set('Accept', "application/x-www-form-urlencoded")
         .set('Content-Type', 'application/json')
         .set('Authorization', `Bearer ${token}`)
         .send({email:"tobi@mail.com",
         Description:'Lopin over anything'})
    
        //   .expect('Content-Type', /application\/json/)
        //  expect(response.status).toBe(200)
         expect(response.body).toHaveProperty('message')
         
     })
});
