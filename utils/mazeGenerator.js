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
          row.push(1);
        } else {
          let rand = Math.random();
          if (rand < 0.2) row.push(1);
          else if (rand < 0.25) row.push(3);
          else row.push(0);
        }
      }

      maze.push(row);
    }

    // ✅ START
    const start = { x: 1, y: 1 };
    maze[start.y][start.x] = 0;

    // ✅ EXIT
    const exit = { x: size - 2, y: size - 2 };
    maze[exit.y][exit.x] = 2;

    // 🔑 KEY
    const keyPos = { x: 2, y: 2 };
    maze[keyPos.y][keyPos.x] = 4;

    // 🚪 DOOR (right before exit)
    const doorPos = { x: size - 3, y: size - 2 };
    maze[doorPos.y][doorPos.x] = 5;

    // 🔒 FORCE EXIT TO HAVE ONLY ONE ENTRY (FROM DOOR)
    // Block top
    if (maze[exit.y - 1]) maze[exit.y - 1][exit.x] = 1;

    // Block left EXCEPT door
    if (maze[exit.y][exit.x - 1] !== 5) {
      maze[exit.y][exit.x - 1] = 1;
    }

    // Bottom & right already walls

    // ✅ PATH CHECKS
    const pathToKey = isPathValid(maze, start, keyPos);
    const pathToDoor = isPathValid(maze, keyPos, doorPos);
    const pathToExit = isPathValid(maze, doorPos, exit);

    if (pathToKey && pathToDoor && pathToExit) {
      return maze;
    }
  }
};