"user strict";

let ApiService = (function(cacheService){
  let constants;
  let assert;
  let droneInterval;

  let init = function(){
    constants = require('../../model/constants');
    assert    = require('assert');
  }

  /**
   * Generate Location Data.
   */
  let generateLocationData = function(){
    return Math.random().toString(36).substr(2,16);
  };

  /**
   * Start Drone Processes async.
   */
  let startDroneProcess = async function(numOfDrones){
    init();
    try{
      assert(numOfDrones, "Num Of Drones param is required.");

      droneInterval = setInterval(() => {
        createAndStartDroneThreads(numOfDrones);
      }, 10000);

      console.log(`Started ${numOfDrones} drones simulator with interval 10 sec.`);
    } catch(ex) {
      throw new Error(ex);
    }
  }

  let createAndStartDroneThreads = async function(numOfDrones){
    const spawn = require('threads').spawn;
    for(index = 0; index < numOfDrones; index++){
      const thread = spawn(function ([index, geoLocation]) {
        let getRandomDroneDataDelay = function(max){
          return Math.floor(Math.random() * max);
        }
        const droneDataDelay = getRandomDroneDataDelay(10000);
        return new Promise(resolve => {
          setTimeout(() => {
            var request = require('request');
            request.post({url:'http://localhost:8000/api/receiveDroneData',
                           form: {"droneID":index, "droneLocation":geoLocation}},
                           function(err,httpResponse,body){
                            resolve({"index":index, "geoLocation":geoLocation});
                          });
          }, droneDataDelay);
          console.log(`Drone ${index} will be sending data with delay ${droneDataDelay/1000}`);
        })
      });
      thread
        .send([index, generateLocationData()])
        .on('message', function(response) {
          console.log(`Drone has send data to the server - drone #: ${response.index}, location data: ${response.geoLocation}`);
          thread.kill();
        });
    }
  }

  /**
   * Stop Drone Processes async.
   */
  let stopAllDroneProcess = async function(){
    init();
    try {
      assert(droneInterval, "Drone process hasn't been started.");
      clearInterval(droneInterval);
      await cacheService.clearDroneData();
      console.log('Drone process (for all drones) has been stoped successfully.');
    } catch(ex) {
      throw new Error(ex);
    }
  }

  /**
   * Receive Drone Data.
   */
  let receiveDroneData = async function(droneID, droneLocation){
    init();
    try {
      assert(droneID, "droneID param is required.");
      assert(droneLocation, "droneLocation param is required.");
      console.log(`Received data from drone #${droneID}, location:${droneLocation}`);
      await cacheService.put(droneID, droneLocation);
    } catch(ex) {
      throw new Error(ex);
    }
  }

  return {
    startDroneProcess : startDroneProcess,
    stopAllDroneProcess : stopAllDroneProcess,
    receiveDroneData : receiveDroneData
  };
})(cacheService);

exports.startDroneProcess   = ApiService.startDroneProcess;
exports.stopAllDroneProcess = ApiService.stopAllDroneProcess;
exports.receiveDroneData    = ApiService.receiveDroneData;
