process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect();
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

describe('routes:drone API', function(){

  /**
   * Start Drone Simulator API Test
   */
  describe('routes:startDrone', function(){
    it('The startDrone test', function(done){
      console.log('Starting startDrone Test ...');
      chai.request(server)
          .post('/api/startDrones')
          .send({'droneNum': '5'})
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });
  });

  /**
   * Receive Drone Data From Simulator API Test
   */
  describe('routes:receiveDroneData', function(){
    it('The receiveDroneData test', function(done){
      console.log('Starting stopDrone Test ...');
      chai.request(server)
          .post('/api/receiveDroneData')
          .send({'droneID':'1', 'droneLocation':'qwert1'})
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });
  });

  /**
   * Stop Drone Simulator API Test
   */
  describe('routes:stopDrone', function(){
    it('The stopDrone test', function(done){
      console.log('Starting stopDrone Test ...');
      chai.request(server)
          .post('/api/stopDrones')
          .send({})
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });
  });
});
