'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Productattributeterms = mongoose.model('Productattributeterms');

var credentials,
    token,
    mockup;

describe('Productattributeterms CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "XXS",
            slug: "xxs",
            description: "thth",
            menu_order: 1,
            count: 1,
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Productattributeterms get use token', (done) => {
        request(app)
            .get('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Productattributeterms get by id', function (done) {

        request(app)
            .post('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/productattributetermss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.slug, mockup.slug);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.menu_order, mockup.menu_order);
                        assert.equal(resp.data.count, mockup.count);
                        done();
                    });
            });

    });

    it('should be Productattributeterms post use token', (done) => {
        request(app)
            .post('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.slug, mockup.slug);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.menu_order, mockup.menu_order);
                assert.equal(resp.data.count, mockup.count);
                done();
            });
    });

    it('should be productattributeterms put use token', function (done) {

        request(app)
            .post('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "XXS1",
                    slug: "xxs1",
                    description: "cccc",
                    menu_order: 2,
                    count: 2,
                }
                request(app)
                    .put('/api/productattributetermss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        console.log(resp);
                        // assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.slug, update.slug);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.menu_order, update.menu_order);
                        assert.equal(resp.data.count, update.count);
                        done();
                    });
            });

    });

    it('should be productattributeterms delete use token', function (done) {

        request(app)
            .post('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productattributetermss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be productattributeterms get not use token', (done) => {
        request(app)
            .get('/api/productattributetermss')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be productattributeterms post not use token', function (done) {

        request(app)
            .post('/api/productattributetermss')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be productattributeterms put not use token', function (done) {

        request(app)
            .post('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/productattributetermss/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be productattributeterms delete not use token', function (done) {

        request(app)
            .post('/api/productattributetermss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productattributetermss/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Productattributeterms.remove().exec(done);
    });

});