
function makeNullArray(height, width) {
    const arr = []
    for (let y=0; y<height; y++) {
        let row = []
        for (let x=0; x<width; x++) {
            row.push(null)
        }
        arr.push(row)
    }
    return arr
}

module.exports = {makeNullArray}