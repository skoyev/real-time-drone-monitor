"user strict";

/**
 * Index Service Enpoint Class.
 *
 * @author Sergiy Koyev
 */
module.exports = class IndexService {

  constructor() {
  }

  /**
   * Start Drone Endpoint API. Start # threads for reporting data with geolocation.
   */
  async startDrones(req, res) {
    const constants  = require('../model/constants');
    const apiService = require('./common/apiService');

    try {
      const {droneNum} = req.body;

      await apiService.startDroneProcess(droneNum);

      const serviceResponse = new (require('../model/serviceResponse'))
                                    (constants.Success);
      res.status(200).json(serviceResponse);
    } catch (ex) {
      res.status(500)
         .json(new (require('../model/serviceResponse'))
                      (constants.Fail, ex.message));
    }
  }

  /**
   * Stop Drone Endpoint API. Stop all threads.
   */
  async stopDrones(req, res) {
    const constants  = require('../model/constants');
    const apiService = require('./common/apiService');
    try {
      await apiService.stopAllDroneProcess();

      const serviceResponse = new (require('../model/serviceResponse'))
                                    (constants.Success);
      res.status(200).json(serviceResponse);
    } catch (ex) {
      res.status(500)
         .json(new (require('../model/serviceResponse'))
                      (constants.Fail, ex.message));
    }
  }

  /**
   * Receive Drone Data Endpoint API.
   */
  async receiveDroneData(req, res) {
    const constants  = require('../model/constants');
    const apiService = require('./common/apiService');
    try {
      const {droneID, droneLocation} = req.body;

      await apiService.receiveDroneData(droneID, droneLocation);

      const serviceResponse = new (require('../model/serviceResponse'))
                                    (constants.Success);
      res.status(200).json(serviceResponse);
    } catch (ex) {
      res.status(500)
         .json(new (require('../model/serviceResponse'))
                      (constants.Fail, ex.message));
    }
  }
}
