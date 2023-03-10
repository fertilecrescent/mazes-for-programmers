const Maze = require('./maze.js')
const algorithms = require('./algorithms.js')
const ctxWrapper = require('./ctxWrapper.js')

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        maze.moveDotRight()
    }
})

const mazeOpts = {
    width: 13,
    height: 13,
    cellSize: 40,
    startX: 0,
    startY: 0,
    dotSizeRatio: 2/3,
    dotColor: 'rgb(255, 0, 255)'
}

const maze = new Maze(mazeOpts)
algorithms.binary(maze)
maze.colorByDistance(maze.getCell(0, 0))
maze.draw()