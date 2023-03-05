const { ctx, lineWidth } = require('./globals.js')
const Cell = require('./cell.js')

class Maze {
    constructor(width, height, cellSize) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this.cells = this.initializeCells()
    }

    initializeCells() {
        const cells = []
        let [north, east, south, west] = [true, true, null, null]
        for (let x=0; x<this.width; x++) {
            for (let y=0; y<this.height; y++) {
                if (x == 0) {west = true}
                else {west = false}
                if (y == this.height-1) {south = true}
                else {south = false}
                cells.push(new Cell(this, x, y, north, east, south, west))
            }
        }
        return cells
    }

    draw() {
        ctx.canvas.width = this.width * this.cellSize + lineWidth
        ctx.canvas.height = this.height * this.cellSize + lineWidth
        for (var cell of this.cells) {
            cell.draw()
        }
    }

    static cellBordersRight(cell) {
        return cell.x == this.width - 1
    }

    static cellBordersTop(cell) {
        return cell.y == 0
    }
}

const maze = new Maze(10, 10, 40)

function binary(maze) {
    for (var cell of maze.cells) {
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

binary(maze)
maze.draw()