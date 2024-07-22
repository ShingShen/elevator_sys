class Elevator {
    constructor(id = 1) {
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

    async move(floor = 1) {
      if (this.isMoving) {
        return;
      } 
      this.isMoving = true;
      
      while (this.current_floor !== floor) {
        if (floor > this.current_floor) {
            ++this.current_floor;
            this.display_floor();
        } else {
            --this.current_floor;
            this.display_floor();
        }
        this.updateDisplay();
      }
      this.isMoving = false;
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

    if (elevator1.isMoving == false && elevator2.isMoving == false) {
      const elevator1Dist = Math.abs(elevator1.current_floor-currentFloor);
      const elevator2Dist = Math.abs(elevator2.current_floor-currentFloor);
      if (elevator1Dist <= elevator2Dist) {
          elevator1.move(currentFloor).then(() => elevator1.move(desiredFloor));
      } else if (elevator1Dist > elevator2Dist) {
          elevator2.move(currentFloor).then(() => elevator2.move(desiredFloor));
      }
    } else if (elevator1.isMoving == true && elevator2.isMoving == false) {
        elevator2.move(currentFloor).then(() => elevator2.move(desiredFloor));
    } else if (elevator1.isMoving == false && elevator2.isMoving == true) {
        elevator1.move(currentFloor).then(() => elevator1.move(desiredFloor));
    }
}