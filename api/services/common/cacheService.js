
module.exports = class Cache {

  constructor(ttlSeconds){
    console.log('Cache has been created...');
    let NodeCache = require('node-cache');
    this.droneDataCache  = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    this.prevDroneDataCache  = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    this.assert = require('assert');
  }

  get(key){
    return key != null ? this.droneDataCache.get(key.toString().trim()) : null;
  }

  getAllDroneData(){
    try {
      this.assert(this.droneDataCache, 'Drone cache required.');
      let data = [];
      const droneDataCache = this.droneDataCache;
      const prevDroneDataCache = this.prevDroneDataCache;
      this.droneDataCache.keys().forEach(function(key){
        const hasChangedData = prevDroneDataCache.get(key) !== droneDataCache.get(key);
        data.push({'id':key, 'location':droneDataCache.get(key), 'changed': hasChangedData.toString()});
        prevDroneDataCache.set(key, droneDataCache.get(key));
      });
      console.log(data);
      return data;
    } catch(ex) {
      throw new Error(ex);
    }
  }

  delete(key){
    if(key){
      this.droneDataCache.del(key.toString());
      this.prevDroneDataCache.del(key.toString());
    }
  }

  async clearDroneData(){
    await this.droneDataCache.flushAll();
    await this.prevDroneDataCache.flushAll();
  }

  put(key, value, time = null) {
    if(key){
      let key_ = key.toString().trim();
      let value_ = JSON.stringify(value);

      console.log('Adding object into cache:' + key_ + ":" + value_);

      if(time) {
        this.droneDataCache.set(key_, value_, time);
      } else {
        this.droneDataCache.set(key_, value_);
      }
    }
  }
};
