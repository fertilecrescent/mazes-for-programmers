const Distance = require('./distance.js')
const {randomSample} = require('./utils.js')

function binary(maze) {
    for (let row of maze.cells) {
        for (let cell of row) {
            if (!(cell.bordersTop() && cell.bordersRight())) {
                if (cell.bordersTop()) {
                    cell.collapseEast()
                } else if (cell.bordersRight()) {
                    cell.collapseNorth()
                } else {
                    if (Math.random() > .5) {cell.collapseNorth()}
                    else {cell.collapseEast()}
                }
            }
        }
    }
}

function sidewinder(maze) {
    let run = []
    for (let row of maze.cells) {
        for (let cell of row) {
            if (!cell.bordersTop()) {
                run.push(cell)
                let coin = Math.random()
                if (coin > .5 && !(cell.bordersRight())) {
                    cell.collapseEast()
                } else {
                    let index = Math.floor(Math.random()*run.length)
                    run[index].collapseNorth()
                    run = []
                }
            } else {
                if (!cell.bordersRight()) {
                    cell.collapseEast()
                }
            }
        }
    }
}

function simplifiedDijkstra(maze, startCell) {
    const distances = new Distance(maze.height, maze.width)
    distances.set(startCell, 0)

    let cell
    let newFrontier
    let frontier = [startCell]

    while (frontier.length > 0) {
        newFrontier = []
        for (let i=0; i<frontier.length; i++) {
            cell = frontier[i]
            for (let n of cell.neighbors()) {
                if (distances.getByCell(n) === null) {
                    distances.setByCell(n, distances.getByCell(cell)+1)
                    newFrontier.push(n)
                }
            }
        }
        frontier = newFrontier
    }
    return distances
}

function alduousBroder(maze) {
    const cells = maze.flatten()
    const startCell = randomSample(cells)
    
}

module.exports = {
    binary,
    sidewinder,
    simplifiedDijkstra,
    alduousBroder
}