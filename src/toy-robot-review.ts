class Table {
  public size: number;

  constructor(size: number) {
    this.size = size;
  }

  isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }
}

class ToyRobot {
  private x: number | null = null;
  private y: number | null = null;
  private facing: string | null = null;
  public table: Table;

  constructor(tableSize: number) {
    this.table = new Table(tableSize);
  }

  place(x: number, y: number, facing: string): void {
    if (this.table.isInBounds(x, y) && this.isValidDirection(facing)) {
      this.x = x;
      this.y = y;
      this.facing = facing;
    }
  }

  move(): void {
    if (this.x === null || this.y === null || this.facing === null) {
      console.log('can not move');
      return;
    }

    switch (this.facing) {
      case 'NORTH':
        if (this.y < this.table.size - 1) this.y++;
        break;
      case 'SOUTH':
        if (this.y > 0) this.y--;
        break;
      case 'EAST':
        if (this.x < this.table.size - 1) this.x++;
        break;
      case 'WEST':
        if (this.x > 0) this.x--;
        break;
    }
  }

  left(): void {
    if (this.facing === null) return;
    switch (this.facing) {
      case 'NORTH':
        this.facing = 'WEST';
        break;
      case 'WEST':
        this.facing = 'SOUTH';
        break;
      case 'SOUTH':
        this.facing = 'EAST';
        break;
      case 'EAST':
        this.facing = 'NORTH';
        break;
    }
  }

  right(): void {
    if (this.facing === null) return;
    switch (this.facing) {
      case 'NORTH':
        this.facing = 'EAST';
        break;
      case 'EAST':
        this.facing = 'SOUTH';
        break;
      case 'SOUTH':
        this.facing = 'WEST';
        break;
      case 'WEST':
        this.facing = 'NORTH';
        break;
    }
  }

  report(): string {
    if (this.x === null || this.y === null || this.facing === null) {
      return 'Robot is not placed on the table.';
    }
    return `${this.x},${this.y},${this.facing}`;
  }

  public isValidDirection(facing: string): boolean {
    return ['NORTH', 'SOUTH', 'EAST', 'WEST',].includes(facing.toUpperCase());
  }
}

export default ToyRobot;
