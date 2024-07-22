const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 })

class Elevator {
    constructor(id = 1) {
        this.id = id;
        this.current_floor = 1;
        this.isMoving = false;
    }

    display_floor() {
        console.log(`Elevator ${this.id} is on F${this.current_floor}`);
    }

    async move(floor = 1) {
        if (this.isMoving == true) {
            return;
        }
        this.isMoving = true;
        while (this.current_floor !== floor) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (floor > this.current_floor) {
                ++this.current_floor;
                this.display_floor();
            } else {
                --this.current_floor;
                this.display_floor();
            }
            this.broadcast();
        }
        this.isMoving = false;
    }

    broadcast() {
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'elevatorUpdate',
                    id: this.id,
                    floor: this.current_floor
                }));
            }
        });
    }
}

const elevator1 = new Elevator(1);
const elevator2 = new Elevator(2);

server.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (msg) => {
        const data = JSON.parse(msg);
        
        if (data.type === 'moveAnElevator') {
            let elevator;
            if (data.elevatorId === '1') {
                elevator = elevator1;
            } else if (data.elevatorId === '2') {
                elevator = elevator2;
            }
            elevator.move(data.targetFloor);
        } else if (data.type == 'callTheNearestElevator') {                    
            if (elevator1.isMoving == false && elevator2.isMoving == false) {
                const elevator1Dist = Math.abs(elevator1.current_floor-data.currentFloor);
                const elevator2Dist = Math.abs(elevator2.current_floor-data.currentFloor);
                if (elevator1Dist <= elevator2Dist) {
                    elevator1.move(data.currentFloor).then(() => elevator1.move(data.desiredFloor));
                } else if (elevator1Dist > elevator2Dist) {
                    elevator2.move(data.currentFloor).then(() => elevator2.move(data.desiredFloor));
                }
            } else if (elevator1.isMoving == true && elevator2.isMoving == false) {
                elevator2.move(data.currentFloor).then(() => elevator2.move(data.desiredFloor));
            } else if (elevator1.isMoving == false && elevator2.isMoving == true) {
                elevator1.move(data.currentFloor).then(() => elevator1.move(data.desiredFloor));
            }
        }
    });
});

console.log('WebSocket server is running on port 8080');

module.exports = { Elevator };