const socket = new WebSocket('ws://localhost:8080');

const moveElevator = () => {
    const elevatorId = document.getElementById('elevatorSelect').value;
    const targetFloor = parseInt(document.getElementById('targetFloor').value);

    if (isNaN(targetFloor) || targetFloor < 1 || targetFloor > 10) {
        alert('Please enter a valid floor number (1-10)');
        return;
    }

    socket.send(JSON.stringify({
        type: 'moveAnElevator',
        elevatorId: elevatorId,
        targetFloor: targetFloor
    }));
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'elevatorUpdate') {
        updateElevatorDisplay(data.id, data.floor);
    }
};

const updateElevatorDisplay = (elevatorId = 1, floor = 1) => {
    const elevatorDiv = document.getElementById(`elevator${elevatorId}`);
    const floors = elevatorDiv.querySelectorAll('.floor');
    let indicator = elevatorDiv.querySelector('.elevator-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'elevator-indicator';
        elevatorDiv.querySelector('.floors').appendChild(indicator);
    }
    
    floors.forEach(floorDiv => {
        if (parseInt(floorDiv.dataset.floor) === floor) {
            const floorHeight = floorDiv.offsetHeight;
            const floorTop = floorDiv.offsetTop;
            indicator.style.top = `${floorTop+floorHeight/2}px`;
        }
    });
}

const initializeElevators = () => {
    updateElevatorDisplay(1, 1);
    updateElevatorDisplay(2, 1);
}

window.onload = initializeElevators;