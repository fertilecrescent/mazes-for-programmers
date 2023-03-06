const { ctx, lineWidth } = require('./globals.js')

class ctxWrapper {
    static drawLine(x0, y0, x1, y1) {
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
    }

    static fillRect(x, y, width, height, fillStyle) {
        ctx.beginPath()
        ctx.fillStyle = fillStyle
        ctx.fillRect(x, y, width, height)
        ctx.stroke()
    }
}
console.log(ctxWrapper, 'ctxWrapper first')

module.exports = ctxWrapper