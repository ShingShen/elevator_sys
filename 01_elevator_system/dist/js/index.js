class Elevator {
    constructor(id) {
      this.id = id;
      this.current_floor = 1;
      this.isMoving = false;
      this.indicator = document.createElement('div');
      this.indicator.className = 'elevator-indicator';
      this.updateDisplay();
    }

    display_floor() {
      console.log(`Elevator ${this.id} is on floor ${this.current_floor}`);
    }

    async move(floor) {
      if (this.isMoving) {
        return;
      } 
      this.isMoving = true;
      
      while (this.current_floor !== floor) {
        if (floor > this.current_floor) {
            ++this.current_floor;
        } else {
            --this.current_floor;
        }
        this.updateDisplay();
      }
      
      this.isMoving = false;
      this.display_floor();
    }

    updateDisplay() {
      const elevatorDiv = document.getElementById(`elevator${this.id}`);
      const floors = elevatorDiv.querySelectorAll('.floor');
      floors.forEach(floorDiv => {
        if (parseInt(floorDiv.dataset.floor) === this.current_floor) {
          floorDiv.appendChild(this.indicator);
        }
      });
    }
}
  
const elevator1 = new Elevator(1);
const elevator2 = new Elevator(2);

const callElevator = () => {
    const currentFloor = parseInt(document.getElementById('currentFloor').value);
    const desiredFloor = parseInt(document.getElementById('desiredFloor').value);

    if (isNaN(currentFloor) || isNaN(desiredFloor) || currentFloor < 1 || currentFloor > 10 || desiredFloor < 1 || desiredFloor > 10) {
      alert('Please enter valid floor numbers (1-10)');
      return;
    }

    const elevator1Dist = Math.abs(elevator1.current_floor-currentFloor);
    const elevator2Dist = Math.abs(elevator2.current_floor-currentFloor);

    let selectedElevator;
    if (elevator1Dist <= elevator2Dist) {
        selectedElevator = elevator1;
    } else {
        selectedElevator = elevator2;
    }

    selectedElevator.move(selectedElevator.current_floor, currentFloor).then(() => selectedElevator.move(currentFloor, desiredFloor));
}