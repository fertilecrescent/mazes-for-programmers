const { ctx, lineWidth } = require('./globals.js')
const Cell = require('./cell.js')
const {simplifiedDijkstra} = require('./algorithms.js')

class Maze {
    constructor({width, height, cellSize, startX, startY, dotSizeRatio, dotColor}) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this.startX = startX
        this.startY = startY
        this.dotX = startX
        this.dotY = startY
        this.dotSizeRatio = dotSizeRatio
        this.dotColor = dotColor
        this.cells = this.initializeCells()
    }

    initializeCells() {
        const cells = []

        let row
        for (let y=0; y<this.height; y++) {
            row = []
            for (let x=0; x<this.width; x++) {
                row.push(new Cell(this, x, y, true, true, true, true))
            }
            cells.push(row)
        }
        return cells
    }

    draw() {
        ctx.canvas.width = this.width * this.cellSize + lineWidth
        ctx.canvas.height = this.height * this.cellSize + lineWidth
        for (let row of this.cells) {
            for (let cell of row) {
                cell.drawBackground()
            }  
        }
        for (let row of this.cells) {
            for (let cell of row) {
                cell.drawWalls()
            }  
        }
        this.drawDot()
    }

    getCell(x, y) {
        return this.cells[y][x]
    }

    moveDotLeft() {
        const selectedCell = this.getCell(this.dotX, this.dotY)
        if (!selectedCell.west) {
            this.eraseDot()
            this.dotX--
            this.drawDot()
        }
    }

    moveDotRight() {
        const selectedCell = this.getCell(this.dotX, this.dotY)
        if (!selectedCell.east) {
            this.eraseDot()
            this.dotX++
            this.drawDot()
        }
    }

    moveDotUp() {
        const selectedCell = this.getCell(this.dotX, this.dotY)
        if (!selectedCell.north) {
            this.eraseDot()
            this.dotY++
            this.drawDot()
        }
    }

    moveDotDown() {
        const selectedCell = this.getCell(this.dotX, this.dotY)
        if (!selectedCell.south) {
            this.eraseDot()
            this.dotY--
            this.drawDot()
        }
    }

    drawDot() {
        this.getCell(this.dotX, this.dotY).drawDot(this.dotSizeRatio, this.dotColor)
    }

    eraseDot() {
        this.getCell(this.dotX, this.dotY).eraseDot(this.dotSizeRatio) 
    }

    flattenCells() {
        const flat = []
        for (let row of this.cells) {
            for (let cell of row) {
                flat.push(cell)
            }
        }
        return flat
    }

    colorByDistance(startCell) {
        const colors = simplifiedDijkstra(this, startCell).toColor()
        for (let x=0; x<this.width; x++) {
            for (let y=0; y<this.height; y++) {
                this.getCell(x, y).bgColor = colors[y][x]
            }
        }
    }

    flatten() {
        const cells = []
        for (let row of this.cells) {
            for (let cell of row) {
                cells.push(cell)
            }
        }
        return cells
    }
}

module.exports = Maze