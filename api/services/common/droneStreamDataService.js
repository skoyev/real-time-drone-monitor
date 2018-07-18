
module.exports = class DroneStreamData {

  constructor(cacheService, server){
    const socketIO = require('socket.io');
    const io       = socketIO(server);

    const getDroneDataAndEmit = async function(socket){
      try {
        const droneData = cacheService.getAllDroneData();
        socket.emit("DroneData", droneData);
      } catch(ex){
        throw new Error(ex);
      }
    };

    io.on('connection', socket => {
      console.log('New client has connected...');
      setInterval(() => getDroneDataAndEmit(socket), 5000);
      socket.on('disconnect', (reason) => {
        console.log('Client has been disconnected...');
      });
    });
  }
};
