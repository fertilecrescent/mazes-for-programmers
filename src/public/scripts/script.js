const Maze = require('./maze.js')
const algorithms = require('./algorithms.js')




const maze = new Maze(13, 13, 40)
algorithms.binary(maze)
maze.colorByDistance(maze.getCell(0, 0))
maze.draw()