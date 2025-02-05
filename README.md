# Elavator Sys
## Preparations
Before using the project, you need to install Node.js and npm.
- installation
  ```
  npm init -y
  npm install ws express
  npm install --save-dev jest
  ```
## Running JS Elevator Sys
Please follow the steps in /03_remote_control
- start the server
    ```
    node server.js
    ```
- run the client and central control
    ```
    node client.js
    node centralcontrol.js
    ```
    - They will connect to localhost:3001 and localhost:3002, and you can see the platform in browser for controlling the elevators.
## Running Unit Tests
Please run the following command to execute the unit tests in /03_remote_control.
The test file is in the path of /03_remote_control/tests

```
npm test
```
     
## Reference
### C++ Elevator System
I also wrote the sample code with C++, and it did not be seperated into client side and server side. You could operate the elevator system when you execute the program.

Please install g++ before you execute the steps.

- compile
```
g++ -std=c++11 main.cpp Elevator.cpp ElevatorSys.cpp ui.cpp -o elevator_sys
```
- execute the program
```
./elevator_sys
```