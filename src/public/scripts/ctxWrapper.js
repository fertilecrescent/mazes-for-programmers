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
        console.log(x, y, width, height, fillStyle)
        ctx.fillStyle = fillStyle
        ctx.fillRect(x, y, width, height)
        ctx.stroke()
    }

    static drawCircle(centerX, centerY, radius, color) {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(centerX, centerY, radius, 0, 2*Math.PI)
        ctx.fill()
    }
}

module.exports = ctxWrapper