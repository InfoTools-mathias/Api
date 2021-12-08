const fs = require('fs');
const { join } = require('path');

//const Product = require('../models/v1/product');
const Categorie = require('../models/v1/categorie');

const { prodBaseURL } = require('../../config.json');

function parseCat(id) {
    return new Promise((res) => {
        const ids = id.toString(2).split("").map(b => parseInt(b)).reverse();
        let index = 1;
        let result = [];

        Categorie.findAll()
        .then(categories => {
            const data = JSON.parse(JSON.stringify(categories));

            for(const bit of ids) {
                if(bit === 1) {
                    const cat = data.find(c => c.id === index);
                    delete cat.createdAt;
                    delete cat.updatedAt;
                    result.push(cat);
                }
                index += index;
            }
            res(result);
        });
    });
}

function writeProductImage(imageData, imageName) {
    const bitmap = Buffer.from(imageData.replace('data:image/png;base64,', ''), 'base64');
    fs.writeFileSync(join(__dirname, `../../assets/products/${imageName}`), bitmap);
}

function parseProduct(data) {
    return new Promise(async (res) => {
        const d = JSON.parse(JSON.stringify(data));
        d.type = await parseCat(d.type);
        if(d.image !== null) d.image = `${prodBaseURL}/img/products/${d.image}`;

        res(d);
    })
}

module.exports = {
    parseCat,
    writeProductImage,
    parseProduct
}