const {makeNullArray} = require('./utils.js')

class Distance {
    constructor(height, width) {
        this.height = height
        this.width = width
        this.distances = makeNullArray(height, width)
        this.max = 0
    }

    get(x, y) {
        return this.distances[y][x]
    }

    set(x, y, val) {
        this.distances[y][x] = val
    }

    getByCell(cell) {
        return this.get(cell.x, cell.y)
    }

    setByCell(cell, value) {
        if (this.getByCell(cell) !== null) {
            throw Error('can only set null distances')
        }
        if (value > this.max) {
            this.max = value
        }
        this.set(cell.x, cell.y, value)
    }

    toColor() {
        const colors = []
        for (let y=0; y<this.height; y++) {
            let row = []
            for (let x=0; x<this.width; x++) {
                let distance = this.distances[y][x]
                let alpha = (distance/this.max).toString()
                let color = `rgba(0, 255, 0, ${alpha})`
                row.push(color)
            }
            colors.push(row)
        }
        return colors
    }
}

module.exports = Distance