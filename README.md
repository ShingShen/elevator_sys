# Elavator Sys
## Preparations
Before run the project, you need to install node and npm.
- installation
  ```
  npm init -y
  npm install ws express
  npm install --save-dev jest
  ```
## Running JS Elevator Sys
Please operate the following steps under /03_remote_control
- start the server
    ```
    node server.js
    ```
- run the client and monitor
    ```
    node client.js
    node centralcontrol.js
    ```
    - They will connect to localhost:3001 and localhost:3002, and you can see the platform in browser for you to control the elevators.
## Running Unit Tests
Please run the following command to run the unit tests under /03_remote_control.
The test file is in the path of /03_remote_control/tests

```
npm test
```
     
## Reference
### C++ Elevator System
I also wrote the sample code with C++, and it did not be seperated into client side and server side. You could operate the elevator system when you run the program.

Please install g++ before you execute the following steps.

- complie
```
g++ -std=c++11 main.cpp Elevator.cpp ElevatorSys.cpp ui.cpp -o elevator_sys
```
- run
```
./elevator_sys
```