#ifndef ELEVATOR_H
#define ELEVATOR_H

#include <string>

using namespace std;

class Elevator {
private:
    string elevator_name;
    int current_floor;

public:
    Elevator(const string& elevator_name);
    void display_floor() const;
    void move(int specified_floor);
    int get_current_floor() const;
};

#endif