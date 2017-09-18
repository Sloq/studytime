process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');




chai.use(chaiHttp);

describe('API Routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
          knex.migrate.latest()
          .then(function() {
            return knex.seed.run()
            .then(function() {
              done();
            });
          });
        });
      });
    
    afterEach(function(done) {
            knex.migrate.rollback()
            .then(function() {
            done();
        });
    });
    

    describe('GET api/v1/frameworks', function() {
        it('should return all frameworks', function(done) {
            chai.request(server)
            .get('/api/v1/frameworks')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.be.a('array');
                res.body.length.should.equal(4);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('node.js');
                res.body[0].should.have.property('description');
                res.body[0].description.should.equal('js backend');
                done();
            });
        });
    });

    describe('GET api/v1/frameworks/:id', function() {
        it('should return a single framework', function(done) {
            chai.request(server)
            .get('/api/v1/frameworks/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('node.js');
                res.body.should.have.property('description');
                res.body.description.should.equal('js backend');
                done();
            });
        });
    });

    describe('POST api/v1/frameworks/:id', function() {
        it('should add a single framework to the database', function(done) {
            chai.request(server)
            .post('/api/v1/frameworks/')
            .send({
                name: 'meteor',
                description: 'similar to node but more all encompassing'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('meteor');
                res.body.should.have.property('description');
                res.body.description.should.equal('similar to node but more all encompassing');;
                done();
            });
        });
    });

    describe('DELETE api/v1/frameworks/:id', function() {
        it('should remove a single framework from the database', function(done) {
            chai.request(server)
            .delete('/api/v1/frameworks/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('node.js');
                res.body.should.have.property('description');
                res.body.description.should.equal('js backend');
                chai.request(server)
                .get('/api/v1/frameworks')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('array');
                    res.body.length.should.equal(3);
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.equal('React');
                    res.body[0].should.have.property('description');
                    res.body[0].description.should.equal('single page apps');
                    done();
                })
            })
        })
    })
})