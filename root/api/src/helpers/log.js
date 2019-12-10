
const log = (message) => {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]  ${message}`)
}

module.exports = log