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

        let row
        for (let y=this.height-1; y>=0; y--) {
            row = []
            for (let x=0; x<this.width; x++) {
                if (x == 0) {west = true}
                else {west = false}
                if (y == this.height-1) {south = true}
                else {south = false}
                row.push(new Cell(this, x, y, north, east, south, west))
            }
            console.log(row)
            cells.push(row)
        }
        return cells
    }

    draw() {
        ctx.canvas.width = this.width * this.cellSize + lineWidth
        ctx.canvas.height = this.height * this.cellSize + lineWidth
        for (let row of this.cells) {
            for (let cell of row) {
                cell.draw()
            }  
        }
    }
}

module.exports = Maze