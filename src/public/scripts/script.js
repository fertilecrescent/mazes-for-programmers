const Maze = require('./maze.js')

const maze = new Maze(20, 20, 20)

function binary(maze) {
    for (let row of maze.cells) {
        for (let cell of row) {
            if (!(cell.bordersTop() && cell.bordersRight())) {
                if (cell.bordersTop()) {
                    cell.east = false
                } else if (cell.bordersRight()) {
                    cell.north = false
                } else {
                    if (Math.random() > .5) {cell.north = false}
                    else {cell.east = false}
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
                    cell.east = false
                } else {
                    let index = Math.floor(Math.random()*run.length)
                    run[index].north = false
                    run = []
                }
            } else {
                if (!cell.bordersRight()) {
                    cell.east = false
                }
            }
        }
    }
}

sidewinder(maze)
maze.draw()