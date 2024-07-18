#ifndef ELEVATORSYS_H
#define ELEVATORSYS_H

#include "Elevator.h"

class ElevatorSys {
private:
    Elevator elevator1;
    Elevator elevator2;

public:
    ElevatorSys();
    void operate_elevators(int user_floor, int desired_floor);
};

#endif