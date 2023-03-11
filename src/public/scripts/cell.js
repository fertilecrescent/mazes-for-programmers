const { lineWidth, ctx } = require('./globals.js')
const ctxWrapper = require('./ctxWrapper.js')

class Cell {
    constructor(maze, x, y, bgColor) {
        this.maze = maze
        this.x = x
        this.y = y
        this.isLinkedNorth = false
        this.isLinkedEast = false
        this.isLinkedSouth = false
        this.isLinkedWest = false
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
            ctxWrapper.fillRect(this.pixelLeft(), this.pixelTop(), 
                                this.maze.cellSize, this.maze.cellSize, this.bgColor)
        }
    }

    eraseDot(sizeRatio) {
        // const centerX = this.pixelRight() - this.maze.cellSize / 2
        // const centerY = this.pixelTop() + this.maze.cellSize / 2
        // const size = sizeRatio*this.maze.cellSize
        ctx.clearRect(this.pixelLeft(), this.pixelRight(), )
        // ctxWrapper.fillRect(centerX-size/2-1+.5, centerY-size/2-1+.5, size+2, size+2, this.bgColor)
        // ctxWrapper.drawCircle(centerX, centerY, sizeRatio*this.maze.cellSize/2, this.bgColor)
    }

    drawWalls() {
        if (!this.isLinkedNorth) {
            const [x0, x1] = [this.pixelLeft()-lineWidth/2, this.pixelRight()+lineWidth/2]
            const [y0, y1] = [this.pixelTop(), this.pixelTop()]
            ctxWrapper.drawLine(x0, y0, x1, y1)
        }
        if (!this.isLinkedEast) {
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

    linkNorth() {
        if (this.bordersTop()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.isLinkedNorth = true
            this.cellToNorth().isLinkedSouth = true
        }
    }

    linkEast() {
        if (this.bordersRight()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.isLinkedEast = true
            this.cellToEast().isLinkedWest = true
        }
    }

    linkSouth() {
        if (this.bordersBottom()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.isLinkedSouth = true
            this.cellToSouth().isLinkedNorth = true
        }
    }

    linkWest() {
        if (this.bordersLeft()) {
            throw Error('cannot collapse the border wall')
        } else {
            this.isLinkedWest = true
            this.cellToWest().isLinkedEast = true
        }
    }

    linkCell(cell) {
        if (!this.neighbors().includes(cell)) {
            throw Error('can\'t link cells that aren\'t neighbors')
        }
        if (Object.is(cell, this.cellToNorth())) {this.linkNorth()}
        if (Object.is(cell, this.cellToEast())) {this.linkEast()}
        if (Object.is(cell, this.cellToSouth())) {this.linkSouth()}
        if (Object.is(cell, this.cellToWest())) {this.linkWest()}
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
        return [this.cellToNorth(), this.cellToEast(), this.cellToSouth(), this.cellToWest()]
        .filter((item) => item !== null)
    }

    linkedNeighbors() {
        const linkedNeighbors = []
        if (this.isLinkedNorth) {linkedNeighbors.push(this.cellToNorth())}
        if (this.isLinkedEast) {linkedNeighbors.push(this.cellToEast())}
        if (this.isLinkedSouth) {linkedNeighbors.push(this.cellToSouth())}
        if (this.isLinkedWest) {linkedNeighbors.push(this.cellToWest())}
        return linkedNeighbors
    }
}

module.exports = Cell