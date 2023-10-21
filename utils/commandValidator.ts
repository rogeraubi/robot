function parsePlaceCommand(command: string): { x: number; y: number; facing: string } | null {
  const placeArgs = command.substring(6).split(',');
  if (placeArgs.length === 3) {
    const x = parseInt(placeArgs[0], 10);
    const y = parseInt(placeArgs[1], 10);
    const facing = placeArgs[2].toUpperCase();
    if (!isNaN(x) && !isNaN(y) && ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(facing)) {
      return { x, y, facing };
    }
  }
  return null;
}

// Function to validate if a command is valid
function isValidCommand(command: string): boolean {
  command = command.trim().toUpperCase();
  return (
    command === 'MOVE' ||
    command === 'LEFT' ||
    command === 'RIGHT' ||
    command === 'REPORT' ||
    command === 'QUIT' ||
    command.startsWith('PLACE ')
  );
}

export { parsePlaceCommand, isValidCommand };
