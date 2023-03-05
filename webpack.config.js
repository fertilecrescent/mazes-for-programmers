const path = require('path')

module.exports = {
    entry: './src/public/scripts/script.js',
    output: {
        path: path.resolve(__dirname, 'src/public/scripts/dist')
    },
    mode: 'development'
}