module.exports = {
  development: {
    app: {
      name: 'Real Time Drone Simulator',
      port: process.env.PORT || 8000
    },
    cache:{
      ttl : 9999999
    }
  },
  test: {
    app: {
      name: 'Real Time Drone Simulator',
      port: process.env.PORT || 8000
    },
    cache:{
      ttl : 9999999
    }
  }
};
