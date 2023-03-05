const { ctx, lineWidth } = require('./globals.js')

class ctxWrapper {
    static drawLine(x0, y0, x1, y1) {
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
    }
}
console.log(ctxWrapper, 'ctxWrapper first')

module.exports = ctxWrapper