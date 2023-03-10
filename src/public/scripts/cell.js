const { lineWidth, ctx } = require('./globals.js')
const ctxWrapper = require('./ctxWrapper.js')

class Cell {
    constructor(maze, x, y, north, east, south, west, bgColor) {
        this.maze = maze
        this.x = x
        this.y = y
        this.north = north
        this.east = east
        this.south = south
        this.west = west
        this.bgColor = bgColor
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

    drawBackground() {
        if (this.bgColor) {
            ctxWrapper.fillRect(this.pixelLeft() + lineWidth/2, this.pixelTop() - lineWidth/2, 
                                this.maze.cellSize, this.maze.cellSize, this.bgColor)
        }
    }

    eraseDot() {
        ctx.clearRect(this.pixelLeft() + lineWidth/2, this.pixelTop()+lineWidth/2, 
            this.maze.cellSize-lineWidth/2, this.maze.cellSize-lineWidth/2)
        this.drawBackground()
        this.drawWalls()
    }

    drawWalls() {
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
        if (this.bordersBottom()) {
            const [x0, x1] = [this.pixelLeft()-lineWidth/2, this.pixelRight()+lineWidth/2]
            const [y0, y1] = [this.pixelBottom(), this.pixelBottom()]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
        if (this.bordersLeft()) {
            const [x0, x1] = [this.pixelLeft(), this.pixelLeft()]
            const [y0, y1] = [this.pixelBottom()+lineWidth/2, this.pixelTop()-lineWidth/2]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
    }

    drawDot(sizeRatio, color) {
        console.log('drawing dot')
        const centerX = this.pixelRight() - this.maze.cellSize / 2
        const centerY = this.pixelTop() + this.maze.cellSize / 2
        ctxWrapper.drawCircle(centerX, centerY, sizeRatio*this.maze.cellSize/2, color)
    }

    cellToNorth() {
        if (!this.bordersTop()) {
            return this.maze.getCell(this.x, this.y+1)
        } else {
            return null
        }
    }

    cellToEast() {
        if (!this.bordersRight()) {
            return this.maze.getCell(this.x+1, this.y)
        } else {
            return null
        }
    }

    cellToSouth() {
        if (!this.bordersBottom()) {
            return this.maze.getCell(this.x, this.y-1)
        } else {
            return null
        }
    }

    cellToWest() {
        if (!this.bordersLeft()) {
            return this.maze.getCell(this.x-1, this.y)
        } else {
            return null
        }
    }

    collapseNorth() {
        if (this.bordersTop()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.north = false
            this.cellToNorth().south = false
        }
    }

    collapseEast() {
        if (this.bordersRight()) {
            throw Error('cannot collapse the border wall')
        } else {
            console.log(this, 'setting west to false')
            console.log(this.cellToEast(), 'cell to east: getting set')
            this.east = false
            this.cellToEast().west = false
        }
    }

    collapseSouth() {
        if (this.bordersBottom()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.south = false
            this.cellToSouth().north = false
        }
    }

    collapseWest() {
        if (this.bordersLeft()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.west = false
            this.cellToWest().east = false
        }
    }

    bordersTop() {
        return this.y == this.maze.height - 1
    }

    bordersRight() {
        return this.x == this.maze.width - 1
    }

    bordersBottom() {
        return this.y == 0
    }

    bordersLeft() {
        return this.x == 0
    }

    neighbors() {
        const neighbors = []
        if (!this.north) {
            neighbors.push(this.cellToNorth())
        }
        if (!this.east) {
            neighbors.push(this.cellToEast())
        }
        if (!this.south) {
            neighbors.push(this.cellToSouth())
        }
        if (!this.west) {
            neighbors.push(this.cellToWest())
        }
        return neighbors
    }
}

module.exports = Cell