# Node JS, ReactJS/Redux Real TIme Drone Monitor Technical Task Solution By Sergiy Koyev
Create Node JS/ReactJS/Redux Application which contains dashboard page: 

A company has a number of drones flying around the country. You have been tasked to build a system to track the location of every drone in real-time. The system's dashboard will only display the last location of the drones, so the backend doesn't need to worry about the history. You can store the state of the application in-memory for simplicity reasons.

Each drone should be associated with a unique identifier, and should report its geo-location coordinates to the central server in real-time through a cellular modem connection. Cellular modem connections are expensive, therefore you need to make sure the drones report back their location using as little data as possible.

The dashboard should be a simple single-page application displaying the list of active drones, by their unique identifiers, along with their current speed. You should visually highlight the drones that have not been moving for more than 10 seconds

In order to install app:

yarn install
    or
npm install

In order to start application, please type:

yarn start
    or
npm start


Open [http://localhost:3000](http://localhost:3000)<br>


## Technologies
* ReactJS
* Redux
* Socket.IO
* NodeJS, async/await, http, node-cache, mocha, chai tests
* Bootstrap

