const { lineWidth } = require('./globals.js')
const ctxWrapper = require('./ctxWrapper.js')

class Cell {
    constructor(maze, x, y, north, east, south, west) {
        this.maze = maze
        this.x = x
        this.y = y
        this.north = north
        this.east = east
        this.south = south
        this.west = west
    }

    pixelLeft() {
        return this.x * this.maze.cellSize + lineWidth/2
    }

    pixelRight() {
        return (this.x+1) * this.maze.cellSize + lineWidth/2
    }

    pixelTop() {
        return (this.maze.height - this.y - 1) * this.maze.cellSize + lineWidth/2
    }

    pixelBottom() {
        return (this.maze.height - this.y) * this.maze.cellSize + lineWidth/2
    }

    draw() {
        if (this.north) {
            const [x0, x1] = [this.pixelLeft()-lineWidth/2, this.pixelRight()+lineWidth/2]
            const [y0, y1] = [this.pixelTop(), this.pixelTop()]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
        if (this.east) {
            const [x0, x1] = [this.pixelRight(), this.pixelRight()]
            const [y0, y1] = [this.pixelBottom()+lineWidth/2, this.pixelTop()-lineWidth/2]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
        if (this.south) {
            const [x0, x1] = [this.pixelLeft()-lineWidth/2, this.pixelRight()+lineWidth/2]
            const [y0, y1] = [this.pixelBottom(), this.pixelBottom()]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
        if (this.west) {
            const [x0, x1] = [this.pixelLeft(), this.pixelLeft()]
            const [y0, y1] = [this.pixelBottom()+lineWidth/2, this.pixelTop()-lineWidth/2]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
    }

    bordersTop() {
        return this.y == this.maze.height - 1
    }

    bordersRight() {
        return this.x == this.maze.width - 1
    }
}

module.exports = Cell