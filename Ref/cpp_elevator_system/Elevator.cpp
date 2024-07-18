#include "Elevator.h"
#include <iostream>
#include <thread>
#include <chrono>

Elevator::Elevator(const string& elevator_name) : elevator_name(elevator_name), current_floor(1) {}

void Elevator::display_floor() const {
    cout << elevator_name << " is on floor " << current_floor << endl;
}

void Elevator::move(int specified_floor) {
    if (current_floor == specified_floor) {
        cout << elevator_name << " is already on floor " << specified_floor << endl;
        return;
    }

    cout << elevator_name << " is moving from floor " << current_floor << " to floor " << specified_floor << endl;

    int direction = 0;
    if (specified_floor > current_floor) {
        direction = 1;
    } else {
        direction = -1;
    }

    for (int i = current_floor; i != specified_floor; i += direction) {
        this_thread::sleep_for(chrono::seconds(1));
        current_floor = i+direction;
        display_floor();
    }
}

int Elevator::get_current_floor() const {
    return current_floor;
}