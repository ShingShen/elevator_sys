const WebSocket = require('ws');
const { Elevator } = require('../server');

jest.mock('ws');

describe('Elevator', () => {
  let elevator;

  beforeEach(() => {
    elevator = new Elevator(1);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('constructor initializes correctly', () => {
    expect(elevator.id).toBe(1);
    expect(elevator.current_floor).toBe(1);
    expect(elevator.isMoving).toBe(false);
  });

  test('display_floor logs correct message', () => {
    console.log = jest.fn();
    elevator.display_floor();
    expect(console.log).toHaveBeenCalledWith('Elevator 1 is on F1');
  });

  test('broadcast sends correct message', () => {
    const mockSend = jest.fn();
    WebSocket.Server.mock.instances[0].clients = [
      { readyState: WebSocket.OPEN, send: mockSend }
    ];

    elevator.broadcast();

    expect(mockSend).toHaveBeenCalledWith(JSON.stringify({
      type: 'elevatorUpdate',
      id: 1,
      floor: 1
    }));
  });
});