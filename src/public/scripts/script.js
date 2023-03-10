const Maze = require('./maze.js')
const algorithms = require('./algorithms.js')
const ctxWrapper = require('./ctxWrapper.js')

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        maze.moveDotRight()
    } else if (e.key === 'ArrowLeft') {
        maze.moveDotLeft()
    } else if (e.key === 'ArrowUp') {
        maze.moveDotUp()
    } else if (e.key === 'ArrowDown') {
        maze.moveDotDown()
    }
})

const mazeOpts = {
    width: 10,
    height: 10,
    cellSize: 20,
    startX: 0,
    startY: 0,
    dotSizeRatio: 1/3,
    dotColor: 'rgb(255, 0, 255)'
}

const maze = new Maze(mazeOpts)
algorithms.alduousBroder(maze)
maze.colorByDistance(maze.getCell(0, 0))
maze.draw()