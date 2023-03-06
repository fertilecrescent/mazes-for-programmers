const { ctx, lineWidth } = require('./globals.js')
const Cell = require('./cell.js')
const Distance = require('./distance.js')
const {simplifiedDijkstra} = require('./algorithms.js')

class Maze {
    constructor(width, height, cellSize) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
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
    }

    getCell(x, y) {
        return this.cells[y][x]
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
}

module.exports = Maze