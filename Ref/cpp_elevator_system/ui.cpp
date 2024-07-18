#include "ui.h"
#include <iostream>

void ui(ElevatorSys& sys) {
    while (true) {
        int current_floor, desired_floor;

        cout << "Enter your current floor (1~10): ";
        cin >> current_floor;

        if (current_floor < 1 || current_floor > 10) {
            cout << "Invalid floor. Please enter a number between 1 and 10." << endl;
            continue;
        }

        cout << "Enter your desired floor (1~10): ";
        cin >> desired_floor;

        if (desired_floor < 1 || desired_floor > 10) {
            cout << "Invalid floor. Please enter a number between 1 and 10." << endl;
            continue;
        }

        if (current_floor == desired_floor) {
            cout << "You are already on the desired floor." << endl;
            continue;
        }

        sys.operate_elevators(current_floor, desired_floor);
    }
}