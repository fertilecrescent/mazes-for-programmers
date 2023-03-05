const canvas = document.getElementById('the-canvas')
const ctx = canvas.getContext('2d')


const lineWidth = 2

class ctxWrapper {
    static drawLine(x0, y0, x1, y1) {
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
    }
}

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
        return (this.y) * this.maze.cellSize + lineWidth/2
    }

    pixelBottom() {
        return (this.y+1) * this.maze.cellSize + lineWidth/2
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
        return this.y == 0
    }

    bordersRight() {
        return this.x == this.maze.width - 1
    }
}

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