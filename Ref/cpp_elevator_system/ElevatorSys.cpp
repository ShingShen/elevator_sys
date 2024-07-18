#include "ElevatorSys.h"
#include <cmath>

ElevatorSys::ElevatorSys() : elevator1("Elevator 1"), elevator2("Elevator 2") {}

void ElevatorSys::operate_elevators(int user_floor, int desired_floor) {        
    Elevator* choosed_elevator;
    int elevator1_dis = abs(elevator1.get_current_floor()-user_floor);
    int elevator2_dis = abs(elevator2.get_current_floor()-user_floor);
    if (elevator1_dis <= elevator2_dis) {
        choosed_elevator = &elevator1;
    } else {
        choosed_elevator = &elevator2;
    }

    choosed_elevator->move(user_floor);
    choosed_elevator->move(desired_floor);
}