"use strict"

module.exports = class ServiceResponse {

    constructor(status, message){
      this.status  = status;
      this.message  = message;
    }
};
