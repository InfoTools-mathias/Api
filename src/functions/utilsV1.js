const { writeFileSync } = require('fs');
const { join } = require('path');

const { prodBaseURL } = require('../../config.json');

function writeProductImage(imageData, imageName) {
    const bitmap = Buffer.from(imageData.replace('data:image/png;base64,', ''), 'base64');
    writeFileSync(join(__dirname, `../../assets/products/${imageName}`), bitmap);
}

function parseProduct(data) {
    return new Promise(async (res) => {
        const d = JSON.parse(JSON.stringify(data));
        if(d.image !== null) d.image = `${prodBaseURL}/img/products/${d.image}`;

        res(d);
    })
}

module.exports = {
    writeProductImage,
    parseProduct
}