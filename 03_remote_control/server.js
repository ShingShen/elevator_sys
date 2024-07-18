const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 })

class Elevator {
    constructor(id) {
        this.id = id;
        this.current_floor = 1;
        this.isMoving = false;
    }

    display_floor() {
        console.log(`Elevator ${this.id} is on F${this.current_floor}`);
    }

    async move(floor) {
        if (this.isMoving) {
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
        
        if (data.type === 'moveElevator') {
            let elevator;
            if (data.elevatorId === '1') {
                elevator = elevator1;
            } else if (data.elevatorId === '2') {
                elevator = elevator2;
            }
            elevator.move(data.targetFloor);
        } else {
            const { currentFloor, desiredFloor } = data;
            
            const elevator1Dist = Math.abs(elevator1.current_floor-currentFloor);
            const elevator2Dist = Math.abs(elevator2.current_floor-currentFloor);
        
            let selectedElevator;
            if (elevator1Dist <= elevator2Dist) {
                selectedElevator = elevator1;
            } else {
                selectedElevator = elevator2;
            }
        
            selectedElevator.move(currentFloor).then(() => selectedElevator.move(desiredFloor));
        }

    });
});

console.log('WebSocket server is running on port 8080');

module.exports = { Elevator };