const isPathValid = (maze, start, end) => {
  const queue = [start];
  const visited = new Set();

  const key = (x, y) => `${x},${y}`;

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    if (x === end.x && y === end.y) return true;

    const directions = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    for (let d of directions) {
      if (
        maze[d.y] &&
        maze[d.y][d.x] !== undefined &&
        maze[d.y][d.x] !== 1 &&
        !visited.has(key(d.x, d.y))
      ) {
        visited.add(key(d.x, d.y));
        queue.push({ x: d.x, y: d.y });
      }
    }
  }

  return false;
};

export const generateMaze = (size = 6) => {
  while (true) {
    let maze = [];

    for (let y = 0; y < size; y++) {
      let row = [];

      for (let x = 0; x < size; x++) {
        if (y === 0 || x === 0 || y === size - 1 || x === size - 1) {
          row.push(1); // wall border
        } else {
          let rand = Math.random();
          if (rand < 0.2) row.push(1);
          else if (rand < 0.25) row.push(3);
          else row.push(0);
        }
      }

      maze.push(row);
    }

    // start & goal
    maze[1][1] = 0;
    maze[size - 2][size - 2] = 2;

    // ✅ CHECK PATH
    const valid = isPathValid(
      maze,
      { x: 1, y: 1 },
      { x: size - 2, y: size - 2 }
    );

    if (valid) return maze; // only return solvable maze
  }
};