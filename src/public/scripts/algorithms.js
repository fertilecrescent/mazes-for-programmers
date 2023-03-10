const Distance = require('./distance.js')
const {randomSample} = require('./utils.js')

function binary(maze) {
    for (let row of maze.cells) {
        for (let cell of row) {
            if (!(cell.bordersTop() && cell.bordersRight())) {
                if (cell.bordersTop()) {
                    cell.linkEast()
                } else if (cell.bordersRight()) {
                    cell.linkNorth()
                } else {
                    if (Math.random() > .5) {cell.linkNorth()}
                    else {cell.linkEast()}
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
                    cell.linkEast()
                } else {
                    let index = Math.floor(Math.random()*run.length)
                    run[index].linkNorth()
                    run = []
                }
            } else {
                if (!cell.bordersRight()) {
                    cell.linkEast()
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
            for (let n of cell.linkedNeighbors()) {
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
    let currentCell = randomSample(maze.flatten())
    let unvisited = cells.length - 1
    let cellToLink
    while (unvisited > 0) {
        cellToLink = randomSample(currentCell.neighbors())
        if (cellToLink.linkedNeighbors().length === 0) {
            currentCell.linkCell(cellToLink)
            unvisited--
        }
        currentCell = cellToLink
    }
}

module.exports = {
    binary,
    sidewinder,
    simplifiedDijkstra,
    alduousBroder
}