// Import the necessary modules  ToyRobot class
import { expect } from 'chai';
import ToyRobot from '../src/toy-robot';

describe('ToyRobot', () => {
  let robot: ToyRobot;

  beforeEach(() => {
    robot = new ToyRobot(5); // Specify the table size (e.g., 5x5)
  });

  it('should initialize correctly', () => {
    expect(robot.report()).to.equal('Robot is not placed on the table.');
  });

  it('should ignore invalid PLACE command', () => {
    robot.place(6, 6, 'NORTH');
    expect(robot.report()).to.equal('Robot is not placed on the table.');
  });

  it('should execute PLACE command', () => {
    robot.place(1, 2, 'NORTH');
    expect(robot.report()).to.equal('1,2,NORTH');
  });

  it('should ignore MOVE command when not placed', () => {
    robot.move();
    expect(robot.report()).to.equal('Robot is not placed on the table.');
  });

  it('should handle valid MOVE commands', () => {
    robot.place(1, 1, 'EAST');
    robot.move();
    expect(robot.report()).to.equal('2,1,EAST');
  });
});
