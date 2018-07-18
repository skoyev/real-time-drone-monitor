const express = require('express');
const router  = express.Router();
const IndexService = require('../services/indexService');
const indexServiceInst = new IndexService();

router.post('/startDrones', indexServiceInst.startDrones);
router.post('/stopDrones', indexServiceInst.stopDrones);
router.post('/receiveDroneData', indexServiceInst.receiveDroneData);

module.exports = router;
