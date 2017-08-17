1 == Number

// 'use strict';
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const faker = require('faker');
// const should = chai.should();
// const {User, Post} = require('../models');
// const {closeServer, runServer, app} = require('../server');
// const {TEST_DATABASE_URL} = require('../config');
//
// chai.use(chaiHttp);
//
// // this function deletes the entire database.
// // we'll call it in an `afterEach` block below
// // to ensure  ata from one test does not stick
// // around for next one
// function tearDownDb() {
//   return new Promise((resolve, reject) => {
//     console.warn('Deleting database');
//     mongoose.connection.dropDatabase()
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   });
// }
// mongoose.Promise = global.Promise;
//
// // used to put randomish documents in db
// // so we have data to work with and assert about.
// // we use the Faker library to automatically
// // generate placeholder values for author, title, content
// // and then we insert that data into mongo
// function seedPostsData() {
//   console.info('seeding post data');
//   const seedData = [];
//   for (let i=1; i<=10; i++) {
//     seedData.push({
//       header: faker.company.catchPhrase(),
//       url: faker.internet.domainName(),
//       week: faker.random.number(),
//       description: faker.lorem.text(),
//     });
//   }
//   // this will return a promise
//   return Post.insertMany(seedData);
// }
//
// // Node REPL
// // User.hashPassword('happy').then(hash => console.log(hash));
// // must run line above on single line or it will not work :/
//
// const myUser = {
//   username: faker.internet.userName(),
//   password: '$2a$10$5ETobTF06.8GrpCzd57ZaeIgISBIGqWNR.gOgaszido7Uody7jlra',
//   password_plain: 'happy',
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName()
// };
//
// const myPost = {
//   header: faker.company.catchPhrase(),
//   url: faker.internet.domainName(),
//   week: faker.random.number(),
//   description: faker.lorem.text(),
// };
//
//
// // Add a seedUser function which is run in the beforeEach block
// // It should add a user document to the database, containing your hashed password
// function seedUser() {
//   return User.create(myUser);
// }
//
// function seedPost() {
//   return User.create(myPost);
// }
//
//
// describe('Posts API resource', function() {
//
//   before(function() {
//     return runServer(TEST_DATABASE_URL);
//   });
//
//   beforeEach(function() {
//     return Promise.all([seedPostsData(), seedPost(), seedUser()]);
//   });
//
//   afterEach(function() {
//     // tear down database so we ensure no state from this test
//     // effects any coming after.
//     return tearDownDb();
//   });
//
//   after(function() {
//     return closeServer();
//   });
//
//   // note the use of nested `describe` blocks.
//   // this allows us to make clearer, more discrete tests that focus
//   // on proving something small
//   describe('GET endpoint', function() {
//
//     it('should return all existing posts', function() {
//       // strategy:
//       //    1. get back all posts returned by by GET request to `/posts`
//       //    2. prove res has right status, data type
//       //    3. prove the number of posts we got back is equal to number
//       //       in db.
//       let res;
//       return chai.request(app)
//         .get('/api/posts')
//         // .auth(myUser.username, myUser.password) // auth here when ready
//         .then(_res => {
//           res = _res;
//           res.should.have.status(200);
//           // otherwise our db seeding didn't work
//           res.body.should.have.lengthOf.at.least(1);
//           return Post.count();
//         })
//         .then(count => {
//           // the number of returned posts should be same
//           // as number of posts in DB
//           res.body.should.have.lengthOf(count);
//         });
//     });
//
//     it('should return posts with right fields', function() {
//       // Strategy: Get back all posts, and ensure they have expected keys
//
//       let resBody;
//       return chai.request(app)
//         .get('/api/posts')
//         .then(function(res) {
//
//           res.should.have.status(200);
//           res.should.be.json;
//           // res.body.should.be.a('array'); Do we need this?
//           res.body.should.have.lengthOf.at.least(1);
//
//           res.body.forEach(function(post) {
//             post.should.be.a('object');
//             post.should.include.keys('header', 'url', 'description');
//           });
//           // just check one of the posts that its values match with those in db
//           // and we'll assume it's true for rest
//           resBody = res.body[0];
//           console.log(res.body)
//           return Post.findById(resBody.id).exec();
//         })
//         .then(function(post) {
//           console.log("---0-0-0-0-0--",resBody);
//           console.log("post here", post);
//           // (resPost.id)
//           resBody.header.should.equal(post.header);
//           resBody.url.should.equal(post.url);
//           resBody.week.should.equal(post.week);
//           resBody.description.should.equal(post.description);
//         });
//     });
//   });
//
//   describe('POST endpoint', function() {
//     // strategy: make a POST request with data,
//     // then prove that the post we get back has
//     // right keys, and that `id` is there (which means
//     // the data was inserted into db)
//     // Add randomizer function that produces an index of either 0 or 1
//   // Replace myUser[0] with myUser[index].
//     it('should add a new post, line 156', function() {
//       const newPost = {
//         header: faker.company.catchPhrase(),
//         url: faker.internet.domainName(),
//         // week: faker.random.number(),
//         description: faker.lorem.text()
//       };
//       return chai.request(app)
//         .post('/api/posts')
//         // .auth(myUser.username, myUser.password_plain) // auth here when ready
//         .send(newPost)
//         .then(function(res) {
//           res.should.have.status(201);
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.include.keys(
//             'id', 'header', 'url', /*'week',*/ 'description');
//           // // cause Mongo should have created id on insertion
//           res.body.id.should.not.be.null;
//           res.body.header.should.equal(newPost.header);
//           res.body.url.should.equal(newPost.url);
//           // res.week.should.equal(post.week);
//           res.body.description.should.equal(newPost.description);
//           return Post.findById(res.body.id).exec();
//         })
//         .then(function(post) {
//           console.log(post, newPost)
//           post.header.should.equal(newPost.header);
//           post.url.should.equal(newPost.url);
//           // post.week.should.equal(newPost.week);
//           post.description.should.equal(newPost.description);
//         });
//     });
//
//     it('should add new user line 200~', function() {
//       const myTestPost = {
//         header: faker.company.catchPhrase(),
//         url: faker.internet.domainName(),
//         week: faker.random.number(),
//         description: faker.lorem.text()
//       };
//       return chai.request(app)
//         .post('/api/posts')
//         .send(myTestPost)
//         .then(function(res){
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           res.body.should.include.keys(
//             'header', 'url', 'week', 'description');
//           res.body.header.should.equal(myTestPost.header);
//           res.body.url.should.equal(myTestPost.url);
//           res.body.week.should.equal(myTestPost.week);
//           res.body.description.should.equal(myTestPost.description);
//         }).then();
//     });
//   });
//
//   describe('PUT endpoint', function() {
//
//     // strategy:
//     //  1. Get an existing post from db
//     //  2. Make a PUT request to update that post
//     //  3. Prove post returned by request contains data we sent
//     //  4. Prove post in db is correctly updated
//     it('should update fields you send over', function() {
//       const updateData = {
//         header: 'cats cats cats',
//         url: 'http://www.testing123.com',
//         week: '07',
//         description: 'cow cow cow'
//       };
//
//       let post;
//
//       return Post
//         .findOne()
//         // .exec()
//         // let post;
//         .then(_post => {
//           post=_post;
//           updateData.id = post.id;
//
//           return chai.request(app)
//             .put(`/api/posts/${post.id}`)
//             // .auth(myUser.username, myUser.password_plain) // enable auth when ready
//             .send(updateData);
//         })
//         .then(res => {
//           res.should.have.status(204);
//           return Post.findById(post.id).exec();
//         })
//         .then(post => {
//           post.header.should.equal(updateData.header);
//           post.url.should.equal(updateData.url);
//           post.week.should.equal(updateData.url);
//           post.description.should.equal(updateData.description);
//         });
//     });
//   });
//
//   describe('DELETE endpoint', function() {
//     // strategy:
//     //  1. get a post
//     //  2. make a DELETE request for that post's id
//     //  3. assert that response has right status code
//     //  4. prove that post with the id doesn't exist in db anymore
//     it('should delete a post by id', function() {
//
//       let post;
//
//       return Post
//         .findOne()
//         .exec()
//         .then(_post => {
//           post = _post;
//           // console.log('what is my username in Delete? ', myUser.username);
//           // console.log('what is my password in Delete? ', myUser.password_plain);
//           return chai.request(app)
//             .delete(`/api/posts/${post.id}`);
//             // .auth(myUser.username, myUser.password_plain); // enable when auth ready
//         })
//         .then(res => {
//           res.should.have.status(204);
//           return Post.findById(post.id);
//         })
//         .then(_post => {
//           // when a variable's value is null, chaining `should`
//           // doesn't work. so `_post.should.be.null` would raise
//           // an error. `should.be.null(_post)` is how we can
//           // make assertions about a null value.
//           should.not.exist(_post);
//         });
//     });
//   });
// });
